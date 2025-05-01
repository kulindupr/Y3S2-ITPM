import express from 'express';
import { getJobById, getJobs } from '../controllers/jobController.js';

const router = express.Router();

// route to get all jobs data
router.get('/', getJobs)


// route singale job data by id
router.get('/:id', getJobById)



export default router;