import jwt, { JwtPayload, SignOptions } from "jsonwebtoken";

export const generateToken=(payload:JwtPayload,secret:string,expiresIn:string)=>{
const token=jwt.sign(payload,secret,{
    expiresIn
} as SignOptions)
return token
};



export const verifyToken = (
  token: string,
  secret: string
): JwtPayload => {
  try {
    return jwt.verify(token, secret) as JwtPayload;
  } catch (error: any) {
    if (error.name === 'TokenExpiredError') {
      throw new Error('Token has expired');
    }
    if (error.name === 'JsonWebTokenError') {
      throw new Error('Invalid token');
    }
    throw error;
  }
};