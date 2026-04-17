import { Router } from "express";
import { checkAuth } from "../../middlewares/checkAuth";
import { validateRequest } from "../../middlewares/validatedRequest";
import { createTourTypeZodSchema, updateTourTypeZodSchema } from "./tour.validation";
import { tourTypeController } from "./tour.controller";

const router=Router();
router.post("/create-tour-type",validateRequest(createTourTypeZodSchema),checkAuth("ADMIN"),tourTypeController.createTourType);
//get all tour type
router.get("/tour-type",checkAuth("ADMIN"),tourTypeController.getAllTourType);
//update tour type
router.patch("/tour-types/:id",validateRequest(updateTourTypeZodSchema),checkAuth("ADMIN"),tourTypeController.updateTourType);

//delete tour type
router.delete("/tour-types/:id",checkAuth("ADMIN"),tourTypeController.deleteTourType);

export const TourRoutes=router;