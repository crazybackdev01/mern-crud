import express from "express";

import {
  createProductController,
  deleteProductController,
  getProductsController,
  updateProductController,
  getProductController,
} from "../controllers/product.controllers.js";

const router = express.Router();

router.get("/", getProductsController);
router.post("/create-product", createProductController);
router.get("/:id", getProductController);
router.put("/:id", updateProductController);
router.delete("/:id", deleteProductController);

export default router;
