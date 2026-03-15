import AppError from "../../errorHelpers/appError";
import { isAuthProvider, IUser, Role } from "./user.interface";
import { User } from "./user.model";
import httpStatus from "http-status-codes"
import bcryptjs from "bcryptjs"
import { envVars } from "../../config/env";
import { JwtPayload } from "jsonwebtoken";

const createUser=async(Payload:Partial<IUser>)=>{
     const {email,password,...rest} = Payload; 
     const isUserExist=await User.findOne({email});
     if(isUserExist){
        throw new AppError(httpStatus.BAD_REQUEST,"User already exists");
     }
// password hashing with bcrypt
const hashedPassword= await bcryptjs.hash(password as string,10)
     const authProvider:isAuthProvider={provider:'credentials',providerId:email as string}
    const user = await User.create({
     email,
     password:hashedPassword,
     auths:[authProvider],
     ...rest
    });
    return user;
}

//get all users
const getAllUsers=async()=>{
    const users=await User.find();
    const total=await User.countDocuments()
    return {
        data:users,
        meta:{
            total:total
        }
    }
}

//update user
const updateUser=async(userId:string,Payload:Partial<IUser>,decodedToken: JwtPayload)=>{
const isUserExist= await User.findById(userId);
if(!isUserExist){
    throw new AppError(404,"User not found")
}

if(Payload.role){
     if(decodedToken.role===Role.USER || decodedToken.role===Role.ADMIN){
      throw new AppError(httpStatus.FORBIDDEN,"You are not authorized");
      }
}

 if(Payload.isActive || Payload.isDeleted || Payload.isVerified){
      if(decodedToken.role === Role.USER || decodedToken.role === Role.GUIDE){
        throw new AppError(httpStatus.FORBIDDEN,"You are not authorized")
      }
    }

     if(Payload.password){
      Payload.password=await bcryptjs.hash(Payload.password,10)
    }

     const newUpdatedUser = await User.findByIdAndUpdate(
  userId,
  Payload,
  { new: true, runValidators: true }
);
return newUpdatedUser;
}

export const userService={
    createUser,
    getAllUsers,
    updateUser
}