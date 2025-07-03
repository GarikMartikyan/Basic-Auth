import config from "dotenv";
import express from "express";
import mongoose from "mongoose";
import {authRouter} from "./routes/authRoutes.js";

config.config();

const PORT = process.env.PORT || 5000;

const app = express();

app.use(express.json());
app.use("/auth", authRouter);

const start = async () => {
    try {
        await mongoose.connect(process.env.DB_URL)
        app.listen(PORT, () => {
            console.log(`DB connected, Server is running on port ${PORT}`);
        });
    } catch (e) {
        console.log(e)
    }
};

start();
