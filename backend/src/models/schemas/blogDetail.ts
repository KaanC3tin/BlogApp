// import mongoose from "mongoose";
// const Schema = mongoose.Schema;

// const blogDetailSchema = new Schema({
//     description: { type: String, required: true },
//     blogId: { type: Schema.Types.ObjectId, ref: "Blogs" },
//     medias: [{ type: String }],
// }, { timestamps: true })

// export default mongoose.model("BlogDetails", blogDetailSchema); 

// import BlogDetail from "./blogDetail"

// export const getBlogDetailByBlogId = (blogId: string) => BlogDetail.findOne({ blogId: blogId }).populate("blogId mediaId");

// export const createBlogDetail = (values: object) => new BlogDetail(values).save().then(blogDetail => blogDetail.toObject());
// export const updateBlogDetailById = (blogDetailId: string, values: object) => BlogDetail.findByIdAndUpdate(blogDetailId, values);
// export const deleteBlogDetailById = (blogDetailId: string) => BlogDetail.findByIdAndDelete(blogDetailId);
