import express from "express";
import {
  createProduct,
  deleteProductById,
  getAllProducts,
  getProductById,
  updateProductById,
} from "../controller/ProductController.js";

const router = express.Router();

router.post("/createProduct", createProduct);
router.get("/getAllProducts", getAllProducts);
router.get("/getProductById/:id", getProductById);
router.put("/updateProduct/:id", updateProductById);
router.delete("/deleteProduct/:id", deleteProductById);

export default router;
