import { Product } from "../models/Product";
import httpError from "../utils/httpErrors";
import { uploadProductImage, deleteImage, getImageUrl } from "./s3.services";




async function withImageUrls(p: any) {
  const imageUrls = await Promise.all(p.images.map(getImageUrl));
  return {
    id: String(p._id),
    name: p.name,
    category:p.category,
    price: p.price,
    stock: p.stock,
    images: imageUrls,
  };
}

export async function createProduct(
  vendorId: string,
  input: { name: string; Category: string; price: number; stock: number },
  files: Express.Multer.File[]
) {
  if (files.length === 0) throw new httpError(400, "At least one image is required");

  const keys = await Promise.all(files.map((f) => uploadProductImage(f, vendorId)));

  try {
    const product = await Product.create({ ...input, vendor: vendorId, images: keys });
    return withImageUrls(product);
  } catch (err) {
    // DB failed: don't leave orphaned files in S3
    await Promise.allSettled(keys.map(deleteImage));
    throw err;
  }
}

export async function listVendorProducts(vendorId: string) {
  const products = await Product.find({ vendor: vendorId }).sort({ createdAt: -1 });
  return Promise.all(products.map(withImageUrls));
}