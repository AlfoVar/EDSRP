import { Router } from "express";
import {
  getAllClosingProducts,
  getClosingProductById,
  updateClosingProduct,
  createClosingProduct,
  deleteClosingProduct,
} from "../controller/closingProduct.controller.js";
import { authValidationToken } from "../middlewares/validateToken.js";

const router = Router();
// Define your routes here
router.get("/", authValidationToken, getAllClosingProducts);

router.get("/:id", authValidationToken, getClosingProductById);

router.post("/", authValidationToken, createClosingProduct);

router.put("/:id", authValidationToken, updateClosingProduct);

router.delete("/:id", authValidationToken, deleteClosingProduct);

export default router;
