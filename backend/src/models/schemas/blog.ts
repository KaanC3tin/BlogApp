import mongoose from "mongoose";
const Schema = mongoose.Schema;

const blogSchema = new Schema({
    title: { type: String, requried: true },
    image: { type: String },
    description: { type: String, required: true },
    categoryId: { type: Schema.Types.ObjectId, ref: "categories" },
    userId: { type: Schema.Types.ObjectId, ref: "users" }
}, { timestamps: true })

export default mongoose.model("Blogs", blogSchema);

import Blog from "./blog"; 

export const getBlogs = () => Blog.find();
export const getBlogById = (blogId: string) => Blog.findOne({ _id: blogId });
export const getBlogsByUserId = (userId: string) => Blog.find({ userId: userId });
export const getBlogsByCategoryId = (categoryId: string) => Blog.find({ categoryId: categoryId });

export const createBlog = (values: object) => new Blog(values).save().then(blog => blog.toObject());
export const updateBlogById = (blogId: string, values: object) => Blog.findByIdAndUpdate(blogId, values);
export const deleteBlogById = (blogId: string) => Blog.findByIdAndDelete(blogId);