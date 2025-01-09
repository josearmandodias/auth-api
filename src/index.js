import express from "express";
import cors from "cors";
import helmet from "helmet";
import cookieParser from "cookie-parser";
import mongoose from "mongoose";
import router from "./routers/index.router.js";
import dotenv from "dotenv";

dotenv.config();

const PORT = process.env.PORT;
const MONGO_URI = process.env.MONGO_URI;

const app = express();

//Allowing all CORS requests
app.use(cors());

app.use(helmet());

app.use(cookieParser());

app.use(express.json());

app.use(express.urlencoded({ extented: true }));

mongoose.connect(MONGO_URI).then(() => {
    console.log("Database connected");
}).catch((err) => {
    console.log(err);
});

app.use(router);

app.listen(PORT, () => {
    console.log(`Listening on port http://localhost:${PORT}`);
});