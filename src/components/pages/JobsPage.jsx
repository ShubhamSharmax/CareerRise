import React, { useEffect, useState } from 'react'
import JobFilterMenu from '../common/JobFilterMenu'
import JobCard from '../common/JobCard'
import { useSelector } from 'react-redux'
import { motion } from 'framer-motion'

const JobsPage = () => {
  useEffect(() => {
    document.title = 'CareerRise - Jobs'
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className='flex max-w-[95%] mx-auto my-10 justify-evenly max-sm:flex-col'
    >
      <motion.div
        initial={{ x: -100, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ duration: 0.8, delay: 0.3 }}
        className='justify-start w-1/6'
      >
        <JobFilterMenu />
      </motion.div>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8, delay: 0.8 }}
        className='flex-1'
      >
        <Jobs />
      </motion.div>
    </motion.div>
  )
}

export default JobsPage


const Jobs = () => {
  const { jobs, searchQuery } = useSelector(store => store.job)
  const [filteredJobs, setFilteredJobs] = useState(jobs)

  useEffect(() => {
    if (searchQuery) {
      const filterJobs = jobs.filter((job) => {
        return job.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
          job.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
          job.location.toLowerCase().includes(searchQuery.toLowerCase())
      })

      setFilteredJobs(filterJobs)
    } else {
      setFilteredJobs(jobs)
    }
  }, [jobs, searchQuery]);

  return (
    <div className='my-10 max-sm:my-2'>
      {filteredJobs.length === 0 && <h2 className='p-5 text-lg '>No Jobs Found for "<span className='font-medium'>{searchQuery}</span>"</h2>}
      <div className='grid grid-cols-3 gap-8 p-5 max-md:grid-cols-2 max-sm:grid-cols-1'>
        {filteredJobs.map((job, index) => (
          <motion.div
            initial={{ y: 30, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.5, delay: 1 + (index * 0.1) }}
            key={index}
          >
            <JobCard job={job} />
          </motion.div>
        ))}
      </div>
    </div>
  )
}

