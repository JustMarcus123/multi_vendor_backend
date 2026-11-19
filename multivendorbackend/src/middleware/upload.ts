import multer from "multer";
import httpError from "../utils/httpErrors";

export const upload = multer({
  storage: multer.memoryStorage(), // keep file in RAM, then send to S3
  limits: { fileSize: 5 * 1024 * 1024, files: 5 }, // 5MB each, max 5 images
  fileFilter: (_req, file, cb) => {
    if (["image/jpeg", "image/png", "image/webp"].includes(file.mimetype)) {
      cb(null, true);
    } else {
      cb(new httpError(400, "Only JPG, PNG or WEBP images are allowed"));
    }
  },
});