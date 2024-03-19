import { Router } from "express";
import {
  createClosingGas,
  getAllClosingGas,
  getClosingGasById,
  updateClosingGasById,
  deleteClosingGasById,
} from "../controller/closingGas.controller.js";
import { authValidationToken } from "../middlewares/validateToken.js";

const router = Router();
// Define your routes here
router.get("/", authValidationToken, getAllClosingGas);

router.get("/:id" , authValidationToken, getClosingGasById);

router.post("/", authValidationToken, createClosingGas);

router.put("/:id", authValidationToken, updateClosingGasById);

router.delete("/:id", authValidationToken, deleteClosingGasById);

export default router;
