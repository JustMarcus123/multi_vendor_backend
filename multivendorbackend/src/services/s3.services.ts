import { PutObjectCommand, DeleteObjectCommand, GetObjectCommand } from "@aws-sdk/client-s3";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";
import { randomUUID } from "crypto";
import { s3 } from "../config/s3";
import env from "../config/env";

const EXT: Record<string, string> = {
  "image/jpeg": "jpg",
  "image/png": "png",
  "image/webp": "webp",
};

export async function uploadProductImage(file: Express.Multer.File, vendorId: string) {
  // never trust file.originalname: build the key yourself
  const key = `products/${vendorId}/${randomUUID()}.${EXT[file.mimetype]}`;

  await s3.send(
    new PutObjectCommand({
      Bucket: env.bucketName,
      Key: key,
      Body: file.buffer,
      ContentType: file.mimetype,
    })
  );
  return key;
}

export function deleteImage(key: string) {
  return s3.send(new DeleteObjectCommand({ Bucket: env.bucketName, Key: key }));
}

export function getImageUrl(key: string) {
  return getSignedUrl(
    s3,
    new GetObjectCommand({ Bucket: env.bucketName, Key: key }),
    { expiresIn: 60 * 60 } // 1 hour
  );
}