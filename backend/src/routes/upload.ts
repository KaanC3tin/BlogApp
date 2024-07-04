import express from "express";
const router = express.Router();
import upload from "../helpers/fileUpload";


router.post("/", upload.single("file"), (req, res, next) => {
    const file = req.file;
    console.log(file);
    try {
        return;
        return res.status(200).json(req.file);
    } catch (error) {
        next(error);
    }
});

export default router;