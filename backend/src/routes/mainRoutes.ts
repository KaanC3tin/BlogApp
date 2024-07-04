import express from "express"
const app = express();

import blogRoutes from "./blog"
import categoryRoutes from "./category"
import authRoutes from "./auth"
import commentRoutes from "./comment"
import userRoutes from "./users"
import uploadRoutes from "./upload"

import swaggerUi from "swagger-ui-express";
import swaggerDocument from "../swagger.json"

app.use("/api/uploads",uploadRoutes)
app.use("/api/auth",authRoutes)
app.use("/api/blogs",blogRoutes)
app.use("/api/categories",categoryRoutes)
app.use("/api/profile",userRoutes)
app.use("/api/comments",commentRoutes)
app.use("/swagger", swaggerUi.serve, swaggerUi.setup(swaggerDocument));

export default app;