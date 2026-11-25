/**
 * Author: Mangkholen chongloi(marcus)
Date Created: 2026-10-22
Description: controller for auth
Version: 1.0.0
Copyright: Copyright (c) 2026 marcus. All rights reserved.
 */
import { Request, Response } from "express";
import jwt from "jsonwebtoken";
import * as authService from "../services/auth.services";
import type { AuthRequest } from "../middleware/authenticate";
import JWT_ACCESS_SECRET from "../config/env";
import env from "../config/env";

const COOKIE_NAME = "accessToken";

const cookieOptions = {
  httpOnly: true,
  secure: process.env.NODE_ENV === "production", // was "development"
  sameSite: "lax" as const,
  maxAge: 15 * 60 * 1000,
  path: "/",
};

function createAccessToken(userId: string): string {
  return jwt.sign({ sub: userId }, env.jwtAccessSecret, { expiresIn: "15m" });
}

export async function register(req: Request, res: Response) {
  res.status(201).json(await authService.register(req.body));
}

export async function login(req: Request, res: Response) {
  const result = await authService.login(req.body);

  const token = createAccessToken(result.user.id);
  res.cookie(COOKIE_NAME, token, cookieOptions);

  res.status(200).json({
    user: result.user,
  });
}

export async function me(req: AuthRequest, res: Response) {
  const userId = req.auth!.userId;

  const result = await authService.getUserById(userId);

  res.status(200).json(result);
}

export async function logout(_req: Request, res: Response) {
  res.clearCookie(COOKIE_NAME, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
  });

  res.status(200).json({
    message: "Logged out successfully",
  });
}
