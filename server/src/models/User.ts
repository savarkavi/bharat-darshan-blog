import bcrypt from "bcryptjs";
import mongoose, { Schema, Types, type InferSchemaType } from "mongoose";

const userSchema = new Schema(
  {
    fullname: { type: String, required: true, trim: true },
    username: {
      type: String,
      required: true,
      trim: true,
      lowercase: true,
      unique: true,
    },
    email: {
      type: String,
      required: true,
      trim: true,
      lowercase: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
      minLength: 6,
    },
    bio: {
      type: String,
      trim: true,
      maxLength: 500,
    },
    avatar: { type: String },
    role: {
      type: String,
      enum: ["user", "admin"],
      default: "user",
    },
    verificationToken: { type: String },
    verificationTokenExpires: { type: Date },
    isVerified: { type: Boolean, default: false },
  },
  { timestamps: true }
);

export type IUser = InferSchemaType<typeof userSchema> & {
  _id: Types.ObjectId;
};

userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();
  this.password = await bcrypt.hash(this.password, 12);
  next();
});

export default mongoose.model<IUser>("User", userSchema);
