import express from "express";
import cors from "cors";


const app = express();



app.use(express.urlencoded({ extended: false }))
app.use(express.json());
app.use(cors());








app.listen(3000, () => {
    console.log("http://localhost:3000 üzerinden calisiyor.")
})