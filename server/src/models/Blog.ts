import mongoose, { Schema, type InferSchemaType } from "mongoose";

const blogSchema = new mongoose.Schema(
  {
    title: { type: String, required: true, trim: true },
    slug: { type: String, required: true, unique: true },
    excerpt: { type: String, trim: true, maxLength: 200 },
    content: { type: Object },
    coverImage: { type: String },
    author: { type: Schema.Types.ObjectId, ref: "User", required: true },
    tags: [{ type: String, lowercase: true }],
    category: { type: String },
    likes: { type: Number, default: 0 },
    researchResults: [
      {
        query: { type: String },
        research: { type: Schema.Types.Mixed },
      },
    ],
    status: {
      type: String,
      enum: ["draft", "reviewPending", "published"],
      default: "draft",
    },
  },
  { timestamps: true }
);

export type IBlog = InferSchemaType<typeof blogSchema>;

export default mongoose.model<IBlog>("Blog", blogSchema);
