import express from "express";
import User from "../models/schemas/user"
import { sha256Hash, compareHash } from "../utils/functions/authFunctions";
import { getUserByEmail, createUser } from "../models/schemas/user"
import Response from "../utils/classes/Response";
import CustomError from "../utils/classes/CustomError";

export const login = async (req: express.Request, res: express.Response,next:express.NextFunction) => {
    const { email, password } = req.body
    try {
        //validate
        const user = await getUserByEmail(email);
        if (!user) {
            throw new CustomError(400,"Validation error","Email ya da şifre yanlış.");
        }
        const isMatch: boolean = compareHash(password, user.password);
        if (!isMatch) {
            throw new CustomError(400,"Validation error","Email ya da şifre yanlış.");
        }
        (req.session as any).isAdmin = user.isAdmin;
        (req.session as any).userId = user._id.toString();
        (req.session as any).email = user.email;
        return res.status(302).json(Response.successResponse(null,"Login islemi basarili."));
    } catch (error) {
        next(error);
    }
}

export const register = async (req: express.Request, res: express.Response,next:express.NextFunction) => {
    const { username, email, password } = req.body;
    try {
        //validate 
        const existingUser = await User.findOne({ email: email })
        if (existingUser) {
            throw new CustomError(400,"Validation error","Bu email adresini alamazsın.");
        }
        const hashedPassword = sha256Hash(password);
        await createUser({
            username,
            email,
            password: hashedPassword
        })

        return res.status(201).json(Response.successResponse(null,"Hesap başarıyla oluşturuldu."))
    } catch (error) {
        next(error);
    }
}

export const logout = async (req: express.Request, res: express.Response,next:express.NextFunction) => {
    try {

        req.session.destroy((err) => {
            if (err) {
                console.log(err)
                return res.sendStatus(500);
            }
        })
        res.clearCookie("sessId", { path: "/" })

        return res.status(200).json(Response.successResponse(null,"Oturum sonlandırıldı."))
    } catch (error) {
        next(error);
    }
}