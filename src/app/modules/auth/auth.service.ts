import AppError from "../../errorHelpers/appError";
import { isActive, IUser } from "../user/user.interface";
import { User } from "../user/user.model";
import httpStatus from "http-status-codes";
import bcryptjs from "bcryptjs";
import jwt from 'jsonwebtoken';
import { envVars } from "../../config/env";
import { createUserToken } from "../../utils/userToken";
import { generateToken, verifyToken } from "../../utils/jwt";



const  credentialLogin= async(payload:Partial<IUser>)=>{
const {email,password}=payload;
const isUserExist=await User.findOne({email});
if(!isUserExist){
throw new AppError(httpStatus.BAD_REQUEST,"Email doesnot exists")};
const isPasswordMatched=await bcryptjs.compare(password as string, isUserExist.password as string);

if(!isPasswordMatched){
    throw new AppError(httpStatus.BAD_REQUEST,"Incorrect password")
}

const userTokens= await createUserToken(isUserExist)

const {password:pass,...rest}=isUserExist.toObject()

return{
    user:rest,
    accessToken:userTokens.accessToken,
    refreshToken: userTokens.refreshToken,
}
}

//get new accessToken with refresh token
export const getNewAccessToken=async(refreshToken:string)=>{
    const verifiedRefreshToken=verifyToken(refreshToken,envVars.JWT_REFRESH_SECRET);

    const isUserExist=await User.findOne({email:verifiedRefreshToken.email});

    if(!isUserExist){
        throw new AppError(httpStatus.BAD_REQUEST,"User does not exist")
    }

     if (isUserExist.isActive === isActive.BLOCKED || isUserExist.isActive === isActive.INACTIVE) {
        throw new AppError(httpStatus.BAD_REQUEST, `User is ${isUserExist.isActive}`)
    }

    if (isUserExist.isDeleted) {
        throw new AppError(httpStatus.BAD_REQUEST, "User is deleted")
    }

      const jwtPayload = {
        userId: isUserExist._id,
        email: isUserExist.email,
        role: isUserExist.role
    }
        const newAccessToken = generateToken(jwtPayload, envVars.JWT_REFRESH_SECRET, envVars.JWT_REFRESH_EXPIRES_IN)

        return{
            accessToken:newAccessToken
        }

}

export const AuthService={
    credentialLogin,
    getNewAccessToken
}