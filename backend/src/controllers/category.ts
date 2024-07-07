import express from "express";
import { getCategories, updateCategoryById, deleteCategoryById, createCategory } from "../models/schemas/category"

import CustomError from "../utils/classes/CustomError";
import Response from "../utils/classes/Response";
import { redisClient } from "../config/redis";
import { CACHE_CONFIG } from "../utils/enum";
import isValidMongoId from "../utils/functions/isMongoId";

const cacheKey = CACHE_CONFIG.CATEGORIES.KEY
const cacheExpireTime = CACHE_CONFIG.CATEGORIES.EXPIRE_TIME

export const getAllCategories = async (req: express.Request, res: express.Response, next: express.NextFunction) => {
    try {
        const cachedCategories = await redisClient.get(cacheKey);
        if (cachedCategories) {
            return res.status(200).json(Response.successResponse(JSON.parse(cachedCategories)));
        }
        const categories = await getCategories();
        if (!categories || categories.length === 0) {
            throw new CustomError(404, "Not found", "Kategoriler bulunamadı.");
        }
        await redisClient.setEx(cacheKey, cacheExpireTime, JSON.stringify(categories))
        return res.status(200).json(Response.successResponse(categories));
    } catch (error) {
        next(error);
    }
}

export const postCreateCategory = async (req: express.Request, res: express.Response, next: express.NextFunction) => {
    const { categoryName } = req.body;
    try {
        await createCategory({ name: categoryName })
        await redisClient.del(cacheKey);

        return res.status(201).json(Response.successResponse(null, "Kategori olusturuldu."))
    } catch (error) {
        next(error);
    }
}


export const updateCategory = async (req: express.Request, res: express.Response, next: express.NextFunction) => {
    const categoryId = req.params.categoryId;
    const { categoryName } = req.body;
    try {
        if (!isValidMongoId(categoryId)) {
            throw new CustomError(400, "Validation error", "Geçersiz kategori id")
        }
        //validate et joi ile
        await updateCategoryById(categoryId, {
            categoryName
        })
        await redisClient.del(cacheKey);
        return res.status(200).json(Response.successResponse(null, "Kategori güncellendi."));
    } catch (error) {
        next(error)
    }
}
export const deleteCategory = async (req: express.Request, res: express.Response, next: express.NextFunction) => {
    const categoryId = req.params.categoryId
    try {
        if (!isValidMongoId(categoryId)) {
            throw new CustomError(400, "Validation error", "Kategori id geçersiz.");
        }
        await deleteCategoryById(categoryId);
        await redisClient.del(cacheKey);
        return res.status(200).json(Response.successResponse(null, "Kategori silindi."));
    } catch (error) {
        next(error);
    }
}