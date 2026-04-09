import express from "express";
import { checkAuth } from "../../middlewares/checkAuth";
import { validateRequest } from "../../middlewares/validatedRequest";
import { createDivisionZodSchema } from "./division.validation";
import { DivisionController } from "./division.controller";
const router=express.Router();

//create division
router.post("/",checkAuth("ADMIN"),validateRequest(createDivisionZodSchema),DivisionController.createDivision);
router.get("/division",DivisionController.getAllDivisions);
router.delete("/:id",DivisionController.deleteDivision);
router.patch("/:id",checkAuth("ADMIN"),DivisionController.updateDivision );



export const divisionRoutes=router;