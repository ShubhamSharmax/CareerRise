import { setAppliedJobs } from '@/redux/jobSlice'
import axios from 'axios'
import React, { useEffect } from 'react'
import { useDispatch } from 'react-redux'

const useGetAppliedJobs = () => {
    const dispatch = useDispatch()

    useEffect(() => {
        const fetchAppliedJobs = async () => {
            try {
                const apiUrl = `${import.meta.env.VITE_API_APPLICATION}/get`
                const res = await axios.get(apiUrl, { withCredentials: true })
                if (res.status === 200) {
                    dispatch(setAppliedJobs(res.data.applications))
                }
            } catch (error) {
                console.log(error);
            }
        }
        fetchAppliedJobs()
    }, [])
}

export default useGetAppliedJobs