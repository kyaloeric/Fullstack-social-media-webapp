import jwt from "jsonwebtoken";

import dotenv from "dotenv";

dotenv.config();

const SECRET_KEY = process.env.SECRET as string;

export const generateToken = (
  email: string,
  user_id: string,
  user_name: string,
  fullName: string,
  isAdmin: boolean
): string => {
  return jwt.sign(
    {
      user_name,
      email,
      user_id,
      isAdmin,
      fullName,
    },
    SECRET_KEY,
    { expiresIn: "24h" }
  );
};
