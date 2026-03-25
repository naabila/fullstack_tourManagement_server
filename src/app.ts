import express, { Request, Response } from "express";
import { UserRoutes } from "./app/modules/user/user.route";
import cors from "cors";
import { router } from "./app/routs/index";
import cookieParser from "cookie-parser";
import { globalErrorHandler } from "./app/middlewares/globalErrorHandlers";
import passport from "passport";
import expressSession from "express-session"
import { envVars } from "./app/config/env";
import "./app/config/passport";
const app = express();
// Core middleware
app.use(express.json());
app.use(cors());
app.use(cookieParser());

// Session middleware (must be before Passport)
app.use(expressSession({
  secret:envVars.EXPRESS_SESSION_SECRET,
  resave:false,
  saveUninitialized:false
}));

// Passport middleware
app.use(passport.initialize());
app.use(passport.session());

// Routes
app.use("/api/v1",router);

// Routes
app.get("/", async (req: Request, res: Response) => {
  res.status(200).json({
    message: "Hello from floor 6th",
  });
});

app.use(globalErrorHandler)

export default app;
