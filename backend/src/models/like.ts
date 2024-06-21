import mongoose from "mongoose";
import { Schema } from "mongoose";

const likeSchema = new Schema({
    postId: { type: Schema.Types.ObjectId, ref: "blogs" },
    userId: { type: Schema.Types.ObjectId, ref: "users" }
}, { timestamps: true })

export const Like = mongoose.model("likes", likeSchema);
