import express from "express";
import { getUserById, deleteUserById, updateUserById } from "../models/schemas/user"

import CustomError from "../utils/classes/CustomError";
import Response from "../utils/classes/Response";
import { redisClient } from "../config/redis";
import { CACHE_CONFIG } from "../utils/enum";

const cacheExpireTime = CACHE_CONFIG.PROFILE.EXPIRE_TIME

export const getProfileInfo = async (req: express.Request, res: express.Response, next: express.NextFunction) => {
    const userId = res.locals.userId;
    try {

        let cachedUser = await redisClient.get(`user:${userId}`);
        if (cachedUser) {
            return res.status(200).json(Response.successResponse(JSON.parse(cachedUser)));
        }
        const user = await getUserById(userId);
        if (!user) {
            throw new CustomError(404, "Not found", "Kullanıcı bulunamadı.");
        }
        await redisClient.setEx(`user:${userId}`, cacheExpireTime, JSON.stringify(user))
        return res.status(200).json(Response.successResponse(user));
    } catch (error) {
        next(error);
    }
}


export const updateProfile = async (req: express.Request, res: express.Response, next: express.NextFunction) => {
    const userId = res.locals.userId;
    const { username, email } = req.body;
    try {
        //validate et joi ile
        const user = await getUserById(userId);
        if (!user) {
            throw new CustomError(404, "Not found", "Kullanıcı bulunamadi");
        }
        await updateUserById(userId, {
            username,
            email
        })
        return res.status(200).json(Response.successResponse(null, "Kullanıcı güncellendi."));
    } catch (error) {
        next(error)
    }
}
export const deleteAccount = async (req: express.Request, res: express.Response, next: express.NextFunction) => {
    const userId = res.locals.userId
    try {
        const user = await getUserById(userId);
        if (!user) {
            throw new CustomError(404, "Not found", "Kullanıcı bulunamadi");
        }

        await deleteUserById(userId);

        return res.status(200).json(Response.successResponse(null, "Kullanıcı silindi."));
    } catch (error) {
        next(error);
    }
}