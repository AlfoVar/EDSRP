import { Router } from "express";
import {
  createClosingGas,
  getAllClosingGas,
  getClosingGasById,
  updateClosingGasById,
  deleteClosingGasById,
} from "../controller/closingGas.controller.js";

const router = Router();
// Define your routes here
router.get("/", getAllClosingGas);

router.get("/:id", getClosingGasById);

router.post("/", createClosingGas);

router.put("/:id", updateClosingGasById);

router.delete("/:id", deleteClosingGasById);

export default router;
