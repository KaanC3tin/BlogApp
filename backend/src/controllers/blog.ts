import express from "express";
import Blog from "../models/schemas/blog"
import { getBlogById, getBlogs, deleteBlogById, updateBlogById, createBlog } from "../models/schemas/blog"
// import { getBlogDetailByBlogId, deleteBlogDetailById, updateBlogDetailById } from "../models/schemas/blogDetail"
import ValidationError from "../errors/ValidationError"
import NotFoundError from "../errors/NotFoundError"
import { redisClient } from "../config/redis"

export const getAllBlogs = async (req: express.Request, res: express.Response, next: express.NextFunction) => {
    const { filter, page } = req.query;
    try {
        //validation
        const blogs = await getBlogs();
        if (!blogs) {
            throw new NotFoundError("Blog bulunamadi");
        }
        return res.status(200).json(blogs);
    } catch (error) {
        next(error);
    }
}

export const getBlogDetail = async (req: express.Request, res: express.Response, next: express.NextFunction) => {
    const blogId = req.params.blogId;
    try {
        //validation
        const blog = await getBlogById(blogId);
        if (!blog) {
            throw new NotFoundError("Blog detayi bulunamadi.");
        }
        return res.status(200).json(blog);
    } catch (error) {
        next(error);
    }
}

export const postCreateBlog = async (req: express.Request, res: express.Response, next: express.NextFunction) => {
    const { title, image, description, categoryId } = req.body;
    const userId = res.locals.userId;
    try {
        //validation
        await createBlog({
            title,
            image,
            description,
            categoryId,
            userId
        })
        return res.status(201).json("Blog olusturuldu");
    } catch (error) {
        next(error);
    }
}

export const deleteBlog = async (req: express.Request, res: express.Response, next: express.NextFunction) => {
    const blogId = req.params.blogId;
    const userId = res.locals.userId;
    try {
        //validation
        const blog = await getBlogById(blogId);
        if (!blog) {
            throw new NotFoundError("Blog bulunamadi");
        }
        await deleteBlogById(blogId);
        // await deleteBlogDetailById();

        return res.status(201).json("Blog olusturuldu");
    } catch (error) {
        next(error);
    }
}

