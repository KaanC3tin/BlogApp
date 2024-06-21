import express from "express";
const router = express.Router();
import { getBlogs } from "../controllers/blog"


router.get("/", getBlogs);
// router.post("/", login);




export default router;