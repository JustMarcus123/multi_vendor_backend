import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import env from "../config/env";

export interface AuthRequest extends Request {
  auth?: { userId: string };
}

export function authenticate(
  req: AuthRequest,
  res: Response,
  next: NextFunction
) {
  try {
    const token = req.cookies?.accessToken;

    if (!token) {
      res.status(401).json({ message: "Authentication required" });
      return;
    }

    const decoded = jwt.verify(token, env.jwtAccessSecret);

    if (typeof decoded === "string" || !decoded.sub) {
      res.status(401).json({ message: "Invalid authentication token" });
      return;
    }

    req.auth = { userId: decoded.sub };
    next();
  } catch {
    res.status(401).json({ message: "Invalid or expired token" });
  }
}