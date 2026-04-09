import { NextFunction, Request, Response } from "express";
import { AuthService } from "./auth.service";
import { sendResponse } from "../../utils/SendResponse";
import httpStatus from "http-status-codes"
import { catchAsync } from "../../utils/catchAsyncHandler";
import AppError from "../../errorHelpers/appError";
import { setAuthCookie } from "../../utils/setCookie";
import { createUserToken } from "../../utils/userToken";
import { envVars } from "../../config/env";
import passport from "passport";

const credentialLogin=catchAsync(async(req:Request,res:Response,next:NextFunction)=>{
    passport.authenticate("local", async(err:any,user:any,info:any)=>{
        if(err){
            return next(new AppError(401,err))
        }

        if(!user){
            return next(new AppError(401, info.message))
        }

        const userTokens=await createUserToken(user);
        const {password:pass, ...rest}=user.toObject()
        setAuthCookie(res,userTokens);
         
        sendResponse(res,{
            success:true,
            statusCode:httpStatus.OK,
            message:"Login successfull",
            data:{
                accessToken: userTokens.accessToken,
                refreshToken: userTokens.refreshToken,
                user: rest
            }
        })
    })(req,res,next)
})

//const get new access token
const getNewAccessToken=catchAsync(async(req:Request,res:Response,next:NextFunction)=>{
    const refreshToken = req.cookies.refreshToken;
        //const refreshToken = req.headers.authorization;

    if(!refreshToken){
        throw new AppError(httpStatus.BAD_REQUEST,"No refresh token recieved")
    }

    const tokenInfo=await AuthService.getNewAccessToken(refreshToken as string);

    setAuthCookie(res,tokenInfo);
       sendResponse(res,{
        success:true,
        statusCode:httpStatus.OK,
        message:"New access token generated successfully",
        data:tokenInfo
    })

})

//logout user
const logout=catchAsync(async(req:Request,res:Response,next:NextFunction)=>{
    res.clearCookie("accessToken",{
        httpOnly:true,
        secure:false,
        sameSite:"lax"
    })

    res.clearCookie("refreshToken",{
        httpOnly:true,
        secure:false,
        sameSite:"lax"
    })

    sendResponse(res,{
        success:true,
        statusCode:httpStatus.OK,
        message:"Logout successfull",
        data:null
    })
})

//passport google login
const googleCallbackController = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
   let redirectTo = req.query.state ? req.query.state as string : ""

    if (redirectTo.startsWith("/")) {
        redirectTo = redirectTo.slice(1)
    }

    // /booking => booking , => "/" => ""
    const user = req.user;

    if (!user) {
        throw new AppError(httpStatus.NOT_FOUND, "User Not Found")
    }

    const tokenInfo = await createUserToken(user)

    setAuthCookie(res,tokenInfo)

   

    res.redirect(`${envVars.FRONTEND_URL}/${redirectTo}`)
});


export const AuthController={
    credentialLogin,
    getNewAccessToken,
    logout,
    googleCallbackController
}