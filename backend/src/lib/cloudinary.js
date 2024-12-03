import { v2 as cloudinary } from "cloudinary";
import dotenv from "dotenv";

dotenv.config();

cloudinary.config({
    cloud_name: dotenv.process.CLOUDINARY_CLOUD_NAME,
    api_key: dotenv.process.CLOUDINARY_API_KEY,
    api_secret: dotenv.process.CLOUDINARY_API_SECRET
});

export default cloudinary;