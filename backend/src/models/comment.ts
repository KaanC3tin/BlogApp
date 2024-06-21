import mongoose from "mongoose";
import { Schema } from "mongoose";

const commentSchema = new Schema({
    content: { type: String, required: true },
    postId: { type: Schema.Types.ObjectId, ref: "blogs" },
    userId: { type: Schema.Types.ObjectId, ref: "users" }
}, { timestamps: true })

export const Comment = mongoose.model("comments", commentSchema);
