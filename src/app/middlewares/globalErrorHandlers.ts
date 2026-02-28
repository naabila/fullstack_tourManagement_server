import { NextFunction, Request, Response } from "express";
import { success } from "zod";
import { envVars } from "../config/env";
import AppError from "../errorHelpers/appError";

export const globalErrorHandler=(err:any,req:Request,res:Response,next:NextFunction)=>{
const statusCode=500
const message=`Something went wrong ${err.message} from global Error handler`;

if(err instanceof AppError){
    statusCode:err.statusCode
    message:err.message
}

res.status(statusCode).json({
    success:false,
    message:message,
    err,
    stack: envVars.NODE_ENV === "development" ? err.stack : null,

})
}