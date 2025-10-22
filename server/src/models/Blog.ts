import mongoose, { Schema, type InferSchemaType } from "mongoose";

const blogSchema = new mongoose.Schema({
  title: { type: String, required: true, trim: true },
  slug: { type: String, required: true, unique: true },
  excerpt: { type: String, required: true, trim: true, maxLength: 200 },
  content: { type: String, required: true },
  coverImage: { type: String, required: true },
  author: { type: Schema.Types.ObjectId, ref: "User", required: true },
  tags: [{ type: String, lowercase: true }],
  category: { type: String, required: true },
  status: { type: String, enum: ["draft", "published"], default: "draft" },
});

export type IBlog = InferSchemaType<typeof blogSchema>;

export default mongoose.model<IBlog>("Blog", blogSchema);
