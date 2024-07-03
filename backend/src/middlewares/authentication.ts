import express from "express";
import User from "../models/schemas/user"

export const onlyUser = async (req: express.Request, res: express.Response, next: express.NextFunction) => {
    try {
        if (req.session && (req.session as any).userId && (req.session as any).email && (req.session as any).isAdmin) {
            //session bulduysa varsa eğer 
            const user = await User.findOne({ _id: (req.session as any).userId });
            if(!user){
                return res.status(403).json("Forbidden");
            }
            return next();
        }
        return res.status(403).json("Forbidden");
    } catch (error) {
        console.log(error);
        return res.status(400).json();
    }
}


export const onlyAdmin = async (req: express.Request, res: express.Response, next: express.NextFunction) => {
    try {
        if (req.session && (req.session as any).userId && (req.session as any).email && (req.session as any).isAdmin) {
            //session bulduysa varsa eğer 
            const user = await User.findOne({ _id: (req.session as any).userId });
            if(!user){
                return res.status(403).json("Forbidden");
            }
            if (!user.isAdmin) {
                return res.status(403).json("Forbidden");
            }
            return next();
        }
        return res.status(403).json("Forbidden");
    } catch (error) {
        console.log(error);
        return res.status(400).json();
    }
}
