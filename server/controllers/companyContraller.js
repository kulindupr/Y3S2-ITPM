import Company from "../models/Company.js";
import bcrypt from "bcrypt";
import generateToken from "../utils/generateToken.js";
import {v2 as cloudinary} from 'cloudinary';


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
export const loginCompany = async () => {
}

//get company data
export const getCompanyData = async (req, res) => {

}

//post job
export const postJob = async (req, res) => {

}

//get compant job Applications
export const getCompanyJobApplications = async (req, res) => {

}

//get comapny posted jobs
export const getCompanyPostedJobs = async (req, res) => {

}

//change job Application status
export const ChangeJobApplicationStatus = async (req, res) => {

}

//change job visibility
export const changeVisibility = async (req, res) => {

}
