import React from 'react'
import JobCard from './JobCard';
import { Button } from '../ui/button';
import { useNavigate } from 'react-router-dom';

const RecentJobsList = () => {
    const jobsList = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
    const navigate = useNavigate()

    const handleViewDetails = (job) => {
        navigate(`/job/${job}`);
    }

    const handleExplore = () => {
        navigate('/jobs');
    }
    return (
        <div className='max-w-[90%] mx-auto my-10'>
        <h1 className='text-4xl font-bold my-5'><span className='text-cyan-500'>Recent</span> Job Opennings</h1>
        <div className='grid grid-cols-3 gap-8 p-5'>
            {jobsList.slice(0,5).map((job, index) => (
                <div key={index} onClick={()=>handleViewDetails(job)} className='transition-all duration-200 ease-in-out hover:scale-105 cursor-pointer'>
                    <JobCard />
                </div>
            ))}
            <div onClick={handleExplore} className=''>
                <div className='border h-full flex justify-center items-center rounded-md '>
                    <Button variant='outline' className='font-medium bg-slate-100 transition-all duration-200 ease-in-out hover:scale-105 rounded-full shadow-sm'>Explore More Jobs...</Button>
                </div>
            </div>
        </div>
            </div>
    )
}

export default RecentJobsList

