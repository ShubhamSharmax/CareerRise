import React from 'react'
import JobFilterMenu from '../common/JobFilterMenu'
import JobCard from '../common/JobCard'

const JobsPage = () => {
  return (
    <div className='flex max-w-[95%] mx-auto justify-evenly'>
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


export const Jobs = () => {
  const jobs = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15]
  return (
    <div className='grid grid-cols-3 gap-8 p-5'>
      {jobs.map((job, index) => (
        <div key={index} className=''>
          <JobCard />
        </div>
      ))}
    </div>
  )
}

