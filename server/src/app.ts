import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";

import authRoutes from "./routes/authRoutes.ts";
import blogRoutes from "./routes/blogRoutes.ts";
import commentRoutes from "./routes/commentRoutes.ts";
import aiRoutes from "./routes/aiRoutes.ts";

const app = express();

app.use(cookieParser());
app.use(express.json());
app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);

app.use("/api/auth", authRoutes);
app.use("/api/blogs", blogRoutes);
app.use("/api/comments", commentRoutes);
app.use("/api/ai", aiRoutes);

export default app;
