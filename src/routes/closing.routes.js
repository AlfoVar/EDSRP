import express from 'express';
import { createClosing, getAllClosings, getClosingsByDate, getClosingById, updateClosingById, deleteClosingById } from '../controller/closing.controller.js';

const router = express.Router();

// Define your routes here
router.get('/', getAllClosings);

router.get('/date/:date', getClosingsByDate);

router.get('/:id', getClosingById);

router.post('/', createClosing);

router.put('/:id', updateClosingById);

router.delete('/:id', deleteClosingById);

export default router;
