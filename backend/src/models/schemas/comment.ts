import mongoose from "mongoose";
import { Schema } from "mongoose";

const commentSchema = new Schema({
    blogId: { type: Schema.Types.ObjectId, ref: "blogs" },
    userId: { type: Schema.Types.ObjectId, ref: "users" },
    content: { type: String, required: true }
}, { timestamps: true })

export default mongoose.model("Comments", commentSchema);

import Comment from "./comment"

export const getCommentsByBlogId = (blogId: string) => Comment.find({ blogId: blogId }).populate("userId");
export const getCommentsByUserId = (userId: string) => Comment.find({ userId: userId })

export const createComment = (values: object) => new Comment(values).save().then(comment => comment.toObject());
export const updateCommentById = (commentId: string, values: object) => Comment.findByIdAndUpdate(commentId, values);
export const deleteCommentById = (commentId: string) => Comment.findByIdAndDelete(commentId);