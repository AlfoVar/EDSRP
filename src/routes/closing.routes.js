import express from 'express';
import { createClosing, getAllClosings, getClosingById, updateClosingById, deleteClosingById } from '../controller/closing.controller.js';

const router = express.Router();

// Define your routes here
router.get('/', getAllClosings);

router.get('/:id', getClosingById);

router.post('/', createClosing);

router.put('/:id', updateClosingById);

router.delete('/:id', deleteClosingById);

export default router;
