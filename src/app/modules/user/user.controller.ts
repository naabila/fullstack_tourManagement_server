import { NextFunction, Request, Response } from "express";
import { User } from "./user.model";
import httpStatus from "http-status-codes";
import { userService } from "./user.service";
import { catchAsync } from "../../utils/catchAsyncHandler";
import { sendResponse } from "../../utils/SendResponse";

const createUser=async(req:Request,res:Response,next:NextFunction)=>{
    try{
   const user=await userService.createUser(req.body)
    res.status(httpStatus.CREATED).json({
    message: "User Created Successfully",
      user,
    })
    }catch(err:any){
        next(err)
    }
};

//get all users
const getAllUsers=catchAsync(async(req:Request,res:Response,next:NextFunction)=>{
 const users=await userService.getAllUsers();
 sendResponse(res,{
  success:true,
  statusCode:httpStatus.CREATED,
  message:"User fetched successfully",
  data:users.data,
  meta:users.meta
 })
    // res.status(httpStatus.OK).json({
    // message: "User fetched Successfully",
    //   users,
    // })
 })

export const UserControllers={
createUser,
getAllUsers
}