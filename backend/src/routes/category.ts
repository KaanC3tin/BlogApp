import express from "express";
const router = express.Router();
import { getAllCategories, deleteCategory, updateCategory, postCreateCategory } from "../controllers/category"
import { onlyAdmin } from "../middlewares/authentication";

router.get("/", getAllCategories);
router.post("/", postCreateCategory);
router.delete("/:categoryId", deleteCategory);
router.put("/", updateCategory);




export default router;