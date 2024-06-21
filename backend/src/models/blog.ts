import mongoose from "mongoose";
const Schema = mongoose.Schema;

const blogSchema = new Schema({
    name: { type: String, requried: true },
    description: { type: String, required: true },
    categoryId: { type: Schema.Types.ObjectId, ref: "categories" },
    userId: { type: Schema.Types.ObjectId, ref: "users" }
}, { timestamps: true })

export default mongoose.model("blogs", blogSchema);

