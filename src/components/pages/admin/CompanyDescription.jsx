import UpdateCompany from '@/components/common/UpdateCompany'
import { Button } from '@/components/ui/button'
import { setCompany } from '@/redux/companySlice'
import { Avatar, AvatarImage } from '@radix-ui/react-avatar'
import axios from 'axios'
import { ArrowLeft, PenBox } from 'lucide-react'
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate, useParams } from 'react-router-dom'

const CompanyDescription = () => {
    const { company } = useSelector(store => store.company)
    const params = useParams()
    const companyId = params.id
    const dispatch = useDispatch()
    const navigate = useNavigate()

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
    }, [company, params,open]);

    return (
        <div className='max-w-7xl mx-auto my-10 border rounded-xl p-5'>
            <Button variant='outline' onClick={()=> navigate('/admin')}><ArrowLeft/> Back</Button>
            <div className="flex item-center justify-between">
                <div className='flex gap-5 items-center m-5 '>
                    <Avatar className='w-32'>
                        <AvatarImage src={company?.logo} />
                    </Avatar>
                    <div>
                        <h1 className='font-bold text-2xl'>{company?.name}</h1>
                    </div>
                </div>
                <Button variant='outline' onClick={() => navigate(`/admin/companies/${companyId}/update`)} className='rounded-full h-12 w-12 p-0'><PenBox /></Button>
            </div>
            <div className='grid grid-cols-2 gap-y-2 p-5 text-lg'>
                <h2 className='font-medium text-lg'>Company Website :</h2>
                <a target='blank' href={company?.website}><Button variant='link' className='p-0 text-blue-500'>Website</Button></a>
                <h2 className='font-medium text-lg'>Description :</h2>
                <p>{company?.description}</p>
                <h2 className='font-medium text-lg'>Location :</h2>
                <p>{company?.location}</p>
            </div>
        </div>
    )
}

export default CompanyDescription