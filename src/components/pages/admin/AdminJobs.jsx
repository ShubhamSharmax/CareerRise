import React from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import useGetAdminJobs from '@/hooks/useGetAdminJobs'

const AdminJobs = () => {
    const navigate = useNavigate()
    const { adminJobs } = useSelector(store => store.job)

    useGetAdminJobs()

    const [searchText, setSearchText] = useState("")
    const [filterJobs, setFilterJobs] = useState(adminJobs)

    useEffect(() => {
        setFilterJobs(adminJobs.filter(job => job.title.toLowerCase().includes(searchText.toLowerCase()) || job?.company?.name.toLowerCase().includes(searchText.toLowerCase())))
    }, [searchText, adminJobs])

    return (
        <div className='max-w-7xl mx-auto my-10'>
            <h1 className='text-2xl font-bold'>Jobs</h1>
            <p>Manage all your job listings</p>
            <div className='flex items-center gap-4 my-10'>
                <Input
                    type="text"
                    placeholder="Search Jobs"
                    className='text-lg p-6'
                    onChange={(e) => setSearchText(e.target.value)}
                />
                <Button onClick={() => navigate('/admin/jobs/create')} className='p-6 px-10 bg-cyan-500 hover:bg-cyan-700'>Post New Job</Button>
            </div>
            <div>
                <h1 className='my-5 text-xl font-bold'>Jobs Posted By You</h1>
                <Table>
                    <TableCaption>
                        Recent Created Jobs
                        <span className='text-xs text-gray-500'>
                            ({filterJobs.length})
                        </span>
                    </TableCaption>
                    <TableHeader>
                        <TableRow>
                            <TableHead>Company Name</TableHead>
                            <TableHead>Role</TableHead>
                            <TableHead>Date Created</TableHead>
                            <TableHead className='text-center'>Actions</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {filterJobs.length > 0 && filterJobs.map((job, index) => (
                            <TableRow key={index}>
                                <TableCell>{job?.company?.name}</TableCell>
                                <TableCell>{job?.title}</TableCell>
                                <TableCell>{job?.createdAt.split("T")[0]}</TableCell>
                                <TableCell className='flex items-center gap-4 justify-center'>
                                    <Button variant='outline' onClick={() => navigate(`/admin/jobs/${job?._id}`)} >Details</Button>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </div>
        </div>
    )
}

export default AdminJobs