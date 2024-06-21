import mongoose from "mongoose";
const Schema = mongoose.Schema;

const categorySchema = new Schema({
    name: { type: String, required: true },
    description: { type: String, required: true },
}, { timestamps: true })

export const Category = mongoose.model("categories", categorySchema);
