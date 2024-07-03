import express from "express";
import User from "../models/schemas/user"
import { getUserByEmail, getUserById, deleteUserById, updateUserById } from "../models/schemas/user"
import ValidationError from "../errors/ValidationError"
import NotFoundError from "../errors/NotFoundError"

export const getProfileInfo = async (req: express.Request, res: express.Response, next: express.NextFunction) => {
    const userId = res.locals.userId;
    try {
        const user = await getUserById(userId);
        if (!user) {
            throw new NotFoundError("Kullanıcı");
        }
        return res.status(200).json(user);
    } catch (error) {
        next(error);
    }
}


export const updateProfileInfo = async (req: express.Request, res: express.Response, next: express.NextFunction) => {
    const userId = res.locals.userId;
    const { username, email } = req.body;
    try {
        //validate et joi ile
        const user = await getUserById(userId);
        if (!user) {
            throw new NotFoundError("Kullanıcı bulunamadi");
        }
        await updateUserById(userId, {
            username,
            email
        })
        return res.status(200).json("Hesap güncellendi.");
    } catch (error) {
        next(error)
    }
}
export const deleteAccount = async (req: express.Request, res: express.Response, next: express.NextFunction) => {
    const userId = res.locals.userId
    try {
        const user = await getUserById(userId);
        if (!user) {
            throw new NotFoundError("Kullanıcı bulunamadi");
        }

        await deleteUserById(userId);

        return res.status(200).json("Hesap silindi");
    } catch (error) {
        next(error);
    }
}