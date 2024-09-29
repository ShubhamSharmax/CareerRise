import { setCompany } from '@/redux/companySlice';
import axios from 'axios';
import React, { useEffect } from 'react'
import { useDispatch } from 'react-redux'

const useGetCompany = (companyId) => {
    const dispatch = useDispatch()

    // Fetch company data for companyId
    useEffect(() => {
        const fetchCompany = async () => {
            try {
                const apiUrl = `${import.meta.env.VITE_API_COMPANY}/get/${companyId}`
                const res = await axios.get(apiUrl, { withCredentials: true });
                if (res.status === 200) {
                    dispatch(setCompany(res.data.company))
                }
            } catch (error) {
                console.log(error);
            }
        }
        fetchCompany()
    }, [companyId]);
}

export default useGetCompany