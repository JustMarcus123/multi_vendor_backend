
import { Router } from "express";
import rateLimit from "express-rate-limit";

import * as AuthV from "../validators/authValidators";
import validate from "../middleware/validate";
import asyncHandler from "../utils/asyncHandlers";
import * as auth from "../controllers/auth.controllers";
import { authenticate } from "../middleware/authenticate";

const router = Router();

const authLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  limit: 50,
  standardHeaders: true,
  legacyHeaders: false,
});

router.get("/health", (_req, res) => {
  res.json({ status: "ok" });
});

router.post(
  "/auth/register",
  authLimiter,
  validate(AuthV.RegisterSchema),
  asyncHandler(auth.register)
);

router.post(
  "/auth/login",
  authLimiter,
  validate(AuthV.LoginSchema),
  asyncHandler(auth.login)
);

router.get(
  "/auth/me",
  authenticate,
  asyncHandler(auth.me)
);

router.post(
  "/auth/logout",
  asyncHandler(auth.logout)
);

export default router;
