import { Button } from '@/components/ui/button'
import useGetCompany from '@/hooks/useGetCompany'
import { Avatar, AvatarImage } from '@radix-ui/react-avatar'
import { ArrowLeft, ImageOff, PenBox } from 'lucide-react'
import React from 'react'
import { useSelector } from 'react-redux'
import { useNavigate, useParams } from 'react-router-dom'

const CompanyDescription = () => {
    const params = useParams()
    const companyId = params.id
    useGetCompany(companyId)

    const { company } = useSelector(store => store.company)
    const navigate = useNavigate()

    return (
        <div className='max-w-7xl mx-auto my-10 border rounded-xl p-5'>
            <div className='flex items-center my-5'>
                <Button variant='outline' onClick={() => navigate('/admin')}><ArrowLeft /> Back</Button>
                <div className='flex-1'>
                    <h2 className='text-2xl font-bold text-center'>Company Details</h2>
                </div>
            </div>
            <div className="flex item-center justify-between">
                <div className='flex gap-5 items-center m-5 '>
                    {company?.logo ? <Avatar className='w-32'>
                        <AvatarImage src={company?.logo} />
                    </Avatar> : <div className='rounded-md w-32 h-32 border'> <ImageOff className='w-32 h-32' /></div>}
                    <div>
                        <h1 className='font-bold text-2xl'>{company?.name}</h1>
                    </div>
                </div>
                <Button variant='outline' onClick={() => navigate(`/admin/companies/${companyId}/update`)} className='rounded-full h-12 w-12 p-0'><PenBox /></Button>
            </div>
            <div className='grid grid-cols-2 gap-y-2 p-5 text-lg'>
                <h2 className='font-medium text-lg'>Company Website :</h2>
                {company?.website ? <a target='blank' href={company?.website}><Button variant='link' className='p-0 text-blue-500'>Website</Button></a>
                    : <p className='text-muted-foreground'>no website available</p>}
                <h2 className='font-medium text-lg'>Description :</h2>
                <p>{company?.description}</p>
                <h2 className='font-medium text-lg'>Location :</h2>
                <p>{company?.location}</p>
            </div>
        </div>
    )
}

export default CompanyDescription