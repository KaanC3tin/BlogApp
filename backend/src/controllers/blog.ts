import express from "express";
import Blog from "../models/blog"

export const getBlogs = async (req: express.Request, res: express.Response) => {
    try {
        // const blogs = await Blog.find();
        console.log((req.session as any).userId);
        console.log((req.session as any));
    } catch (error) {
        console.log(error)
        return res.sendStatus(400)
    }
}
