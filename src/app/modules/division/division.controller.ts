import { NextFunction, Request, Response } from "express";
import { catchAsync } from "../../utils/catchAsyncHandler";
import { divisionService } from "./division.service";
import { sendResponse } from "../../utils/SendResponse";
import httpStatus from "http-status-codes";

const createDivision=catchAsync(async(req:Request,res:Response,next:NextFunction)=>{
    const division=await divisionService.createDivition(req.body);

    sendResponse(res,{
        success: true,
      statusCode: httpStatus.CREATED,
      message: "Division created successfully",
      data: division,
    })
});

//get all  division
const getAllDivisions=catchAsync(async(req:Request,res:Response,next:NextFunction)=>{
    const divisions=await divisionService.getAllDivision();
     sendResponse(res,{
        success: true,
      statusCode: httpStatus.OK,
      message: "Division fetched successfully",
      data: divisions,
    })
})

//delete division
const deleteDivision=catchAsync(async(req:Request,res:Response)=>{
await divisionService.deleteDivision(req.params.id);
 sendResponse(res,{
        success: true,
      statusCode: httpStatus.OK,
      message: "Division deleted successfully",
      data: null,
    })
})

//update division
const updateDivision=catchAsync(async(req:Request,res:Response)=>{
const division=await divisionService.updateDivision(req.body, req.params.id);
 sendResponse(res,{
        success: true,
      statusCode: httpStatus.OK,
      message: "Division updated successfully",
      data: division,
    })
})


export const DivisionController={
    createDivision,
    getAllDivisions,
    deleteDivision,
    updateDivision
}