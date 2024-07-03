import mongoose from "mongoose";
import config from "./config"

export default () => {
    mongoose.connect(config.MONGO_HOST as string)
    console.log("Db baglantisi basarili");
}