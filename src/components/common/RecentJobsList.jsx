import React from 'react'
import JobCard from './JobCard';
import { Button } from '../ui/button';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

const RecentJobsList = () => {
    const {jobs} = useSelector(store=>store.job);
    const navigate = useNavigate()
    
    const handleExplore = () => {
        navigate('/jobs');
    }
    return (
        <div className='max-w-[90%] mx-auto my-10'>
        <h1 className='text-4xl font-bold my-5 max-sm:text-2xl'><span className='text-cyan-500'>Recent</span> Job Opennings</h1>
        <div className='grid grid-cols-3 gap-8 p-5 max-md:grid-cols-2 max-sm:grid-cols-1 max-md:p-4 max-sm:p-2'>
            {jobs.slice(0,5).map((job, index) => (
                <div key={index} className='transition-all duration-200 ease-in-out hover:scale-105 cursor-pointer'>
                    <JobCard job={job} />
                </div>
            ))}
            <div onClick={handleExplore} className=''>
                <div className='h-full flex justify-center items-center rounded-md '>
                    <Button variant='outline' className='font-medium bg-slate-100 transition-all duration-200 ease-in-out hover:scale-105 rounded-full shadow-sm'>Explore More Jobs...</Button>
                </div>
            </div>
        </div>
            </div>
    )
}

export default RecentJobsList

