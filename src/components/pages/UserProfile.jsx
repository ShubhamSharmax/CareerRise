import { Avatar, AvatarImage } from '../ui/avatar'
import { Button } from '../ui/button'
import { Mail, Phone } from 'lucide-react'
import { useSelector } from 'react-redux'
import { Badge } from '../ui/badge'
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from '../ui/table'
import UpdateProfile from '../common/UpdateProfile'
import useGetAppliedJobs from '@/hooks/useGetAppliedJobs'

const UserProfile = () => {
    useGetAppliedJobs()
    const { user } = useSelector(store => store.auth)
    return (
        <div className='max-w-7xl mx-auto my-10 border rounded-xl p-5'>
            <div className="flex item-center justify-between">
                <div className='flex gap-5 items-center m-5 '>
                    <Avatar className='h-24 w-24'>
                        <AvatarImage src={user?.profile?.profilePicture} />
                    </Avatar>
                    <div>
                        <h1 className='font-bold text-2xl'>{user?.fullname}</h1>
                        <p className='font-medium'>{user?.profile?.bio}</p>
                    </div>
                </div>
                <UpdateProfile />
            </div>
            <div className='grid grid-cols-[20%_1fr] gap-5 p-8 items-center'>
                <h2 className='font-bold text-lg'><Mail /></h2>
                <h3 className='font-medium'>{user?.email}</h3>
                <h2 className='font-bold text-lg'><Phone /></h2>
                <h3 className='font-medium'>{user?.phoneNumber}</h3>
                <h2 className='font-bold text-lg'>Skills</h2>
                <div className="skillbadges flex flex-wrap gap-5">
                    {user?.profile?.skills?.length > 0 ? (
                        user.profile.skills.map((skill, index) => (
                            <Badge key={index} variant='ghost'>{skill}</Badge>
                        ))
                    ) : (
                        <p className='text-slate-500'>No skills listed</p>
                    )}
                </div>
                <h2 className='font-bold text-lg'>Resume</h2>
                {user?.profile?.resumeurl ? <a target='blank' href={user.profile.resumeurl}>
                    <Button variant='link' className='p-0 text-blue-600 hover:text-blue-800 text-base'>{user?.profile?.resumeName}</Button>
                </a> : <p className='text-slate-500'>No resume uploaded</p>}

            </div>

            {user?.role === 'candidate' && <><hr /> <AppliedJobs /></>}
        </div>
    )
}

export default UserProfile


export const AppliedJobs = () => {
    const { appliedJobs } = useSelector(store => store.job)

    return (
        <div className='my-10 p-5'>
            <h1 className='text-xl font-bold'>Applied Jobs</h1>
            <Table className='my-2'>
                <TableCaption>{appliedJobs.length <= 0 ? "You Haven't Applied to any Job Yet" : "All Applied Jobs"}</TableCaption>
                <TableHeader>
                    <TableRow>
                        <TableHead>Company</TableHead>
                        <TableHead>Job Role</TableHead>
                        <TableHead>Date Applied</TableHead>
                        <TableHead className='text-center px-5'>status</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {appliedJobs.length > 0 && appliedJobs.map((application, index) => (
                        <TableRow key={index}>
                            <TableCell>{application?.job?.company?.name}</TableCell>
                            <TableCell>{application?.job?.title}</TableCell>
                            <TableCell>{application?.createdAt.split("T")[0]}</TableCell>
                            <TableCell className='text-center'><Badge variant='outline' className={`px-4 text-base text-slate-600 cursor-default ${application?.status === 'accepted' && 'bg-green-200'} ${application?.status === 'rejected' && 'bg-red-200'}`}>{application?.status}</Badge></TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </div>
    )
}
