import express from "express";
import User from "../models/schemas/user"
import { sha256Hash, compareHash } from "../helpers/authentication";
import { getUserByEmail, createUser } from "../models/schemas/user"
import ValidationError from "../errors/ValidationError"

export const login = async (req: express.Request, res: express.Response,next:express.NextFunction) => {
    const { email, password } = req.body
    try {
        //validate
        const user = await getUserByEmail(email);
        if (!user) {
            throw new ValidationError("Email ya da sifre yanlis.");
        }
        const isMatch: boolean = compareHash(password, user.password);
        if (!isMatch) {
            throw new ValidationError("Email ya da sifre yanlis.");
        }
        (req.session as any).isAdmin = user.isAdmin;
        (req.session as any).userId = user._id.toString();
        (req.session as any).email = user.email;
        return res.status(302).json("Giris basarili");
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
            throw new ValidationError("Bu email adresini alamazsınız.");
        }
        const hashedPassword = sha256Hash(password);
        await createUser({
            username,
            email,
            password: hashedPassword
        })

        return res.status(201).json("Hesap basariyla oluşturuldu.")
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

        return res.status(200).json("Oturum sonlandırıldı.")
    } catch (error) {
        next(error);
    }
}