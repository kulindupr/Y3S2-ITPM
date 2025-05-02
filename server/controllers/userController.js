import Job from "../models/job.js";
import JobApplication from "../models/jobApplication.js";
import User from "../models/User.js";
import{v2 as cloudinary} from 'cloudinary'
///get users data
export const getUsersData = async (req, res) => {
  const userId = req.auth.userId;
  try {
    const user = await User.findById(userId);

    if (!user) {
      return res.json({
        success: false,
        message: "User not found",
      });
    }
    res.json({ success: true, user });
  } catch (error) {
    res.json({ success: false, messagem: error.message });
  }
};

//apply for a job
export const applyForJob = async (req, res) => {
  const { jobId } = req.body;
  const userId = req.auth.userId;

  try {
    const isAlradyApplied = await JobApplication.findOne({ jobId, userId });

    if (isAlradyApplied.length > 0) {
      return res.json({
        success: false,
        message: "Already applied for this job",
      });
    }
    const jobsData = await Job.findById(jobId);

    if (!jobsData) {
      return res.json({ success: false, message: "Job not found" });
    }
    await JobApplication.create({
        
        
     companyId: jobsData.companyId,
      userId,
      
      jobId,
      //status: "Pending",
      date: Date.now(),
    });
    res.json({
      success: true,
      message: "Applied for job successfully",
    });
  } catch (error) {
    res.json({
      success: false,
      message: error.message,
    });
  }
};
//get user applied applications
export const getUserJobApplications = async (req, res) => {

    try{
        const userId = req.auth.userId;
        const applications = await JobApplication.find({userId})
        .populate('companyId', 'name email image')
        .populate('jobId', 'title description location category level salary')
        .exec()

        if(!applications){
            return res.json({
                success: false,
                message: "No applications found"
            })
        }

        return res.json({
            success: true,
            applications
        })
    }catch(error){
    }
    res.json({
        success: false,
        message: error.message
    })
};

//update user profile resume
export const updateUserResume = async (req, res) => {

    try{
        const userId = req.auth.userId;
        const resumeFile = req.resumeFile;
        const userData= await User.findById(userId);

        if(resumeFile){
            const resumeUploaded = await cloudinary.uploader.upload(resumeFile.path);
            userData.resume = resumeUploaded.secure_url;

        }
        await userData.save();
        return res.json({
            success: true,
            message: "Resume updated successfully",
            
        })
    }catch(error){
    res.json({
        success: false,
        message: error.message
    })}
    
};
