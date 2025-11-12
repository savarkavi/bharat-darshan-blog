import type { Request, Response } from "express";
import jwt from "jsonwebtoken";
import User from "../models/User.ts";
import bcrypt from "bcryptjs";
import crypto from "crypto";
import { sendEmail } from "../utils/sendVerificationEmail.ts";

const generateJWTToken = (userId: string) => {
  return jwt.sign({ userId }, process.env.JWT_SECRET as string, {
    expiresIn: "30d",
  });
};

const generateVerificationToken = () => {
  const rawToken = crypto.randomBytes(32).toString("hex");
  const hashedToken = crypto
    .createHash("sha256")
    .update(rawToken)
    .digest("hex");

  return { hashedToken, rawToken };
};

export const signUp = async (req: Request, res: Response) => {
  try {
    const { fullname, username, email, password } = req.body;

    const existingUser = await User.findOne({
      $or: [{ email }, { username }],
    });

    if (existingUser) {
      return res.status(409).json({
        message: "User with the same email or username already exists",
      });
    }

    const user = await User.create({ fullname, username, email, password });

    const { hashedToken, rawToken } = generateVerificationToken();

    user.verificationToken = hashedToken;
    user.verificationTokenExpires = new Date(Date.now() + 24 * 60 * 60 * 1000);

    await user.save({ validateBeforeSave: false });

    const verifyUrl = `${
      process.env.SERVER_URL
    }/api/auth/verify-email?token=${rawToken}&id=${user._id.toString()}`;

    const html = `
      <p>Hi ${user.fullname},</p>
      <p>Please verify your email by clicking the link below:</p>
      <a href="${verifyUrl}">Verify Email</a>
      <p>If you didn't request this, ignore this email.</p>
    `;

    await sendEmail(user.email, "Email verification", html);

    const token = generateJWTToken(user._id.toString());

    res.cookie("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      maxAge: 30 * 24 * 60 * 60 * 1000,
    });

    res.status(201).json({
      userId: user._id.toString(),
      fullname: user.fullname,
      username: user.username,
      email: user.email,
      role: user.role,
    });
  } catch (error) {
    if (error instanceof Error) {
      return res.status(500).json({ message: error.message });
    }
    return res.status(500).json({ message: "Something went wrong" });
  }
};

export const signIn = async (req: Request, res: Response) => {
  try {
    const { emailOrUsername, password } = req.body;

    const user = await User.findOne({
      $or: [{ email: emailOrUsername }, { username: emailOrUsername }],
    });

    if (!user) {
      return res
        .status(400)
        .json({ message: "User does not exist. Try Signing Up instead." });
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res
        .status(400)
        .json({ message: "Wrong password. Try a different one." });
    }

    const token = generateJWTToken(user._id.toString());

    res.cookie("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      maxAge: 30 * 24 * 60 * 60 * 1000,
    });

    res.json({
      userId: user._id.toString(),
      fullname: user.fullname,
      username: user.username,
      email: user.email,
      role: user.role,
    });
  } catch (error) {
    if (error instanceof Error) {
      return res.status(500).json({ message: error.message });
    }
    return res.status(500).json({ message: "Something went wrong" });
  }
};

export const signOut = async (req: Request, res: Response) => {
  try {
    res.clearCookie("token", {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
    });

    return res.status(200).json({ message: "Signed out successfully" });
  } catch (error) {
    if (error instanceof Error) {
      return res.status(500).json({ message: error.message });
    }
    return res.status(500).json({ message: "Something went wrong" });
  }
};

export const verifyEmail = async (req: Request, res: Response) => {
  try {
    const { token, id } = req.query as { token?: string; id: string };

    if (!token) {
      return res.status(400).json({ message: "Invalid verification link" });
    }

    const hashedToken = crypto.createHash("sha256").update(token).digest("hex");

    const user = await User.findOne({
      _id: id,
      verificationToken: hashedToken,
    });

    if (!user) {
      return res.status(400).json({ message: "Token is invalid" });
    }

    if (
      user.verificationTokenExpires &&
      user.verificationTokenExpires < new Date()
    ) {
      return res.status(400).json({
        message: "Verification link expired. Please request a new one.",
      });
    }

    user.isVerified = true;
    user.verificationToken = null;
    user.verificationTokenExpires = null;

    await user.save();

    return res.redirect(`${process.env.CLIENT_URL}`);
  } catch (error) {
    if (error instanceof Error) {
      return res.status(500).json({ message: error.message });
    }
    return res.status(500).json({ message: "Something went wrong" });
  }
};

export const resendVerification = async (req: Request, res: Response) => {
  try {
    const user = await User.findOne({ email: req.user.email });

    if (!user) return res.status(400).json({ message: "User not found" });

    if (user.isVerified) {
      return res.status(400).json({ message: "Email already verified" });
    }

    const { rawToken, hashedToken } = generateVerificationToken();

    user.verificationToken = hashedToken;
    user.verificationTokenExpires = new Date(Date.now() * 24 * 60 * 60 * 1000);

    await user.save({ validateBeforeSave: false });

    const verifyUrl = `${
      process.env.SERVER_URL
    }/auth/verify-email?token=${rawToken}&id=${user._id.toString()}`;

    const html = `
      <p>Hi ${user.fullname},</p>
      <p>Please verify your email by clicking the link below:</p>
      <a href="${verifyUrl}">Verify Email</a>
      <p>If you didn't request this, ignore this email.</p>
    `;

    await sendEmail(user.email, "Email verification", html);

    res.json({ message: "Email verification resent" });
  } catch (error) {
    if (error instanceof Error) {
      return res.status(500).json({ message: error.message });
    }
    return res.status(500).json({ message: "Something went wrong" });
  }
};

export const getAuthUser = async (req: Request, res: Response) => {
  try {
    const user = await User.findById(req.user._id).select("-password");

    if (!user) return res.status(400).json({ message: "User not found" });

    res.json({
      userId: user._id.toString(),
      fullname: user.fullname,
      username: user.username,
      email: user.email,
      role: user.role,
    });
  } catch (error) {
    if (error instanceof Error) {
      return res.status(500).json({ message: error.message });
    }
    return res.status(500).json({ message: "Something went wrong" });
  }
};
