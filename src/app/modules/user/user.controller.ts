import { Request, Response } from "express";
import { User } from "./user.model";
import httpStatus from "http-status-codes";
import { userService } from "./user.service";

const createUser=async(req:Request,res:Response)=>{
    try{
   const user=await userService.createUser(req.body)
    res.status(httpStatus.CREATED).json({
    message: "User Created Successfully",
      user,
    })
    }catch(err:any){
        res.status(httpStatus.BAD_REQUEST).json({
      message:"something went wrong cant create user"
    });
    }
};

//get all users
const getAllUsers=async(req:Request,res:Response)=>{
  try{
    const users=await userService.getAllUsers()
    res.status(httpStatus.OK).json({
    message: "User fetched Successfully",
      users,
    })
  }catch(err){
     res.status(httpStatus.BAD_REQUEST).json({
      message:"something went wrong cant get user"
  })
}}

export const UserControllers={
createUser,
getAllUsers
}