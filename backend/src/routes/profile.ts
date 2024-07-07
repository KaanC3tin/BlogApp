import express from "express";
const router = express.Router();
import { getProfileInfo, deleteAccount, updateProfile, } from "../controllers/profile"


router.delete("/", deleteAccount);
router.get("/", getProfileInfo); // /api/users
router.put("/", updateProfile);




export default router;