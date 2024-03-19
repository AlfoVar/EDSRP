import { Router } from "express";
import {
  getAllGrocers,
  getGrocerById,
  createGrocer,
  updateGrocerById,
  deleteGrocerById,
} from "../controller/grocer.controller.js";
import { authValidationToken } from "../middlewares/validateToken.js";

const router = Router();
// Define your routes here
router.get("/", authValidationToken, getAllGrocers);
router.get("/:id", authValidationToken, getGrocerById);
router.post("/", authValidationToken, createGrocer);
router.put("/:id", authValidationToken, updateGrocerById);
router.delete("/:id", authValidationToken, deleteGrocerById);

export default router;
