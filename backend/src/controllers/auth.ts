import express from "express";
import User from "../models/user"
import { sha256Hash, compareHash, createJwtToken } from "../helpers/authentication";

export const login = async (req: express.Request, res: express.Response) => {
    const { email, password } = req.body
    try {
        //validate
        const user = await User.findOne({ email: email })
        if (!user) {
            return res.sendStatus(400);
        }
        const isMatch: boolean = compareHash(password, user.password);
        if (!isMatch) {
            return res.sendStatus(403)
        }
        // const jwtToken = createJwtToken(user._id.toString(), user.email, user.isAdmin);
        (req.session as any).isAdmin = user.isAdmin;
        (req.session as any).userId = user._id.toString();
        (req.session as any).email = user.email;
        return res.status(302).json("Giris basarili");
        // return res.status(302).setHeader("auhtorization", jwtToken).json({ token: jwtToken })
    } catch (error) {
        console.log(error)
        return res.sendStatus(400)
    }
}

export const register = async (req: express.Request, res: express.Response) => {
    const { username, email, password } = req.body;
    try {
        //validate 
        const existingUser = await User.findOne({ email: email })
        if (existingUser) {
            return res.status(400).json("Bu email adresi zaten kayıtlı.")
        }
        const hashedPassword = sha256Hash(password);
        const user = new User({
            username: username,
            email: email,
            password: hashedPassword
        })
        await user.save();
        return res.status(201).json("Hesap basariyla oluşturuldu.")
    } catch (error) {
        console.log(error)
        return res.status(400).json();
    }
}

export const logout = async (req: express.Request, res: express.Response) => {
    try {


        req.session.destroy((err) => {
            if (err) {
                console.log(err)
                return res.sendStatus(500);
            }
        })
        res.clearCookie("connect.sid", { path: "/" })

        return res.status(200).json("Oturum sonlandırıldı.")
    } catch (error) {
        console.log(error)
        return res.sendStatus(400)
    }
}