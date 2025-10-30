import type { NextFunction, Request, Response } from "express";

export const verifiedOnly = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  if (!req.user.isVerified) {
    return res.status(403).json({
      message: "Email not verified. Please verify your email to continue.",
    });
  }

  next();
};
