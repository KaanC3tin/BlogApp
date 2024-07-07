import express from "express"
const app = express();

import blogRoutes from "./blog"
import categoryRoutes from "./category"
import authRoutes from "./auth"
import commentRoutes from "./comment"
import profileRoutes from "./profile"

import swaggerUi from "swagger-ui-express";
import swaggerDocument from "../swagger.json"

app.use("/api/blogs",blogRoutes)
app.use("/api/profile",profileRoutes)
app.use("/api/categories",categoryRoutes)
app.use("/api/comments",commentRoutes)
app.use("/api/auth",authRoutes)
app.use("/swagger", swaggerUi.serve, swaggerUi.setup(swaggerDocument));


export default app;