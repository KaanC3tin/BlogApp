import mongoose from "mongoose";
const Schema = mongoose.Schema;

const categorySchema = new Schema({
    name: { type: String, required: true }
}, { timestamps: true })

export default mongoose.model("Categories", categorySchema);

import Category from "./category"

export const getCategories = () => Category.find();
export const getCategoryById = (categoryId: string) => Category.findOne({ _id: categoryId });
export const getCategoryByName = (categoryName: string) => Category.findOne({ name: categoryName });

export const createCategory = (values: object) => new Category(values).save().then(category => category.toObject());
export const updateCategoryById = (categoryId: string, values: object) => Category.findByIdAndUpdate(categoryId, values);
export const deleteCategoryById = (categoryId: string) => Category.findByIdAndDelete(categoryId);
