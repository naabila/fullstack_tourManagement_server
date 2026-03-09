import AppError from "../../errorHelpers/appError";
import { isAuthProvider, IUser } from "./user.interface";
import { User } from "./user.model";
import httpStatus from "http-status-codes"
import bcrypt from "bcryptjs"
const createUser=async(payload:Partial<IUser>)=>{
     const {email,password,...rest} = payload; 
     const isUserExist=await User.findOne({email});
     if(isUserExist){
        throw new AppError(httpStatus.BAD_REQUEST,"User already exists");
     }
// password hashing with bcrypt
const hashedPassword= await bcrypt.hash(password as string,10)
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

export const userService={
    createUser,
    getAllUsers
}