import Product from "../models/ProductModel.js";

export const createProduct = async (req, res) => {
  try {
    const { productName, productQuantity, productPrice, productDiscount } =
      req.body;

    if (!productName || !productQuantity || !productPrice || !productDiscount) {
      return res
        .status(400)
        .json({ success: false, message: "All feilds are required..." });
    }

    const existProduct = await Product.findOne({ productName });

    if (!existProduct) {
      return res
        .status(409)
        .json({ success: false, message: "Product already exists." });
    }

    const newProduct = Product.create({
      product: productName,
      quantity: productQuantity,
      price: productPrice,
      discount: productDiscount,
    });

    await newProduct.save();

    res.status(201).json({
      success: true,
      message: "Product Created Successfully!!!",
      products: newProduct,
    });
  } catch (error) {
    console.log("CREATE_PRODUCT_ERROR:", error);
    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
};
