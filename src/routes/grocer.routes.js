import { Router } from "express";
import {
  getAllGrocers,
  getGrocerById,
  createGrocer,
  updateGrocerById,
  deleteGrocerById,
} from "../controller/grocer.controller.js";

const router = Router();
// Define your routes here
router.get("/", getAllGrocers);
router.get("/:id", getGrocerById);
router.post("/", createGrocer);
router.put("/:id", updateGrocerById);
router.delete("/:id", deleteGrocerById);

export default router;
