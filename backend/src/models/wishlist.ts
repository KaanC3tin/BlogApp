import mongoose from "mongoose";
import { Schema } from "mongoose";

const wishlistSchema = new Schema({
    postId: { type: Schema.Types.ObjectId, ref: "blogs" },
    userId: { type: Schema.Types.ObjectId, ref: "users" }
}, { timestamps: true })

export const Wishlist = mongoose.model("wishlists", wishlistSchema);
