import { setAdminJobs } from '@/redux/jobSlice'
import axios from 'axios'
import React, { useEffect } from 'react'
import { useDispatch } from 'react-redux'

const useGetAdminJobs = () => {
    const dispatch = useDispatch()

    useEffect(() => {
        const fetchAdminJobs = async () => {
            try {
                const apiUrl = `${import.meta.env.VITE_API_JOB}/getadmin`
                const res = await axios.get(apiUrl, { withCredentials: true })
                if (res.status === 200) {
                    dispatch(setAdminJobs(res.data.jobs))
                }
            } catch (error) {
                console.log(error)
            }
        }
        fetchAdminJobs()
    }, [])
}

export default useGetAdminJobs