import React, { useEffect } from 'react'
import axios from 'axios'
import { useDispatch, useSelector } from 'react-redux'
import { setCompanies, setCompanyUpdating } from '@/redux/companySlice'

const useGetCompanies = () => {
    const dispatch = useDispatch()
    const { companyUpdating } = useSelector(store => store.company)

    // Fetch all companies 
    useEffect(() => {
        const fetchCompanies = async () => {
            try {
                const apiUrl = `${import.meta.env.VITE_API_COMPANY}/get`
                const res = await axios.get(apiUrl, { withCredentials: true });
                if (res.status === 200) {
                    dispatch(setCompanies(res.data.companies))
                }
            } catch (error) {
                console.log(error);

            }
        }
        fetchCompanies()
    }, [companyUpdating])
}

export default useGetCompanies