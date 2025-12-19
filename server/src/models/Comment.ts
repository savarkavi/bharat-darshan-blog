import mongoose, { Schema, type InferSchemaType } from "mongoose";

const commentSchema = new mongoose.Schema(
  {
    blog: { type: Schema.Types.ObjectId, ref: "Blog", required: true },
    author: { type: Schema.Types.ObjectId, ref: "User", required: true },
    content: { type: String, required: true },
    parent: { type: Schema.Types.ObjectId, ref: "Comment", default: null },
    likes: { type: Number, default: 0 },
  },
  { timestamps: true }
);

export type IComment = InferSchemaType<typeof commentSchema>;

export default mongoose.model<IComment>("Comment", commentSchema);
