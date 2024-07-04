import express from "express";
import { getBlogById, getBlogs, deleteBlogById, createBlog } from "../models/schemas/blog"
// import { getBlogDetailByBlogId, deleteBlogDetailById, updateBlogDetailById } from "../models/schemas/blogDetail"
import NotFoundError from "../errors/NotFoundError"
import { redisClient } from "../config/redis";

import Enum from "../utils/enum";

export const getAllBlogs = async (req: express.Request, res: express.Response, next: express.NextFunction) => {
    const cacheKey = Enum.CACHE_KEYS.BLOGS;
    try {
        let blogs: any = await redisClient.get(cacheKey);
        if (blogs) {
            console.log("cacheden cekti")
            return res.status(200).json(JSON.parse(blogs));
        }
        else if (!blogs) {
            blogs = await getBlogs();
            if (!blogs) {
                throw new NotFoundError("Blog bulunamadi");
            }
            console.log("veritabanindan cekti")
            await redisClient.setEx(cacheKey, 600, JSON.stringify(blogs)); // 600 second
        }
        // const blogs = await getBlogs();
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
    const { title, description, categoryId } = req.body;
    const userId = res.locals.userId;
    const cacheKey = Enum.CACHE_KEYS.BLOGS;
    const imageName = req.file ? req.file.filename : null; // burada yalnızca dosya ismini alıyor ve kaydediyor veri tabanına
    try {
        //validation

        const imageUrl = `${req.protocol}://${req.get('host')}/uploads/${imageName}`;
        await createBlog({
            title,
            imageUrl:imageUrl,
            description,
            categoryId,
            userId
        })
        await redisClient.del(cacheKey)
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

