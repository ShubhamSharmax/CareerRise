import { Avatar, AvatarImage } from '@/components/ui/avatar'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { setApplicants } from '@/redux/applicationSlice'
import { setJob } from '@/redux/jobSlice'
import axios from 'axios'
import { ArrowLeft } from 'lucide-react'
import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate, useParams } from 'react-router-dom'
import ApplicantsDetails from './ApplicantsDetails'

const ViewJobDetails = () => {
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const params = useParams()
    const jobId = params.id
    const { job } = useSelector(store => store.job)

    useEffect(() => {
        const fetchJob = async () => {
            try {
                const apiUrl = `${import.meta.env.VITE_API_JOB}/get/${jobId}`
                const res = await axios.get(apiUrl, { withCredentials: true });
                if (res.status === 200) {
                    dispatch(setJob(res.data.job))
                }
            } catch (error) {
                console.log(error);
            }
        }
        const fetchApplicants = async () => {
            try {
                const apiUrl = `${import.meta.env.VITE_API_APPLICATION}/${jobId}/candidates`
                const res = await axios.get(apiUrl, { withCredentials: true });
                if (res.status === 200) {
                    dispatch(setApplicants(res.data.application))
                }
            } catch (error) {
                console.log(error);
            }
        }
        fetchJob();
        fetchApplicants();
    }, [jobId]);

    return (
        <div className='max-w-7xl mx-auto my-10 border rounded-xl p-5 max-sm:my-5'>
            <div className='flex items-center my-5'>
                <Button variant='outline' onClick={() => navigate('/admin/jobs')}><ArrowLeft /> Back</Button>
                <div className='flex-1'>
                    <h2 className='text-2xl font-bold text-center'>Job Details</h2>
                </div>
            </div>
            <div className="flex item-center justify-between">
                <div className='flex gap-5 items-center m-5 '>
                    <Avatar className='h-24 w-24'>
                        <AvatarImage src={job?.company?.logo} />
                    </Avatar>
                    <div>
                        <h1 className='font-bold text-2xl max-sm:text-xl'>{job?.title}</h1>
                        <p className='font-medium max-sm:font-normal'>{job?.company?.name}</p>
                    </div>
                </div>
            </div>
            <hr />
            <div className='grid grid-cols-2 gap-y-4 p-5 text-lg max-sm:text-base'>
                <h2 className='font-medium text-lg'>Location:</h2>
                <p>{job?.location}</p>

                <h2 className='font-medium text-lg'>Description:</h2>
                <p className='text-justify'> {job?.description}</p>

                <h2 className='font-medium text-lg'>Requirements:</h2>
                <div className='flex gap-4 flex-wrap'>
                    {job?.requirements.map((item, index) => (
                        <Badge key={index} variant='ghost' className='px-5'>{item}</Badge>
                    ))}
                </div>

                <h2 className='font-medium text-lg'>Salary:</h2>
                <p>{job?.salary} LPA</p>

                <h2 className='font-medium text-lg'>Job Type:</h2>
                <p>{job?.jobType}</p>

                <h2 className='font-medium text-lg'>Experience:</h2>
                <p>{job?.experience} years</p>

                <h2 className='font-medium text-lg'>Position:</h2>
                <p>{job?.position} openings</p>

                <h2 className='font-medium text-lg'>Created On:</h2>
                <p>{job?.createdAt.split("T")[0]}</p>
            </div>
            <ApplicantsDetails />

        </div>
    )
}

export default ViewJobDetails

