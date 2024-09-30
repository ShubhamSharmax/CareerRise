import React, { useEffect } from 'react'
import JobCard from '../common/JobCard'
import { useDispatch, useSelector } from 'react-redux'
import { setFilterJobs, setSearchQuery } from '@/redux/jobSlice'
import axios from 'axios'

const BrowsePage = () => {
    const { filterJobs } = useSelector(store => store.job)
    const { searchQuery } = useSelector(store => store.job)
    const dispatch = useDispatch()

    useEffect(() => {
        const fetchJobs = async () => {
            try {
                const apiUrl = `${import.meta.env.VITE_API_JOB}/get?keyword=${searchQuery}`
                const res = await axios.get(apiUrl, { withCredentials: true });
                if (res.status === 200) {
                    dispatch(setFilterJobs(res.data.jobs))
                    dispatch(setSearchQuery(null))
                }
            } catch (error) {
                console.log(error);
            }
        }
        fetchJobs();
    }, [])

    return (
        <div className='max-w-[95rem] mx-auto my-10'>
            <h1 className='text-xl font-bold'>Showing Search Results({filterJobs?.length})</h1>
            <div className='grid grid-cols-3 gap-8 p-5'>
                {filterJobs.length > 0 && filterJobs.map((job, index) => (
                    <div key={index} >
                        <JobCard job={job} />
                    </div>
                ))}
            </div>
        </div>
    )
}

export default BrowsePage