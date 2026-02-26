import { v2 as cloudinary } from "cloudinary";

cloudinary.config({
  secure: true,
});

const isCloudinaryConfigured = () => {
  return Boolean(process.env.CLOUDINARY_URL);
};

export const uploadToCloudinary = async (
  filePath,
  { folder, resourceType } = {},
) => {
  if (!isCloudinaryConfigured()) {
    throw new Error("Cloudinary is not configured");
  }

  const result = await cloudinary.uploader.upload(filePath, {
    folder,
    resource_type: resourceType,
  });

  return result;
};

export const deleteFromCloudinary = async (publicId, { resourceType } = {}) => {
  if (!isCloudinaryConfigured()) {
    throw new Error("Cloudinary is not configured");
  }

  return cloudinary.uploader.destroy(publicId, {
    resource_type: resourceType,
  });
};
