import express from 'express';
import { createClosing, getAllClosings, getClosingsByDate, getClosingById, updateClosingById, deleteClosingById } from '../controller/closing.controller.js';
import { authValidationToken } from "../middlewares/validateToken.js";

const router = express.Router();

// Define your routes here
router.get('/', authValidationToken, getAllClosings);

router.get('/date/:date', authValidationToken, getClosingsByDate);

router.get('/:id', authValidationToken, getClosingById);

router.post('/', authValidationToken, createClosing);

router.put('/:id', authValidationToken, updateClosingById);

router.delete('/:id', authValidationToken, deleteClosingById);

export default router;
