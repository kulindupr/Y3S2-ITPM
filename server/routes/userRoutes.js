import express from 'express';
import { applyForJob, getUserJobApplications, getUsersData, updateUserResume } from '../controllers/userController.js';
import upload from '../config/multer.js';
const router = express.Router();

//get user data
router.get('/user',getUsersData);

//apply for a job
router.post('/apply',applyForJob);

//get applied jobs data
router.get('/applications',getUserJobApplications);

//update user resume
router.post('/update-resume', upload.single('resume'), updateUserResume);

export default router;

