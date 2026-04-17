import { NextFunction, Request, Response } from "express";
import { catchAsync } from "../../utils/catchAsyncHandler";
import { tourService } from "./tour.service";
import { sendResponse } from "../../utils/SendResponse";
import httpStatus from "http-status-codes";

const createTourType=catchAsync(async(req:Request,res:Response,next:NextFunction)=>{
const tourType=await tourService.createTourType(req.body);
 sendResponse(res,{
      success:true,
      statusCode:httpStatus.CREATED,
      message:"Tour type created successfully",
      data:tourType,
      })
});

//get all tour type
const getAllTourType=catchAsync(async(req:Request,res:Response,next:NextFunction)=>{
const tourTypes=await tourService.getAllTourTypes();
 sendResponse(res,{
      success:true,
      statusCode:httpStatus.OK,
      message:"Tour fetched successfully",
      data:tourTypes,
      })
});

//update tour type
const updateTourType=catchAsync(async(req:Request,res:Response,next:NextFunction)=>{
const tourTypes=await tourService.updateTourType(req.params.id,req.body);
 sendResponse(res,{
      success:true,
      statusCode:httpStatus.OK,
      message:"Tour type updated successfully",
      data:tourTypes,
      })
});

//delete tour type
const deleteTourType=catchAsync(async(req:Request,res:Response,next:NextFunction)=>{
const tourTypes=await tourService.deleteTourType(req.params.id);
 sendResponse(res,{
      success:true,
      statusCode:httpStatus.OK,
      message:"Tour type deleted successfully",
      data:tourTypes,
      })
});




export const tourTypeController={
    createTourType,
    getAllTourType,
    updateTourType,
    deleteTourType
}