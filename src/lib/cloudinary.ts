// utils/cloudinary.ts
import cloudinary from 'cloudinary';
import multer from 'multer';
import { CloudinaryStorage } from 'multer-storage-cloudinary';
import { NextApiRequest, NextApiResponse } from 'next';

const cloudinaryStorage = new CloudinaryStorage({
  cloudinary,
  params: {
    folder: 'your_folder_name', // Replace with your desired folder name
    format: async (req: NextApiRequest, file: Express.Multer.File) => 'png', // You can change the format as needed
  },
});

const multerConfig = multer({ storage: cloudinaryStorage });

export const uploadImage = multerConfig.single('image'); // 'image' is the name attribute in the form input

export default cloudinary;
