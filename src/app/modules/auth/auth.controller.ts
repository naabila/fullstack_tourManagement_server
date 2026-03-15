import { NextFunction, Request, Response } from "express";
import { AuthService } from "./auth.service";
import { sendResponse } from "../../utils/SendResponse";
import httpStatus from "http-status-codes"
import { catchAsync } from "../../utils/catchAsyncHandler";
const credentialLogin=catchAsync(async(req:Request,res:Response,next:NextFunction)=>{
    const loginInfo= await AuthService.credentialLogin(req.body);
    sendResponse(res,{
        success:true,
        statusCode:httpStatus.OK,
        message:"Login successfull",
        data:loginInfo
    })
})

export const AuthController={
    credentialLogin
}