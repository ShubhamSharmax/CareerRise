import React from 'react'
import { Dialog, DialogClose, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from '../ui/dialog'
import { DialogTrigger } from '@radix-ui/react-dialog'
import { Button } from '../ui/button'
import { Loader2, PenBox } from 'lucide-react'
import { Label } from '../ui/label'
import { Input } from '../ui/input'
import { useForm } from 'react-hook-form'
import { useDispatch, useSelector } from 'react-redux'
import axios from 'axios'
import { setLoading, setUser } from '@/redux/authSlice'
import { toast } from 'sonner'
import { useNavigate } from 'react-router-dom'

const UpdateProfile = () => {
    const { user } = useSelector((store) => store.auth);
    const { loading } = useSelector(store => store.auth);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const { register, handleSubmit, formState: { isSubmitting } } = useForm({
        defaultValues: {
            name: user?.fullname || '',
            email: user?.email || '',
            phoneNumber: user?.phoneNumber || '',
            bio: user?.profile?.bio || '',
            skills: user?.profile?.skills?.join(', ') || '',
        }
    });

    const onSubmit = async (data) => {
        try {
            dispatch(setLoading(true));
            const apiUrl = `${import.meta.env.VITE_API_USER}/profile/update`

            const formData = new FormData();
            formData.append('fullname', data.name);
            formData.append('email', data.email);
            formData.append('phoneNumber', data.phoneNumber);
            formData.append('bio', data.bio);
            formData.append('skills', data.skills);
            if (data.resume[0]) {
                formData.append('file', data.resume[0]);
            }

            const res = await axios.post(apiUrl, formData, {
                headers: { 'Content-Type': 'multipart/form-data' },
                withCredentials: true,
            })

            dispatch(setLoading(false));
            dispatch(setUser(res.data.user));
            toast.success(res.data.message);
            navigate('/profile');
        } catch (error) {
            toast.error(error.response?.data?.message || 'Error updating profile');
            dispatch(setLoading(false));
        }
    };

    return (
        <div>
            <Dialog id='updateDialog'>
                <DialogTrigger>
                    <Button variant='outline' className='rounded-full h-12 w-12 p-0'><PenBox /></Button>
                </DialogTrigger>
                <DialogContent className='max-sm:max-w-[95%] max-sm:mx-auto'>
                    <DialogHeader>
                        <DialogTitle>Update Profile</DialogTitle>
                        <DialogDescription className='text-black'>
                            <form onSubmit={handleSubmit(onSubmit)}>
                                <div className='flex gap-4 items-center my-4 max-sm:flex-col max-sm:items-start'>
                                    <Label className='text-base'>Name:</Label>
                                    <Input type='text' id='name' {...register('name')} />
                                </div>
                                <div className='flex gap-4 items-center my-4 max-sm:flex-col max-sm:items-start'>
                                    <Label className='text-base'>Email:</Label>
                                    <Input type='email' id='email' {...register('email')} />
                                </div>
                                <div className='flex gap-4 items-center my-4 max-sm:flex-col max-sm:items-start'>
                                    <Label className='text-base'>Number:</Label>
                                    <Input type='text' id='phoneNumber' {...register('phoneNumber')} />
                                </div>
                                <div className='flex gap-4 items-center my-4 max-sm:flex-col max-sm:items-start'>
                                    <Label className='text-base'>Bio:</Label>
                                    <Input type='text' id='bio' placeholder='Enter your Bio' {...register('bio')} />
                                </div>
                                <div className='flex gap-4 items-center my-4 max-sm:flex-col max-sm:items-start'>
                                    <Label className='text-base'>Skills:</Label>
                                    <Input type='text' id='skills' placeholder='separate with comma( , ) example html,css,js' {...register('skills')} />
                                </div>
                                <div className='flex gap-4 items-center my-4 max-sm:flex-col max-sm:items-start'>
                                    <Label className='text-base'>Resume:</Label>
                                    <Input type='file' id='resume' {...register('resume')} />
                                </div>
                                <DialogFooter>
                                    <DialogClose>
                                        <Button disabled={isSubmitting} type='submit' className='w-full'>
                                            {loading ? "<Loader2 className='animate-spin h-4 w-4' /> Saving " : 'Save'}
                                        </Button>
                                    </DialogClose>
                                </DialogFooter>
                            </form>
                        </DialogDescription>
                    </DialogHeader>
                </DialogContent>
            </Dialog>
        </div>
    )
}

export default UpdateProfile;
