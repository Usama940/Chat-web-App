import dotenv from "dotenv";
dotenv.config();

import express from "express";
const app = express();

import cookieParser from "cookie-parser";
import cors from "cors";

import authRoutes from "./routes/auth.route.js";
import messageRoutes from "./routes/messege.route.js";
import { connectDB } from "./lib/db.js";

app.use(express.json());
app.use(cookieParser());
app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);

app.use("/api/auth", authRoutes);
app.use("/api/message", messageRoutes);

const PORT = process.env.PORT;
app.listen(PORT, () => {
  console.log(` server is running on  http://localhost:${PORT}`);
  connectDB();
});
