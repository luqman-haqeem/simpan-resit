
import { z } from "zod";

const  FILE_SIZE = 5 * 1024 * 1024;
// Document Schema

export const RECEIPT_UPLOAD_SCHEMA = z
    .instanceof(File)
    .refine(
      (file) =>
        ["application/pdf", "image/png", "image/jpeg", "image/jpg"].includes(file.type),
      { message: "Invalid file type. Only PDF and image files are allowed." }
    )
    .refine(
      (file) => file.size <= FILE_SIZE,
      { message: "File size must be less than 5 MB." }
    );