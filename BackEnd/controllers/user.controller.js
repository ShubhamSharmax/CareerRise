import { User } from "../models/user.model.js ";
import bcryptjs from "bcryptjs";
import jwt from "jsonwebtoken";

// Register a new user
export const register = async (req,res) => {
    try {
        const { fullname, email, phoneNumber, password, role} = req.body;
        if(!fullname || !email || !phoneNumber || !password || !role) {
            return res.status(400).json({ message: 'All fields are required' });
        };
        //Check If User is already registered
        const user = await User.findOne({email});
        if(user){
            return res.status(400).json({ message: 'User already exists with This Email' });
        }
        const hashedPassword = await bcryptjs.hash(password, 10);

        await User.create({
            fullname,
            email,
            phoneNumber,
            password: hashedPassword,
            role
        })

        return res.status(200).json({ message: 'User registered successfully'})
    } catch (error) {
        console.log(error)
        res.status(400).json({ message: 'Server Error' });
    }
}

// Login a user
export const login = async (req, res) => {
    try {
        const { email, password, role} = req.body;
        if(!email || !password  || !role) {
            return res.status(400).json({ message: 'All fields are required' });
        }
        let user = await User.findOne({ email });
        if(!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        const isPasswordMatch = await bcryptjs.compare(password, user.password);
        if(!isPasswordMatch) {
            return res.status(400).json({ message: 'Invalid Password' });
        }
        const tokenData ={
            userId: user._id,
        }
        const token = jwt.sign(tokenData, process.env.SECRET_KEY, { expiresIn: '1d'});

        return res.status(200).cookie("token", token, {maxAge: 1*24*60*60*1000, httpsOnly:true, sameSite:'strict'}).json({message: `WelCome Back ${user.fullname}`,user});

        user = {
            _id: user._id,
            fullname: user.fullname,
            email: user.email,
            phoneNumber: user.phoneNumber,
            role: user.role,
            profile:user.profile
        }
        res.json({ message: 'Logged In Successfully' });
    } catch (error) {
        res.status(500).json({ message: error });
    }
}

// Logout a user
export const logout = async (req, res) => {
    try {
        return res.status(200).cookie("token", "", {maxAge: 0}).json({message: 'Logged Out Successfully'})
    } catch (error) {
        console.log(error);
    }
}

// Update user profile
export const updateProfile = async (req, res) =>{
    try {
        const {fullname, email, phoneNumber, bio, skills} = req.body;

        let skillsArray;
        
        if(skills){
            skillsArray = skills.split(",")
        }
        const userId = req.id; //middleware authentication
        let user = await User.findById(userId);
        if(!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        //Updating Data To User Profile
        if(fullname) user.fullname = fullname;
        if(email) user.email = email;
        if(phoneNumber) user.phoneNumber = phoneNumber;
        if(bio) user.profile.bio = bio;
        if(skills) user.profile.skills = skillsArray;

        await user.save();

        user = {
            _id: user._id,
            fullname: user.fullname,
            email: user.email,
            phoneNumber: user.phoneNumber,
            role: user.role,
            profile:user.profile
        }
        return res.status(200).json({ message: 'Profile updated successfully', user });
    } catch (error) {
        
    }
}