import express from "express"
export default (req: express.Request, res: express.Response, next: express.NextFunction) => {
    try {
        if (req.session && (req.session as any).userId && (req.session as any).email && (req.session as any).isAdmin) {
            //session bulduysa varsa eğer 
            res.locals.userId = (req.session as any).userId
            res.locals.email = (req.session as any).email
            res.locals.isAdmin = (req.session as any).isAdmin
            return next();
        }
        return next();
    } catch (error) {
        next(error);
    }
}