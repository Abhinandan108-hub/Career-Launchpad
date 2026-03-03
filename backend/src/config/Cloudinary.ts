import { v2 as cloudinary } from 'cloudinary';
import { CloudinaryStorage } from 'multer-storage-cloudinary';
import multer from 'multer';

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

// Storage for profile avatars
export const avatarStorage = new CloudinaryStorage({
  cloudinary,
  params: {
    folder: 'career_launchpad/avatars',
    allowed_formats: ['jpg', 'jpeg', 'png', 'webp'],
    transformation: [{ width: 400, height: 400, crop: 'fill' }],
  } as Record<string, unknown>,
});

// Storage for resume files
export const resumeStorage = new CloudinaryStorage({
  cloudinary,
  params: {
    folder: 'career_launchpad/resumes',
    allowed_formats: ['pdf', 'doc', 'docx'],
    resource_type: 'raw',
  } as Record<string, unknown>,
});

export const uploadAvatar = multer({
  storage: avatarStorage,
  limits: { fileSize: 5 * 1024 * 1024 }, // 5MB
});

export const uploadResume = multer({
  storage: resumeStorage,
  limits: { fileSize: 10 * 1024 * 1024 }, // 10MB
});

export const deleteFile = async (publicId: string): Promise<void> => {
  await cloudinary.uploader.destroy(publicId);
};

export default cloudinary;