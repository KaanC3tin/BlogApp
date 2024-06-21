import express from "express";
const router = express.Router();
import { login, register,logout } from "../controllers/auth"


router.get("/logout", logout);
router.post("/register", register);
router.post("/login", login);




export default router;