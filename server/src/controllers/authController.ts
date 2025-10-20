import type { Request, Response } from "express";
import jwt from "jsonwebtoken";
import User from "../models/User.ts";
import bcrypt from "bcryptjs";

const generateToken = (userId: string) => {
  return jwt.sign({ userId }, process.env.JWT_SECRET as string, {
    expiresIn: "30d",
  });
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

    res.status(201).json({
      userId: user._id.toString(),
      fullname: user.fullname,
      username: user.username,
      email: user.email,
      role: user.role,
      token: generateToken(user._id.toString()),
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
      return res.status(400).json({ message: "Wrong password" });
    }

    res.json({
      userId: user._id.toString(),
      fullname: user.fullname,
      username: user.username,
      email: user.email,
      role: user.role,
      token: generateToken(user._id.toString()),
    });
  } catch (error) {
    if (error instanceof Error) {
      return res.status(500).json({ message: error.message });
    }
    return res.status(500).json({ message: "Something went wrong" });
  }
};
