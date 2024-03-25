import { Request, Response, NextFunction } from "express";
import { admin } from "../libs/firebase-admin";

const validateToken = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const authHeader = req.headers.authorization;

  if (authHeader && authHeader.startsWith("Bearer ")) {
    const idToken = authHeader.split("Bearer ")[1];

    try {
      const decodedToken = await admin.auth().verifyIdToken(idToken);
      req.user = decodedToken;
      next();
    } catch (error) {
      console.error("Error validating Firebase ID token:", error);
      res.status(401).json({
        data: null,
        error: {
          code: "UNAUTHORIZED",
          message: "Unauthorized",
        },
      });
    }
  } else {
    res.status(401).json({
      data: null,
      error: {
        code: "UNAUTHORIZED",
        message: "Unauthorized",
      },
    });
  }
};

export default validateToken;


