
import React from 'react'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '../ui/card'
import { Badge } from '../ui/badge'
import { Avatar, AvatarImage } from '../ui/avatar'
import { Bookmark } from 'lucide-react'
import { Button } from '../ui/button'
import { useNavigate } from 'react-router-dom'

const JobCard = ({ job }) => {
    const navigate = useNavigate();

    const daysAgo = (date) => {
        const createdAt = new Date(date);
        const now = new Date();
        const diffTime = now - createdAt;
        const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));
        return diffDays
    }

    return (
        <div>
            <Card>
                <CardHeader>
                    <div className="top flex justify-between item-center">
                        <span className='font-medium text-slate-400 max-sm:text-sm'>{daysAgo(job?.createdAt) === 0 ? "Today" : `${daysAgo(job?.createdAt)} days ago`}</span>
                        <Button variant='outline' className='rounded-full h-10 w-10 p-0'><Bookmark /></Button>
                    </div>
                    <div className='flex items-center gap-5'>
                        <Avatar className='h-16 w-16 rounded-md'>
                            <AvatarImage src={job?.company?.logo} />
                        </Avatar>
                        <div>
                            <CardTitle className='text-3xl max-sm:text-2xl'>{job?.title}</CardTitle>
                            <CardDescription>{job?.location}</CardDescription>
                        </div>
                    </div>
                </CardHeader>
                <CardContent>
                    <p className='line-clamp-2'>{job?.description}</p>
                </CardContent>
                <CardFooter className='flex justify-between max-sm:flex-col max-sm:gap-4'>
                    <div className='flex gap-3 max-sm:gap-2 max-sm:self-start'>
                        <Badge variant='ghost' className='text-red-600 font-medium text-sm'>{job?.salary} LPA</Badge>
                        <Badge variant='ghost' className='text-blue-600 font-medium text-sm'>{job?.position} Positions</Badge>
                        <Badge variant='ghost' className='text-cyan-500 font-medium text-sm'>{job?.jobType}</Badge>
                    </div>
                    <Button onClick={() => navigate(`/jobs/description/${job?._id}`)} className='bg-cyan-500 hover:bg-cyan-700 text-white max-sm:self-end'>View Details</Button>
                </CardFooter>
            </Card>
        </div>
    )
}

export default JobCard