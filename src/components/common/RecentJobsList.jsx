import React from 'react'
import JobCard from './JobCard';
import { Button } from '../ui/button';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { motion } from 'framer-motion'

const RecentJobsList = () => {
    const { jobs } = useSelector(store => store.job);
    const navigate = useNavigate()

    const handleExplore = () => {
        navigate('/jobs');
    }
    return (
        <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.5, delay: 1.5 }}
            className='max-w-[90%] mx-auto my-10'
        >
            <motion.h1
                initial={{ x: -50, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ duration: 0.5, delay: 1.8 }}
                className='text-4xl font-bold my-5 max-sm:text-2xl'
            >
                <span className='text-cyan-500'>Recent</span> Job Opennings
            </motion.h1>
            <div className='grid grid-cols-3 gap-8 p-5 max-md:grid-cols-2 max-sm:grid-cols-1 max-md:p-4 max-sm:p-2'>
                {jobs.slice(0, 5).map((job, index) => (
                    <motion.div
                        initial={{ y: 30, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        transition={{ duration: 0.5 }}
                        whileHover={{ scale: 1.1 }}
                        key={index}
                    >
                        <JobCard job={job} />
                    </motion.div>
                ))}
                <div onClick={handleExplore} className=''>
                    <div className='h-full flex justify-center items-center rounded-md '>
                        <motion.div
                            initial={{ y: 30, opacity: 0 }}
                            animate={{ y: 0, opacity: 1 }}
                            transition={{ duration: 0.3 }}
                            whileHover={{ scale: 1.1 }}
                        >
                            <Button

                                variant='outline'
                                className='font-medium text-xl p-6 px-4 bg-slate-100 rounded-full shadow-sm'
                            >
                                Explore More Jobs...
                            </Button>
                        </motion.div>
                    </div>
                </div>
            </div>
        </motion.div>
    )
}

export default RecentJobsList

