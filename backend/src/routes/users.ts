import express from "express";
const router = express.Router();
import { getProfileInfo, deleteAccount } from "../controllers/user"


router.delete("/", deleteAccount);
router.get("/", getProfileInfo); // /api/users
router.put("/");




export default router;