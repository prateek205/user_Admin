import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import { connectDb } from "./config/db.js";

dotenv.config();
connectDb();
const PORT = process.env.PORT_SERVER;

const app = express();
app.use(express.json());
app.use(
  cors({
    origin: "http://localhost:5173",
  }),
);

app.get("/", (req, res) => {
  res.send("the app is running...");
});

app.listen(PORT, () => {
  console.log(`the server is running on port http://localhost:${PORT}`);
});
