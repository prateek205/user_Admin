import mongoose from "mongoose";

const productModel = new mongoose.Schema(
  {
    productName: {
      type: String,
      required: true,
    },
    productQuantity: {
      type: Number,
      min: 0,
      required: true,
    },
    productPrice: {
      type: String,
      required: true,
      min: 0,
    },
    productDiscount: {
      type: Number,
      required: true,
      default: 0,
      min: 0,
      max: 100,
    },
  },
  {
    timestamps: true,
  },
);

const Product = mongoose.model("Product", productModel);

export default Product;
