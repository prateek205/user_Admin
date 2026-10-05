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
