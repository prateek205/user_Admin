import Products from "../models/ProductModel.js";

export const createProduct = async (req, res) => {
  try {
    const { productName, productQuantity, productPrice, productDiscount } =
      req.body;

    // in this the condition is false as if we left the any empty feild.
    if (!productName || !productQuantity || !productPrice || !productDiscount) {
      return res
        .status(400)
        .json({ success: false, message: "All feilds are required..." });
    }

    // in this we check the condition of existProduct on its productName key pair.
    const existProduct = await Products.findOne({ productName });

    // in this condition the exist product condition is true thus because of product document is blank.
    if (existProduct) {
      return res
        .status(409)
        .json({ success: false, message: "Product already exists." });
    }

    // in this with store the data in variable of productData.
    const productData = {
      productName,
      productQuantity,
      productPrice,
      productDiscount,
    };

    // in this condition the product is saved without using the product.save()
    const newProduct = await Products.create(productData);

    // after saving the data it give the response with status code and show the product.
    res.status(201).json({
      success: true,
      message: "Product Created Successfully!!!",
      products: newProduct,
    });
  } catch (error) {
    console.log("CREATE_PRODUCT_ERROR:", error);

    // if any thing line of code break then it give the error
    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
};

export const getAllProducts = async (req, res) => {
  try {
    // in this when we get the product list it will show the new product on top.
    const products = await Products.find({}).sort({ createdAt: -1 });

    // it will show the product is in the list or not.
    if (!products) {
      return res
        .status(404)
        .json({ success: false, message: "Product not found" });
    }

    // after all condition check the product will show with the res.status(200).
    res.status(200).json({
      success: true,
      message: "Product fetch successfully!!!",
      count: products.length,
      products: products,
    });
  } catch (error) {
    console.log("GET_ALL_PRODUCT_ERROR:", error);

    // it will show the error if product didn't get fetch successfully.
    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
};

export const getProductById = async (req, res) => {
  try {
    // in this find the product by id using the params.
    const { id } = req.params;

    // this show the existProduct is findById.
    const existProduct = await Products.findById(id);

    // check the condition if the product is not exist in list.
    if (!existProduct) {
      return res
        .status(404)
        .json({ success: false, message: "Product not found" });
    }

    // checking the all conditions give the response to UI side.
    res.status(200).json({
      success: true,
      message: "Product fetch by id successfully!!!",
      products: existProduct,
    });
  } catch (error) {
    console.log("UPDATE_PRODUCT_ERROR:", error);

    // give the error if the product not fetch by id.
    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
};

export const updateProductById = async (req, res) => {
  try {
    const { id } = req.params;

    const existProduct = await Products.findByIdAndUpdate(id, req.body, {
      new: true,
    });

    if (!existProduct) {
      return res
        .status(404)
        .json({ success: false, message: "Product not found" });
    }

    res.status(201).json({
      success: true,
      message: "Product update successfully!!!",
      products: existProduct,
    });
  } catch (error) {
    console.log("UPDATE_PRODUCT_ERROR:", error);

    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
};

export const deleteProductById = async (req, res) => {
  try {
    const { id } = req.params;

    const existProduct = await Products.findByIdAndDelete(id);

    if (!existProduct) {
      return res
        .status(404)
        .json({ success: false, message: "Product not found" });
    }

    res.status(200).json({
      success: true,
      message: "Product deleted successfully...",
      products: existProduct,
    });
  } catch (error) {
    console.log("DELETE_PRODUCT_ERROR:", error);

    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
};