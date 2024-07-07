import express from "express";
import { getUserById } from "../models/schemas/user"
import CustomError from "../utils/classes/CustomError";

export const onlyUser = async (req: express.Request, res: express.Response, next: express.NextFunction) => {
    try {
        if (req.session && (req.session as any).userId && (req.session as any).email) {
            //session bulduysa varsa eğer 
            const user = await getUserById((req.session as any).userId);
            if (!user) {
                throw new CustomError(403,"Forbidden","Login olmalısın.")
            }
            return next();
        }
        throw new CustomError(403,"Forbidden","Login olmalısın.")
    } catch (error) {
        next(error);
    }
}


export const onlyAdmin = async (req: express.Request, res: express.Response, next: express.NextFunction) => {
    try {
        if (req.session && (req.session as any).userId && (req.session as any).email) {
            //session bulduysa varsa eğer 
            const user = await getUserById((req.session as any).userId);
            if (!user) {
                throw new CustomError(403,"Forbidden","Login olmalısın.")
            }
            if (!user.isAdmin) {
                throw new CustomError(403,"Forbidden","Login olmalısın.")
            }
            return next();
        }
        throw new CustomError(403,"Forbidden","Login olmalısın.")
    } catch (error) {
        next(error)
    }
}
