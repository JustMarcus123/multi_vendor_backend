import { Router } from "express";
import rateLimit from "express-rate-limit";

import * as AuthV from "../validators/authValidators";
import validate from "../middleware/validate";
import asyncHandler from "../utils/asyncHandlers";
import * as auth from "../controllers/auth.controllers";
import { authenticate } from "../middleware/authenticate";
import { requiredRole } from "../middleware/requiredRole";
import { S3Client } from "@aws-sdk/client-s3";
import dotenv from "dotenv";
import { upload } from "../middleware/upload";
import * as ProductV from "../validators/ProductValidator";
import * as product from "../controllers/product.controller";
import * as productCat from "../controllers/productCategoryController"

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
  asyncHandler(auth.register),
);



router.post(
  "/auth/login",
  authLimiter,
  validate(AuthV.LoginSchema),
  asyncHandler(auth.login),
);

router.get("/auth/me", authenticate, asyncHandler(auth.me));

router.post("/auth/logout", asyncHandler(auth.logout));

//for uploading the products by vendor
// in your router
router.post(
  "/vendor/products",
  authenticate,
  requiredRole("vendor"),
  upload.array("images", 5), // field name must be "images"
  validate(ProductV.CreateProductSchema),
  asyncHandler(product.create),
);

router.get(
  "/vendor/products",
  authenticate,
  requiredRole("vendor"),
  asyncHandler(product.listMine),
);

router.get("/product/category",authenticate, 
  requiredRole("vendor"), 
  asyncHandler(productCat.getProductCategory) )

export default router;
