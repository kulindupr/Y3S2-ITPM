import express from "express";
import {ChangeJobApplicationStatus, changeVisibility, getCompanyData, getCompanyJobApplications, getCompanyPostedJobs, loginCompany,postJob,registerCompany} from "../controllers/companyContraller.js";
import upload from "../config/multer.js";
import { protectCompany } from "../middleware/authMiddleware.js";

const router = express.Router();

//Register company
router.post('/register',upload.single('image'), registerCompany);

//comapny login
router.post('/login', loginCompany);

//company data
router.get('/company',protectCompany, getCompanyData);

//post a job 
router.post('/post-job',protectCompany, postJob);

//get application data 
router.get('/applicationts', protectCompany,getCompanyJobApplications);

//get company job list 
router.get('/job-list', protectCompany,getCompanyPostedJobs);

//change job application status
router.post('/change-status',protectCompany, ChangeJobApplicationStatus);

//change job application Visibility
router.post('/change-visibility',protectCompany, changeVisibility);


export default router;

