import { Application } from "../models/application.model.js";
import { Job } from "../models/job.model.js";

//Apply For New Job
export const applyJob = async (req,res) =>{
    try {
        const userId = req.id;
        const jobId = req.params.id;
        if(!jobId){
            return res.status(400).json({message: "Job ID is required"})
        }

        //check if already applied
        const existingApplication = await Application.findOne({job:jobId, candidate:userId});
        if(existingApplication){
            return res.status(400).json({message: "You have already applied for this job"})
        }
        
        //check if job exists
        const job = await Job.findById(jobId);
        if(!job){
            return res.status(404).json({message: "Job not found"})
        }
        
        //create new application
        const application = await Application.create({
            job: jobId,
            candidate: userId,
        });

        job.applications.push(application._id);
        await job.save();
        return res.status(201).json({message: "Application submitted successfully", application})
    } catch (error) {
        console.error(error);
    }
}

//get all applications for a user
export const getApplications = async (req, res) => {
    try {
        const userId = req.id;
        const applications = await Application.find({candidate: userId}).populate({path:'job',populate:{path:'company'}}).sort({createdAt: -1});
        if(!applications){
            return res.status(404).json({message: "No applications found"})
        }
        return res.status(200).json({message: "Applications fetched successfully", applications})
    } catch (error) {
        console.error(error);
    }
}

//get all applications for a job
export const getCandidateApplications = async (req, res) => {
    try {
        const jobId = req.params.id;
        const application = await Application.find({job: jobId}).populate({path:'candidate'}).populate({path:'job'}).sort({createdAt: -1});
        if(!application){
            return res.status(404).json({message: "Applicants not found"})
        }
        return res.status(200).json({message: "Applications fetched successfully", application})
    } catch (error) {
        console.error(error);
    }
}

//update Job Status
export const updateApplicationStatus = async (req, res) => {
    try {
        const applicationId = req.params.id;
        const {status} = req.body;
        if(!status){
            return res.status(400).json({message: "Status is required"})
        }

        //find application by candidate id
        const application = await Application.findById(applicationId);
        if(!application){
            return res.status(404).json({message: "Application not found"})
        }
        
        application.status = status.toLowerCase();
        await application.save();

        return res.status(200).json({message: "Application status updated successfully", application})
    } catch (error) {
        console.error(error);
    }
}

