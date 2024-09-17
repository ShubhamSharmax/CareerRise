import { Company } from "../models/company.model.js";

//register new company
export const registerCompany = async (req,res) => {
    try {
        const {companyName} = req.body;
        if(!companyName){
            return res.status(400).json({message: "Company name is required"})
        }
        
        let company = await Company.findOne({name:companyName});
        if(company){
            return res.status(400).json({message: "Company already exists"})
        }
        company = await Company.create({
            name: companyName,
            userId: req.id
        })

        return res.status(200).json({message: "Company created successfully.",company})
    } catch (error) {
        console.log (error);
    }
}

//get companies by userId
export const getCompany = async (req, res) => {
    try {
        const userId = req.id;
        const companies = await Company.find({ userId });
        if(!companies){
            return res.status(404).json({message: "Companies not found"})
        }
        return res.status(200).json({message: "Companies fetched successfully.",companies})
    } catch (error) {
        console.log (error);
    }
}

//get Company by Id
export const getCompanyById = async (req,res) => {
    try {
        const companyId = req.params.id;
        const company = await Company.findById(companyId);
        if(!company){
            return res.status(404).json({message: "Company not found"})
        }
        return res.status(200).json(company)
    } catch (error) {
        console.log (error);
    }
}

//update company by Id
export const updateCompany = async (req,res) => {
    try {
        const { name, description, website, location} = req.body;

        const updateData = { name, description, website, location };

        const company = await Company.findByIdAndUpdate( req.params.id, updateData, {new : true});
        if(!company){
            return res.status(404).json({message: "Company not found"})
        }
        return res.status(200).json({message:"Company updated successfully."})
    } catch (error) {
        console.log (error);
    }
}
