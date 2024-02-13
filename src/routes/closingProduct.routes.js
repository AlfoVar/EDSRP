import { Router } from "express";
import {
  getAllClosingProducts,
  getClosingProductById,
  updateClosingProduct,
  createClosingProduct,
  deleteClosingProduct,
} from "../controller/closingProduct.controller.js";

const router = Router();
// Define your routes here
router.get("/", getAllClosingProducts);

router.get("/:id", getClosingProductById);

router.post("/", createClosingProduct);

router.put("/:id", updateClosingProduct);

router.delete("/:id", deleteClosingProduct);

export default router;
