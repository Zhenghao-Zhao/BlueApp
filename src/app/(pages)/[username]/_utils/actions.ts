"use server";
import {
  getImageURLFromFilename,
  uploadCloudImageBuffer,
} from "@/app/(server)/api/_utils";
import { supaUpdateProfileImage } from "@/app/(server)/api/_utils/queries";
import { Image } from "@/app/_libs/constants";
import { createClient } from "@/app/_libs/utils/supabase/server";
import { randomUUID } from "crypto";
import sharp from "sharp";

export async function addProfileImage(formData: FormData) {
  const file = formData.get("profileImage") as File;
  if (!file) throw Error("Upload file not found");

  const { buffer } = await processImage(file);
  const filename = randomUUID() as string;
  await uploadCloudImageBuffer(filename, buffer);

  const supabase = createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) throw Error("Unauthorized");

  const { error } = await supaUpdateProfileImage(supabase, user.id, filename);
  if (error) throw Error(error.message);

  return getImageURLFromFilename(filename);
}

export async function processImage(file: File) {
  if (!file.type.startsWith("image/"))
    throw new Error("File type not accepted.");

  const imageBuffer = await file.arrayBuffer();
  const width = Image.PROFILE_IMAGE_SIZE;
  const height = Image.PROFILE_IMAGE_SIZE;
  const COMPRESSION_QUALITY = 80;

  if (file.type === "image/gif" || file.type === "image/webp") {
    return {
      type: "webp",
      buffer: await sharp(imageBuffer, { animated: true })
        .resize(width, height)
        .webp({ quality: COMPRESSION_QUALITY })
        .toBuffer(),
    };
  }

  if (file.type === "image/png") {
    return {
      type: "png",
      buffer: await sharp(imageBuffer)
        .resize(width, height)
        .png({ quality: COMPRESSION_QUALITY })
        .toBuffer(),
    };
  }

  return {
    type: "jpeg",
    buffer: await sharp(imageBuffer)
      .resize(width, height)
      .jpeg({ quality: COMPRESSION_QUALITY })
      .toBuffer(),
  };
}
