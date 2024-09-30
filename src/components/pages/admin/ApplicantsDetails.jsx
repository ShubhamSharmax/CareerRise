import axios from 'axios'
import React, { useEffect } from 'react'
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { useDispatch, useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'
import { Button } from '@/components/ui/button'
import { Check, MoreHorizontal, X } from 'lucide-react'
import { setApplicants } from '@/redux/applicationSlice'
import { Popover } from '@radix-ui/react-popover'
import { PopoverContent, PopoverTrigger } from '@/components/ui/popover'
import { toast } from 'sonner'
import { Badge } from '@/components/ui/badge'

const ApplicantsDetails = () => {
    const dispatch = useDispatch()
    const params = useParams()
    const jobId = params.id
    const { applicants } = useSelector(store => store.application)

    useEffect(() => {
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
        fetchApplicants();
    }, [jobId, applicants]);

    const handleSelection = async (status, id) => {
        try {
            console.log(status);
            console.log(id);


            const statusUpdate = {
                status: status
            }
            console.log(statusUpdate);

            const apiUrl = `${import.meta.env.VITE_API_APPLICATION}/status/${id}/update`
            const res = await axios.post(apiUrl, statusUpdate, { withCredentials: true });
            if (res.status === 200) {
                toast.success(res.data.message)

            }
        } catch (error) {
            toast.error(error.response?.data?.message || 'Error updating application status');

        }
    }

    return (
        <div className='my-10 p-5'>
            <h1 className='text-xl font-bold my-5'>Applications</h1>
            <hr />
            <Table>
                <TableCaption>
                    Total Applications on this Job
                    <span className='text-xs text-gray-500'>
                        ({applicants.length})
                    </span>
                </TableCaption>
                <TableHeader>
                    <TableRow>
                        <TableHead>Name</TableHead>
                        <TableHead>Email</TableHead>
                        <TableHead>Contact</TableHead>
                        <TableHead>Resume</TableHead>
                        <TableHead>Application Date</TableHead>
                        <TableHead className='text-center'>Actions</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {applicants.map((data, index) => (
                        <TableRow key={index}>
                            <TableCell>{data?.candidate?.fullname}</TableCell>
                            <TableCell>{data?.candidate?.email}</TableCell>
                            <TableCell>{data?.candidate?.phoneNumber}</TableCell>
                            <TableCell><a href={data?.candidate?.profile?.resumeurl}><Button variant='link'>{data?.candidate?.profile?.resumeName}</Button></a></TableCell>
                            <TableCell>{data?.createdAt.split("T")[0]}</TableCell>
                            <TableCell className='flex items-center gap-4 justify-center'>
                                {data?.status === 'pending' ? (<Popover>
                                    <PopoverTrigger>
                                        <Button variant='outline'><MoreHorizontal /></Button>
                                    </PopoverTrigger>
                                    <PopoverContent>

                                        <div className='flex flex-col gap-2 items-center justify-center'>
                                            <Button onClick={() => handleSelection('accepted', data?._id)} className='w-full bg-green-500 hover:bg-green-400'><Check />Select</Button>
                                            <Button onClick={() => handleSelection('rejected', data?._id)} variant='destructive' className='w-full'><X />Reject</Button>
                                        </div>
                                    </PopoverContent>
                                </Popover>) : <Badge variant='outline' className={`text-base px-2 cursor-default ${data?.status === 'accepted' ? 'bg-green-200' : 'bg-red-200'}`}>{data?.status}</Badge>}
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </div>
    )
}

export default ApplicantsDetails