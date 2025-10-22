import express from "express";
import authRoutes from "./routes/authRoutes.ts";
import blogRoutes from "./routes/blogRoutes.ts";

const app = express();

app.use(express.json());

app.use("/api/auth", authRoutes);
app.use("/api/blogs", blogRoutes);

export default app;
