import AppError from "../../errorHelpers/appError";
import { IUser } from "../user/user.interface";
import { User } from "../user/user.model";
import httpStatus from "http-status-codes";
import bcryptjs from "bcryptjs";
import jwt from 'jsonwebtoken';
import { envVars } from "../../config/env";



const  credentialLogin= async(payload:Partial<IUser>)=>{
const {email,password}=payload;
const isUserExist=await User.findOne({email});
if(!isUserExist){
throw new AppError(httpStatus.BAD_REQUEST,"Email doesnot exists")};
const isPasswordMatched=await bcryptjs.compare(password as string, isUserExist.password as string);

if(!isPasswordMatched){
    throw new AppError(httpStatus.BAD_REQUEST,"Incorrect password")
}

const JwtPayload={
    email:isUserExist.email,
    id:isUserExist._id,
    role:isUserExist.role
}
const accessToken= jwt.sign(JwtPayload,envVars.JWT_SECRET,{
    expiresIn: envVars.JWT_EXPIRES_IN
})

return{
    email:isUserExist.email,
    accessToken:accessToken
}
}

export const AuthService={
    credentialLogin
}