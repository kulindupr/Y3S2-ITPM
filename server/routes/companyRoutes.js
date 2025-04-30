import express from "express";
import {changeVisibility, getCompanyData, getCompanyJobApplications, getCompanyPostedJobs, loginCompany,postJob,registerCompany} from "../controllers/companyContraller.js";
import upload from "../config/multer.js";

const router = express.Router();

//Register company
router.post('/register',upload.single('image'), registerCompany);

//comapny login
router.post('/login', loginCompany);

//company data
router.get('/company', getCompanyData);

//post a job 
router.post('/post-job', postJob);

//get application data 
router.get('/applicationts', getCompanyJobApplications);

//get company job list 
router.get('/job-list', getCompanyPostedJobs);

//change job application status
router.post('/change-visibility', changeVisibility);


export default router;

