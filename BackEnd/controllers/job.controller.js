import { Job } from "../models/job.model.js";

//Post New Job
export const postJob = async (req,res) =>{
    try {
        const { title, description, requirements, salary, location, jobType, experience, position, companyId} = req.body;
        const userId = req.id;

        if(!title || !description || !requirements || !salary || !location || !jobType || !experience || !position || !companyId){
            return res.status(400).json({ message: "All fields are required"})
        }
        
        const job = await Job.create({
            title,
            description,
            requirements: requirements.split(","),
            salary: Number(salary),
            location,
            jobType,
            experienceLevel: experience,
            position,
            company:companyId,
            created_by:userId
        });
        return res.status(201).json({message: "Job posted successfully", job});  
    } catch (error) {
        console.error(error);
    }
}

//Get all Jobs
export const getJobs = async (req, res) => {
    try {
        const keyword = req.query.keyword || "";
        const query = {
            $or: [
                {title: {$regex: keyword, $options: 'i'}},
                {description: {$regex: keyword, $options: 'i'}},
            ]
        };

        const jobs = await Job.find(query).populate({path:"company"}).sort({createdAt: -1});
        if(!jobs){
            return res.status(404).json({message: "Jobs not found"})
        }
        return res.status(200).json({message: "Jobs fetched successfully.", jobs})
    } catch (error) {
        console.error(error);
    }
}

//Get Job by Id
export const getJobById = async (req,res) => {
    try {
        const jobId = req.params.id;
        const job = await Job.findById(jobId).populate({path:"applications"}).populate({path:"company"});
        if(!job){
            return res.status(404).json({message: "Job not found"})
        }
        return res.status(200).json({message: "Job fetched successfully.", job})
    } catch (error) {
        console.error(error);
    }
}

// jobs list created by admin
export const getJobsByAdmin = async (req, res) => {
    try {
        const adminId = req.id
        const jobs = await Job.find({ created_by: adminId }).populate({path:"company"}).sort({createdAt: -1});
        if(!jobs){
            return res.status(404).json({message: "Jobs not found"})
        }
        return res.status(200).json({message: "Jobs fetched successfully.", jobs})
    } catch (error) {
        console.error(error);
    }
}