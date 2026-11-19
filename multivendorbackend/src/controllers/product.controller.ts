import { Response } from "express";
import type { AuthRequest } from "../middleware/authenticate";
import * as productService from "../services/product.services";

export async function create(req: AuthRequest, res: Response) {
  const files = (req.files as Express.Multer.File[]) ?? [];
  const product = await productService.createProduct(
    req.auth!.userId,
    req.body,
    files
  );
  res.status(201).json({ product });
}

export async function listMine(req: AuthRequest, res: Response) {
  const products = await productService.listVendorProducts(req.auth!.userId);
  res.json({ products });
}