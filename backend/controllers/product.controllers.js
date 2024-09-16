import Product from "../models/product.model.js";
import { isValidObjectId } from "mongoose";

export const createProductController = async (req, res) => {
  const { name, image, price } = req.body;
  try {
    if (!name || !image || !price) {
      //   throw new Error("All fields must be provided");
      return res.status(404).json({
        success: false,
        error: {
          message: "All fields must be provided",
        },
      });
    }

    const newProduct = new Product({ name, image, price });
    const savedProduct = await newProduct.save();
    if (savedProduct) {
      return res.status(200).json({
        success: true,
        message: "Product created successfully",
        product: savedProduct,
      });
    }
  } catch (error) {
    console.log("error in creating product: ", error.message);
    res.status(500).json({ success: false, message: "Server Error" });
  }
};

export const getProductController = async (req, res) => {
  const { id } = req.params;
  try {
    if (!isValidObjectId(id)) {
      //   throw new Error("Invalid product id provided");
      return res.status(404).json({
        success: false,
        error: {
          message: "Invalid product id provided",
        },
      });
    }

    const product = await Product.findById(id);
    if (!product) {
      //   throw new Error("Product not found");
      return res.status(404).json({
        success: false,
        error: {
          message: "Product not found",
        },
      });
    }

    return res.status(200).json({
      success: true,
      message: `${product.name} found successfully`,
      product,
    });
  } catch (error) {
    console.log("error in getting product: ", error.message);
    res.status(500).json({ success: false, message: "Server Error" });
  }
};
export const getProductsController = async (req, res) => {
  try {
    const products = await Product.find({});
    return res.status(200).json({
      success: true,
      products,
    });
  } catch (error) {
    console.log("error in fetching products:", error.message);
    res.status(500).json({ success: false, message: "Server Error" });
  }
};
export const updateProductController = async (req, res) => {
  const { id } = req.params;
  const { name, image, price } = req.body;
  try {
    if (!isValidObjectId(id)) {
      //   throw new Error("Invalid product id provided");
      return res.status(404).json({
        success: false,
        error: {
          message: "Invalid product id provided",
        },
      });
    }
    const product = await Product.findByIdAndUpdate(
      id,
      { name, image, price },
      { new: true }
    );

    return res.status(200).json({
      success: true,
      message: `Product ${product.name} updated successfully`,
      product,
    });
  } catch (error) {
    console.log("error in updating product:", error.message);
    res.status(500).json({ success: false, message: "Server Error" });
  }
};
export const deleteProductController = async (req, res) => {
  const { id } = req.params;
  try {
    if (!isValidObjectId(id)) {
      //   throw new Error("Invalid product id provided");
      return res.status(404).json({
        success: false,
        error: {
          message: "Invalid product id provided",
        },
      });
    }
    const deletedProduct = await Product.findByIdAndDelete(id);
    if (deletedProduct) {
      return res.status(200).json({
        success: true,
        message: `Product ${deletedProduct.name} deleted successfully`,
        product: deletedProduct,
      });
    }
  } catch (error) {
    console.log("error in deleting product: ", error.message);
    res.status(500).json({ success: false, message: "Server Error" });
  }
};
