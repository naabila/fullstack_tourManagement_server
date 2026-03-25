import { NextFunction, Request, Response } from "express";
import { AuthService } from "./auth.service";
import { sendResponse } from "../../utils/SendResponse";
import httpStatus from "http-status-codes"
import { catchAsync } from "../../utils/catchAsyncHandler";
import AppError from "../../errorHelpers/appError";
import { setAuthCookie } from "../../utils/setCookie";
import { createUserToken } from "../../utils/userToken";
import { envVars } from "../../config/env";
const credentialLogin=catchAsync(async(req:Request,res:Response,next:NextFunction)=>{
    const loginInfo= await AuthService.credentialLogin(req.body);
        setAuthCookie(res,loginInfo);

    sendResponse(res,{
        success:true,
        statusCode:httpStatus.OK,
        message:"Login successfull",
        data:loginInfo
    })
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

    const tokenInfo = createUserToken(user)

    setAuthCookie(res, tokenInfo)

   

    res.redirect(`${envVars.FRONTEND_URL}/${redirectTo}`)
});


export const AuthController={
    credentialLogin,
    getNewAccessToken,
    logout,
    googleCallbackController
}