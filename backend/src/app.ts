import express from "express";
import cors from "cors";
const app = express();
app.use(express.urlencoded({ extended: false }))
app.use(express.json());
app.use(cors());

import dotenv from "dotenv";
dotenv.config({
    path:`.env.${process.env.NODE_ENV}`
})


import connectDb from "./db";

connectDb();

import session from "express-session";

app.use(session({
    secret: 'keyboard cat',
  }))

import authRoutes from "./routes/auth"
import blogRoutes from "./routes/blog"

import swaggerUi  from "swagger-ui-express";
import swaggerDocument from "./swagger.json"

app.use("/api/auth",authRoutes);
app.use("/api/blogs",blogRoutes);

app.use("/swagger",swaggerUi.serve,swaggerUi.setup(swaggerDocument));

app.listen(8080, () => {
    console.log("http://localhost:8080 üzerinden calisiyor.")
})