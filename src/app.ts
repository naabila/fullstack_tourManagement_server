import express, { Request, Response } from "express";
import { UserRoutes } from "./app/modules/user/user.route";
import cors from "cors";
import { router } from "./app/routs/index"
import { globalErrorHandler } from "./app/middlewares/globalErrorHandlers";

const app = express();

// Middleware (optional)
app.use(express.json());
app.use("/api/v1",router)
app.use(cors());

// Routes
app.get("/", async (req: Request, res: Response) => {
  res.status(200).json({
    message: "Hello from floor 6th",
  });
});

app.use(globalErrorHandler)

export default app;
