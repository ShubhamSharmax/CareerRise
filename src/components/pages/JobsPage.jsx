import React from 'react'
import JobFilterMenu from '../common/JobFilterMenu'
import JobCard from '../common/JobCard'
import { useSelector } from 'react-redux'

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
  const{jobs} = useSelector(store => store.job)
  return (
    <div className='grid grid-cols-3 gap-8 p-5'>
      {jobs.map((job, index) => (
        <div key={index} className=''>
          <JobCard job={job} />
        </div>
      ))}
    </div>
  )
}

