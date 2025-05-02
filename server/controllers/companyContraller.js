
import Company from "../models/Company.js";
import bcrypt from "bcrypt";
import generateToken from "../utils/generateToken.js";
import {v2 as cloudinary} from 'cloudinary';
import Job from "../models/job.js";
import jobApplication from "../models/jobApplication.js";


//register ne company
export const registerCompany = async (req, res) => {

    const {name,email,password} = req.body;

    const imageFile = req.file;

    if(!name || !email || !password || !imageFile){
    return res.json({success:false,message:"Missing Details"})       
     
    }

    try {
        const companyExists = await Company.findOne({email})

        if(companyExists){
            return res.json({success:false,message:"Company already exists"})
        }

        const salt = await bcrypt.genSalt(10);
        const hashPassword = await bcrypt.hash(password,salt);

        const imageUpload = await cloudinary.uploader.upload(imageFile.path) 
         const comapny = await Company.create({
            name,
            email,
            password:hashPassword,
            image:imageUpload.secure_url
            })
    
            res.json({success:true,
                      comapny:{
                        _id:comapny._id,
                        name:comapny.name,
                        email:comapny.email,
                        image:comapny.image
                    },

                    token:generateToken(comapny._id)

            })
    }catch (error) {
        res.json({success:false,message:"Error in company registration"})
    }
}

//company login 
export const loginCompany = async (req,res) => {
    const {email,password} = req.body;

    if (!email || !password) {
        return res.json({success:false, message:"Please provide email and password"});
    }

    try {
        // Find company by email
        const company = await Company.findOne({email});
        
        if (!company) {
            return res.json({success:false, message:"Invalid credentials"});
        }

        // Compare password
        const isMatch = await bcrypt.compare(password, company.password);
        
        if (!isMatch) {
            return res.json({success:false, message:"Invalid credentials"});
        }

        // If password matches, send success response
        res.json({
            success:true,
            company:{
                _id:company._id,
                name:company.name,
                email:company.email,
                image:company.image
            },
            token:generateToken(company._id)
        });

    } catch (error) {
        console.error('Login error:', error);
        res.json({success:false, message:"Error in company login"});
    }
}


//get company data
export const getCompanyData = async (req, res) => {
    const company = req.company;
    try{
        const company = req.company
        res.json({success:true,company})

    }catch (error) {
        res.json({success:false,message:"Error in getting company data"})
    }

}

//post job
export const postJob = async (req, res) => {

    const{title,description,salary,location,level,category} = req.body;

    const companyId = req.company._id;
    try{
        const newJob = await Job({
            title,
            description,
            salary,
            location,
            companyId,
            date:Date.now(),
            level,
            category

        })
        await newJob.save();
        res.json({success:true,newJob})

    }catch (error) {
        res.json({success:false,message:"Error in posting job"})

    }

    
}

//get compant job Applications
export const getCompanyJobApplications = async (req, res) => {

}

//get comapny posted jobs
export const getCompanyPostedJobs = async (req, res) => {
    try{
        const companyId = req.company._id;
        const jobs = await Job.find({companyId})

             //(Todo: applicant info in job data)
      const jobsData = await Promise.all(jobs.map(async (job) => {
            const applicants = await jobApplication.find({jobId:job._id})
            return {...job.toObject(),applicants:applicants.length}
      }))

        res.json({success:true,jobsData})
   
        

    }catch (error) {
        res.json({success:false,message:"Error in getting company jobs"})

    }

}

//change job Application status
export const ChangeJobApplicationStatus = async (req, res) => {

}

//change job visibility
export const changeVisibility = async (req, res) => {
    try{
        const {id} = req.body;

        const companyId = req.company._id;
        const job = await Job.findById(id);

        if(companyId.toString() === job.companyId.toString()){
            job.visible = !job.visible;}

        await job.save();
            res.json({success:true,job})

    }catch (error) {
        res.json({success:false,message:"Error in changing job visibility"})    
    }

}

