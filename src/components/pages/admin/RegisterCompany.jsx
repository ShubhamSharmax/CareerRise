import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { setCompany, setCompanyUpdating } from '@/redux/companySlice'
import { Label } from '@radix-ui/react-label'
import axios from 'axios'
import { Loader2 } from 'lucide-react'
import React from 'react'
import { useForm } from 'react-hook-form'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { toast } from 'sonner'

const RegisterCompany = () => {
    const navigate = useNavigate()
    const dispatch = useDispatch();
    const {
        register,
        handleSubmit,
        formState: { errors, isSubmitting },
    } = useForm()

    const registerCompany = async (data) => {
        try {
            dispatch(setCompanyUpdating(true));
            const company = {
                companyName: data.companyName
            }
            const apiUrl = `${import.meta.env.VITE_API_COMPANY}/register`
            const res = await axios.post(apiUrl, company, {
                headers: { 'Content-Type': 'application/json' },
                withCredentials: true,
            })
            if (res.status === 200) {
                toast.success("Company registered successfully")
                dispatch(setCompany(res.data.company))
                const companyId = res?.data?.company?._id
                navigate(`/admin/companies/${companyId}/update`)
            }
        } catch (error) {
            toast.error(error.response.data.message);
        } finally {
            dispatch(setCompanyUpdating(false));
        }
    }

    return (
        <div className='max-w-7xl my-10 mx-auto'>
            <form onSubmit={handleSubmit(registerCompany)}>
                <h1 className='text-2xl font-bold'>Create a New Company</h1>
                <p className='text-slate-700'>you can chnage company name later.</p>
                <div className='my-5 p-5'>
                    <Label className='block text-xl font-bold py-5'>Company Name</Label>
                    <Input type="text" placeholder="Enter Company Name" className='text-lg p-6' {...register("companyName", { required: "Company Name is required" })} />
                    {errors.companyName && <span className='text-red-600'>{errors.companyName.message}</span>}
                </div>
                <div className="flex gap-5">
                    <Button onClick={() => navigate('/admin')} variant='outline'>Cancel</Button>
                    <Button disabled={isSubmitting} type='Submit' className='bg-cyan-500 hover:bg-cyan-700'>{isSubmitting ? <Loader2 className='animate-spin h-4 w-4' /> : 'Continue'}</Button>
                </div>
            </form>
        </div>
    )
}

export default RegisterCompany