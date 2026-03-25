import { envVars } from "../config/env";
import { IUser } from "../modules/user/user.interface";
import { generateToken } from "./jwt";
export const createUserToken=async(user:Partial<IUser>)=>{
    const JwtPayload={
    email:user.email,
    id:user._id,
    role:user.role
}
const accessToken=  generateToken(JwtPayload,envVars.JWT_SECRET,envVars.JWT_EXPIRES_IN);
const refreshToken= generateToken(JwtPayload,envVars.JWT_REFRESH_SECRET,envVars.JWT_REFRESH_EXPIRES_IN);

return{
    accessToken,
    refreshToken
}

}