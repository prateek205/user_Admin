import express from "express";
import {
  createProduct,
  getAllProducts,
  getProductById,
} from "../controller/ProductController.js";

const router = express.Router();

router.post("/createProduct", createProduct);
router.get("/getAllProducts", getAllProducts);
router.get("/getProductById/:id", getProductById);

export default router;
