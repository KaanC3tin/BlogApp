import multer from "multer";
import express from "express";
import CustomError from "../utils/classes/CustomError";
import path from "path";
import fs from "fs";



const UPLOAD_DIR = path.join(__dirname, "..", "uploads")

if (!fs.existsSync(UPLOAD_DIR)) {
    fs.mkdirSync(UPLOAD_DIR, { recursive: true });
}


const diskStorage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, UPLOAD_DIR);
    },
    filename: (req, file, cb) => {
        // const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
        cb(null, file.originalname);
    }
});

const fileFilter = (req: express.Request, file: any, cb: any) => {
    const allowedTypes = ['image/jpeg', 'image/png', 'image/jpeg'];
    if (allowedTypes.includes(file.mimetype)) {
        cb(null, true);
    } else {
        cb(new CustomError(400,"Validation Error",'Invalid file type. Only JPEG, PNG files are allowed.'), false);
    }
};

const upload = multer({
    limits: {
        fileSize: 5 * 1024 * 1024 // 5mb
    },
    storage: diskStorage,
    fileFilter: fileFilter // sadece jpeg ve png tipinde dosya alıyor.
})




export default upload;