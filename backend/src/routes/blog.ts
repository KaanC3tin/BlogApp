import express from "express";
const router = express.Router();
import { getAllBlogs, getBlogDetail, deleteBlog, postCreateBlog } from "../controllers/blog"
import upload from "../helpers/fileUpload";


router.delete("/:blogId", deleteBlog);
router.get("/:blogId", getBlogDetail);
router.get("/", getAllBlogs);  // /api/blogs
router.post("/", upload.single("image"), postCreateBlog);

export default router;