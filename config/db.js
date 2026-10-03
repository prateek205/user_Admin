import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();
const MONGODB_URL = process.env.MONGODB_URI;

export const connectDb =
  (MONGODB_URL,
  () => {
    try {
      console.log("Mongodb is connected successfully!!! 🚀");
    } catch (error) {
      console.log("Mongodb connection is failed... ❌");
    }
  });
