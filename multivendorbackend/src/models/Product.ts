import { Schema, model, Types } from "mongoose";

const productSchema = new Schema(
  {
    vendor: { type: Schema.Types.ObjectId, ref: "User", required: true, index: true },
    name: { type: String, required: true, trim: true },
    category: { type: String },
    price: { type: Number, required: true, min: 0 },
    stock: { type: Number, required: true, min: 0, default: 0 },
    images: { type: [String], default: [] }, // S3 keys, not URLs
  },
  { timestamps: true }
);

export const Product = model("Product", productSchema); 