import { Router } from "express";
import { UserControllers } from "./user.controller";
import { validateRequest } from "../../middlewares/validatedRequest";
import { createUserZodSchema } from "./user.validation";

const router=Router();
router.post("/register",validateRequest(createUserZodSchema),UserControllers.createUser);
router.get("/users",UserControllers.getAllUsers)
export const UserRoutes=router;