process.on("uncaughtException", (err, result) => {
    console.log(err);
    process.exit(1);
})

import dotenv from "dotenv";
dotenv.config({
    path: `.env.${process.env.NODE_ENV}`
})


import express from "express";
const app = express();  


import connectDb from "./config/mongoDb";
import { connectRedis } from "./config/redis";

connectDb();
connectRedis();



import cors from "cors";
import helmet from "helmet";
import session from "./middlewares/session";
import { appRateLimiter } from "./middlewares/rateLimiter"


app.use(express.urlencoded({ extended: false }))
app.use(express.json({ limit: "10kb" }));
app.use(cors());
app.use(helmet());
app.use(appRateLimiter);
app.use(session);

import checkSession from "./middlewares/checkSession";
app.use(checkSession);

import routes from "./routes/mainRoutes"
app.use(routes);

import errorHandler from "./middlewares/errorHandler"
app.use(errorHandler);


app.listen(8080, () => {
    console.log("http://localhost:8080 üzerinden calisiyor.")
})