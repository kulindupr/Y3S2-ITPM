import express from 'express';
import { createCV, getCV, updateCV, deleteCV } from '../controllers/cvController.js';

const router = express.Router();

// CV routes without authentication
router.post('/', createCV);
router.get('/:id', getCV);
router.put('/:id', updateCV);
router.delete('/:id', deleteCV);

export default router; 