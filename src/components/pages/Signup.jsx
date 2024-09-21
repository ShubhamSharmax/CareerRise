import React from 'react'
import { Label } from '../ui/label'
import { Input } from '../ui/input'
import { Button } from '../ui/button'
import { Link, useNavigate } from 'react-router-dom'
import { RadioGroup, RadioGroupItem } from '../ui/radio-group'
import { useForm } from 'react-hook-form'
import axios from 'axios'
import { toast } from 'sonner'
import { useDispatch, useSelector } from 'react-redux'
import { setLoading } from '@/redux/authSlice'
import { Loader2 } from 'lucide-react'

const Signup = () => {
    const {
        register,
        handleSubmit,
        watch,
        setValue,
        formState: { errors, isSubmitting },
    } = useForm()

    const {loading} = useSelector(store => store.auth);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleSignup = async (data) => {
        try {
            dispatch(setLoading(true));
            const apiUrl = `${import.meta.env.VITE_API_USER}/register`

            const formData = new FormData();
            formData.append('fullname', data.name);
            formData.append('email', data.email);
            formData.append('phoneNumber', data.phonenumber);
            formData.append('password', data.password);
            formData.append('role', data.role);
            formData.append('profile', data.profilepicture);

            const res = await axios.post(apiUrl, formData, {
                headers: {'Content-Type': 'multipart/form-data',},
                withCredentials: true,
            })
            toast.success(res.data.message)
            navigate('/login');
        } catch (error) {
            if (error.response && error.response.data.message) {
                toast.error(error.response.data.message);
            } else {
                toast.error("An unexpected error occurred.");
            }
        }finally {
            dispatch(setLoading(false));
        }
    }

    const password = watch('password', '');
    return (
        <>
            <div className='max-w-7xl m-auto flex items-center justify-center my-10'>
                <form onSubmit={handleSubmit(handleSignup)} className='w-1/2 flex flex-col gap-6 border p-5 shadow-md rounded-md border-slate-300'>
                    <h1 className='font-bold text-2xl text-center mb-5'>Sign Up</h1>
                    <div className="name">
                        <Label className='text-lg'>Full Name:</Label>
                        <Input type="text" placeholder="Enter Your Name" {...register("name", { required: "Name is required" })} />
                        {errors.name && <span>{errors.name.message}</span>}
                    </div>
                    <div className="email">
                        <Label className='text-lg'>Email:</Label>
                        <Input type="email" placeholder="Enter Your Email" {...register("email", { required: "Email is required" })} />
                        {errors.email && <span>{errors.email.message}</span>}
                    </div>
                    <div className="phonenumber">
                        <Label className='text-lg'>Phone Number:</Label>
                        <Input type="text" placeholder="Enter Your Phone Number" {...register("phonenumber", { required: "Phone Number is required" })} />
                        {errors.phonenumber && <span>{errors.phonenumber.message}</span>}
                    </div>
                    <div className="password">
                        <Label className='text-lg'>Password:</Label>
                        <Input type="password" placeholder='Enter Your Password' {...register("password", { required: "Password is required" })} />
                        {errors.password && <span>{errors.password.message}</span>}
                    </div>
                    <div className="confirmpassword">
                        <Label className='text-lg'>Confirm Password:</Label>
                        <Input type="password" placeholder='Re-Enter Your Password' {...register("confirmpassword", { required: "Confirm Password is required", validate: (value) => value === password || 'Password do not match' })} />
                        {errors.confirmpassword && <span>{errors.confirmpassword.message}</span>}
                    </div>
                    <div className="role flex items-center">
                        <RadioGroup className='flex items-center gap-5' onValueChange={(role) => { setValue("role", role) }}>
                            <div className="flex items-center space-x-2">
                                <RadioGroupItem id="candidate" value="candidate" />
                                <Label htmlFor="candidate" >Candidate</Label>
                            </div>
                            <div className="flex items-center space-x-2">
                                <RadioGroupItem id="recruiter" value="recruiter" />
                                <Label htmlFor="recruiter">Recruiter</Label>
                            </div>
                        </RadioGroup>
                    </div>
                    <div className="profilepic flex items-center gap-4">
                        <Label className='text-lg'>ProfilePicture:</Label>
                        <Input type="file" accept="image/png, image/jpeg" {...register("profilepicture")} />
                        {errors.profilepicture && <span>{errors.profilepicture.message}</span>}
                    </div>
                    <Button disabled={isSubmitting} type='Submit'>{loading?<Loader2 className='animate-spin h-4 w-4'/>:'Sign Up'}</Button>
                    <p className='text-center text-sm text-muted-foreground'>Already have an account? <span className='text-blue-600 underline font-medium'><Link to="/login">Login</Link></span></p>
                </form>
            </div>
        </>
    )
}

export default Signup