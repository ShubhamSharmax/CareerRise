import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { setCreatingJob } from '@/redux/jobSlice'
import axios from 'axios'
import { ArrowLeft, Loader2 } from 'lucide-react'
import React from 'react'
import { useForm } from 'react-hook-form'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { toast } from 'sonner'

const CreateJob = () => {
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const { companies } = useSelector(store => store.company)

    const {
        register,
        handleSubmit,
        watch,
        setValue,
        formState: { errors, isSubmitting },
    } = useForm()

    const registerJob = async (data) => {
        try {
            dispatch(setCreatingJob(true))
            const apiUrl = `${import.meta.env.VITE_API_JOB}/post`
            const job = {
                "title": data.title,
                "description": data.description,
                "requirements": data.requirements,
                "salary": data.salary,
                "location": data.location,
                "jobType": data.jobType,
                "experience": data.experience,
                "position": data.position,
                "companyId": data.companyId
            }

            const res = await axios.post(apiUrl, job, { withCredentials: true })
            if (res.status === 201) {
                toast.success(res.data.message);
                navigate(`/admin/jobs`)
            }
        } catch (error) {
            toast.error(error.response.data.message);
        } finally {
            dispatch(setCreatingJob(false))
        }
    }

    return (
        <div className='max-w-7xl my-10 mx-auto'>
            <div className='flex justify-between items-center'>
                <Button variant='outline' onClick={() => navigate(`/admin/jobs`)}><ArrowLeft /> Back</Button>
                <h1 className='text-3xl font-bold w-full text-center'>Create New Job</h1>
            </div>
            <div className='max-w-5xl mx-auto my-5'>
                <form onSubmit={handleSubmit(registerJob)}>
                    <div className="title grid grid-cols-2 my-5">
                        <Label className='text-lg'>Job Title</Label>
                        <Input
                            type="text"
                            placeholder="Enter Job Title (Frontend Developer,Software Developer...)"
                            {...register("title", { required: "Job title is required" })}
                        />
                        {errors.title && <span>{errors.title.message}</span>}
                    </div>
                    <div className="description grid grid-cols-2 my-5">
                        <Label className='text-lg'>Job Description</Label>
                        <Input
                            type="text"
                            placeholder="add Job Description"
                            {...register("description", { required: "Job description is required" })}
                        />
                        {errors.description && <span>{errors.description.message}</span>}
                    </div>
                    <div className="requirements grid grid-cols-2 my-5">
                        <Label className='text-lg'>Requirements</Label>
                        <Input
                            type="text"
                            placeholder="Enter Job Requirements (seperate with comma (,) example: html,css,javascript )"
                            {...register("requirements", { required: "Requirements are required" })}
                        />
                        {errors.requirements && <span>{errors.requirements.message}</span>}
                    </div>
                    <div className="salary grid grid-cols-2 my-5">
                        <Label className='text-lg'>Salary (in LPA)</Label>
                        <Input
                            type="number"
                            placeholder="Enter Salary"
                            {...register("salary", { required: "Salary is required" })}
                        />
                        {errors.salary && <span>{errors.salary.message}</span>}
                    </div>
                    <div className="companyid grid grid-cols-2 my-5">
                        <Label className='text-lg'>Company</Label>
                        <Select onValueChange={(value) => setValue("companyId", value)} {...register("companyId", { required: "Company ID is required" })}>
                            <SelectTrigger className="w-full">
                                <SelectValue placeholder="Select Company" />
                            </SelectTrigger>
                            <SelectContent>
                                {companies && companies.map((company, index) => (<SelectItem key={index} value={company?._id}>{company?.name}</SelectItem>))}
                                {companies && companies.length <= 0 && (<SelectItem value="null" disabled={true}>Create a Company First </SelectItem>)}
                            </SelectContent>
                        </Select>
                        {errors.companyId && <span>{errors.companyId.message}</span>}
                    </div>
                    <div className="location grid grid-cols-2 my-5">
                        <Label className='text-lg'>Location</Label>
                        <Input
                            type="text"
                            placeholder="Enter Job Location (use Remote for Work From Home Jobs)"
                            {...register("location", { required: "Location is required" })}
                        />
                        {errors.location && <span>{errors.location.message}</span>}
                    </div>
                    <div className="jobType grid grid-cols-2 my-5">
                        <Label className='text-lg'>Job Type</Label>
                        <Input
                            type="text"
                            placeholder="Job Type : Part-Time Full-Time, Intern etc.."
                            {...register("jobType", { required: "Job type is required" })}
                        />
                        {errors.jobType && <span>{errors.jobType.message}</span>}
                    </div>
                    <div className="experience grid grid-cols-2 my-5">
                        <Label className='text-lg'>Experience (in years)</Label>
                        <Input
                            type="number"
                            placeholder="Enter Experience Required"
                            {...register("experience", { required: "Experience is required" })}
                        />
                        {errors.experience && <span>{errors.experience.message}</span>}
                    </div>
                    <div className="position grid grid-cols-2 my-5">
                        <Label className='text-lg'>Positions Available</Label>
                        <Input
                            type="number"
                            placeholder="Enter No. of openings"
                            {...register("position", { required: "Position is required" })}
                        />
                        {errors.position && <span>{errors.position.message}</span>}
                    </div>
                    <Button disabled={isSubmitting} type='submit' className='text-lg w-full bg-cyan-500 hover:bg-cyan-700 my-5'>
                        {isSubmitting ? <><Loader2 className='animate-spin h-4 w-4' /><span>Please Wait</span></> : 'Register Job'}
                    </Button>
                </form>
            </div>

        </div>
    )
}

export default CreateJob
