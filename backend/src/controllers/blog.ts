import express from "express";
import { getBlogById, getBlogs, deleteBlogById, createBlog } from "../models/schemas/blog"
import { redisClient } from "../config/redis";
import Response from "../utils/classes/Response";
import CustomError from "../utils/classes/CustomError";
import { CACHE_CONFIG } from "../utils/enum";
import isValidMongoId from "../utils/functions/isMongoId"
import { getCategoryByName, getCategoryById } from "../models/schemas/category";
import checkUserPermission from "../utils/functions/checkUserPermission";

const cacheKey = CACHE_CONFIG.BLOGS.KEY
const cacheExpireTime = CACHE_CONFIG.BLOGS.EXPIRE_TIME

export const getAllBlogs = async (req: express.Request, res: express.Response, next: express.NextFunction) => {
    try {
        let cachedBlogs = await redisClient.get(cacheKey);
        if (cachedBlogs) {
            console.log("cacheden cekti")
            return res.status(200).json(Response.successResponse(JSON.parse(cachedBlogs)));
        }
        const blogs = await getBlogs();
        if (!blogs || blogs.length === 0) {
            throw new CustomError(404, "Not found", "Bloglar bulunamadı.")
        }
        await redisClient.setEx(cacheKey, cacheExpireTime, JSON.stringify(blogs));
        return res.status(200).json(Response.successResponse(blogs));
    } catch (error) {
        next(error);
    }
}

export const getBlogDetail = async (req: express.Request, res: express.Response, next: express.NextFunction) => {
    const blogId = req.params.blogId;
    try {
        if (!isValidMongoId(blogId)) {
            throw new CustomError(400, "Validation error", "Invalid blog id");
        }
        //validation
        const blog = await getBlogById(blogId);
        if (!blog) {
            throw new CustomError(404, "Not found", "Blog detay bulunamadı.");
        }
        return res.status(200).json(Response.successResponse(blog));
    } catch (error) {
        next(error);
    }
}

export const postCreateBlog = async (req: express.Request, res: express.Response, next: express.NextFunction) => {
    const { title, description, categoryName } = req.body;
    const userId = res.locals.userId;
    const imageName = req.file ? req.file.filename : null; // burada yalnızca dosya ismini alıyor ve kaydediyor veri tabanına
    try {
        //validation imageName'i validate et 
        const category = await getCategoryByName(categoryName);
        if (!category) {
            throw new CustomError(400, "Validation error", "Bu isimde bir kategori bulunmuyor.")
        }

        const imageUrl = `${req.protocol}://${req.get('host')}/uploads/${imageName}`;

        await createBlog({
            title,
            imageUrl,
            description,
            categoryId: category._id,
            userId
        })
        await redisClient.del(cacheKey)
        return res.status(201).json(Response.successResponse(null, "Blog oluşturuldu."));
    } catch (error) {
        next(error);
    }
}

export const deleteBlog = async (req: express.Request, res: express.Response, next: express.NextFunction) => {
    const blogId = req.params.blogId;
    const userId = res.locals.userId;
    try {
        if (!isValidMongoId(blogId)) {
            throw new CustomError(400, "Validation error", "Invalid blog id");
        }
        //validation
        const blog = await getBlogById(blogId);
        if (!blog) {
            throw new CustomError(404, "Not found", "Blog bulunamadı.")
        }
        console.log(blog.userId?.toString());
        if (!checkUserPermission(userId, blog.userId?.toString())) {
            throw new CustomError(401,"Unauthorized","Bu blogu silmeye yetkin yok.")
        }
        await deleteBlogById(blogId);
        await redisClient.del(cacheKey)
        return res.status(201).json(Response.successResponse(null, "Blog başarıyla silindi"));
    } catch (error) {
        next(error);
    }
}

