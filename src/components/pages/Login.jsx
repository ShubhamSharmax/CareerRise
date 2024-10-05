import React, { useEffect } from 'react'
import { Label } from '../ui/label'
import { Input } from '../ui/input'
import { Button } from '../ui/button'
import { Link, useNavigate } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import axios from 'axios'
import { toast } from 'sonner'
import { useDispatch, useSelector } from 'react-redux'
import { setLoading, setUser } from '@/redux/authSlice'
import { Loader2 } from 'lucide-react'

const Login = () => {
    const {
        register,
        handleSubmit,
        formState: { errors, isSubmitting },
    } = useForm()

    const { loading } = useSelector(store => store.auth)
    const navigate = useNavigate();
    const dispatch = useDispatch();

    useEffect(() => {
        document.title = 'CareerRise - Login'
      }, []);

    const handleLogin = async (data) => {
        try {
            dispatch(setLoading(true))
            const apiUrl = `${import.meta.env.VITE_API_USER}/login`
            const user = {
                email: data.email,
                password: data.password
            }
            const res = await axios.post(apiUrl, user, {
                headers: { 'Content-Type': 'application/json' },
                withCredentials: true,
            })
            dispatch(setUser(res.data.user))
            toast.success(res.data.message)
            if (res.data.user && res.data.user?.role === 'recruiter') {
                navigate('/admin')
            } else {
                navigate('/')
            }
        } catch (error) {
            if (error.response && error.response.data.message) {
                toast.error(error.response.data.message);
            } else {
                toast.error("An unexpected error occurred.");
            }
        } finally {
            dispatch(setLoading(false))
        }
    }
    return (
        <>
            <div className='max-w-7xl m-auto flex items-center justify-center my-10'>
                <form onSubmit={handleSubmit(handleLogin)} className='w-1/2 flex flex-col gap-6 border p-5 shadow-md rounded-md border-slate-300'>
                    <h1 className='font-bold text-2xl text-center mb-5'>Login</h1>
                    <div className="email">
                        <Label className='text-lg'>Email:</Label>
                        <Input type="email" placeholder="Enter Your Email" {...register("email", { required: "Email is required" })} />
                        {errors.email && <span>{errors.email.message}</span>}
                    </div>
                    <div className="password">
                        <Label className='text-lg'>Password:</Label>
                        <Input type="password" placeholder='Enter Your Password' {...register("password", { required: "Password is required" })} />
                        {errors.password && <span>{errors.password.message}</span>}
                    </div>
                    <Button disabled={isSubmitting} type='Submit'>{loading ? <Loader2 className='animate-spin h-4 w-4' /> : 'Log In'}</Button>
                    <p className='text-center text-sm text-muted-foreground'>Don't have an account? <span className='text-blue-600 underline font-medium'><Link to="/signup">Register</Link></span></p>
                </form>
            </div>
        </>
    )
}

export default Login