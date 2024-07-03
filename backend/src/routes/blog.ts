import express from "express";
const router = express.Router();
import { getAllBlogs, getBlogDetail, deleteBlog, postCreateBlog } from "../controllers/blog"


router.delete("/:blogId", deleteBlog);
router.get("/:blogId", getBlogDetail);
router.get("/", getAllBlogs);  // /api/blogs
router.post("/", postCreateBlog);

export default router;