import { NextFunction, Request, Response, Router } from "express";
import { AuthController } from "./auth.controller";
import { checkAuth } from "../../middlewares/checkAuth";
import { object } from "zod";
import passport from "passport";

const router=Router();
router.post("/login",AuthController.credentialLogin);
router.post("/refresh-token", AuthController.getNewAccessToken)
router.post("/logout",AuthController.logout);
router.get("/google", async (req: Request, res: Response, next: NextFunction) => {
    const redirect = req.query.redirect || "/"
    passport.authenticate("google", { scope: ["profile", "email"], 
    state: redirect as string ,
    prompt: "select_account"})(req, res, next)
})

//callback router
router.get("/google/callback", passport.authenticate("google", { failureRedirect: "/login" }), AuthController.googleCallbackController)


export const AuthRoutes=router;
