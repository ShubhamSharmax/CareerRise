import { setJobs } from '@/redux/jobSlice';
import axios from 'axios'
import React, { useEffect } from 'react'
import { useDispatch } from 'react-redux'

const useGetJobs = () => {
    const dispatch = useDispatch();

    useEffect(() => {
        const fetchJobs = async () => {
            try {
                const apiUrl = `${import.meta.env.VITE_API_JOB}/get`                
                const res = await axios.get(apiUrl,{withCredentials: true});                
                if(res.status === 200){
                    dispatch(setJobs(res.data.jobs))
                }
            } catch (error) {
                console.log(error);
            }
        }
        fetchJobs();
    }, [])
}

export default useGetJobs