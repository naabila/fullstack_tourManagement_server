import { NextFunction, Request, Response } from "express";
import AppError from "../errorHelpers/appError";
import { verifyToken } from "../utils/jwt";
import { envVars } from "../config/env";
import { JwtPayload } from "jsonwebtoken";

export const checkAuth =
  (...authRoles: string[]) =>
  (req: Request, res: Response, next: NextFunction) => {
    try {
      const accessToken = req.headers.authorization;

      if (!accessToken) {
        throw new AppError(403, "No token found");
      }

      const token = accessToken.split(" ")[1];

      const verifiedToken = verifyToken(
        token,
        envVars.JWT_SECRET
      ) as JwtPayload;

      // attach user info
      req.user = verifiedToken;

      // role check
      if (authRoles.length && !authRoles.includes(verifiedToken.role)) {
        throw new AppError(403, "You are not permitted to view this route!!!");
      }

      next();
    } catch (error) {
      next(error);
    }
  };