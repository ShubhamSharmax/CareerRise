import React, { useEffect, useState } from 'react'
import JobFilterMenu from '../common/JobFilterMenu'
import JobCard from '../common/JobCard'
import { useSelector } from 'react-redux'

const JobsPage = () => {
  useEffect(() => {
    document.title = 'CareerRise - Jobs'
  }, []);

  return (
    <div className='flex max-w-[95%] mx-auto my-10 justify-evenly max-sm:flex-col'>
      <div className='justify-start w-1/6'>
        <JobFilterMenu />
      </div>
      <div className='flex-1'>
        <Jobs />
      </div>
    </div>
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
          <div key={index}>
            <JobCard job={job} />
          </div>
        ))}
      </div>
    </div>
  )
}

