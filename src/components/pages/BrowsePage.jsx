import React from 'react'
import JobCard from '../common/JobCard'

const BrowsePage = () => {
    const jobs = [1, 2, 3, 4, 5]
    return (
        <div className='max-w-[95rem] mx-auto my-10'>
            <h1 className='text-xl font-bold'>Showing Search Results ({jobs.length})</h1>
            <div className='grid grid-cols-3 gap-8 p-5'>
                {jobs.map((job, index) => (
                    <div key={index} className=''>
                        <JobCard />
                    </div>
                ))}
            </div>
        </div>
    )
}

export default BrowsePage