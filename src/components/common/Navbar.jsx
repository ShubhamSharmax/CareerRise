import React from 'react';
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover"
import { Avatar, AvatarImage } from '../ui/avatar';
import { LogOut, User2 } from 'lucide-react';
import { Button } from '../ui/button';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';
import { toast } from 'sonner';
import { setUser } from '@/redux/authSlice';


const Navbar = () => {
    const { user } = useSelector(store => store.auth)
    const dispatch = useDispatch()
    const navigate = useNavigate()

    const handleLogout = async () => {
        try {
            const apiUrl = `${import.meta.env.VITE_API_USER}/logout`
            const res = await axios.get(apiUrl, { withCredentials: true });
            if (res.status === 200) {
                dispatch(setUser(null));
                navigate('/')
                toast.success(res.data.message)
            }
        } catch (error) {
            toast.error(error.response.data.message);
        }
    }
    return (
        <nav className='navbar flex items-center justify-between mx-auto max-w-7xl h-16'>
            <div className="nav-left">
                <Link to='/'><h1 className='font-bold text-3xl text-slate-800'>Career<span className='text-cyan-500'>RISE</span></h1></Link>
            </div>
            <div className="nav-right flex items-center gap-5">
                <ul className='menu flex items-center gap-5 text-xl'>
                    {user && user?.role === 'recruiter' ? (
                        <>
                            <NavLink to="/admin" className={({ isActive }) => `font-semibold hover:text-slate-800  transition-all duration-200 ease-in-out  ${isActive ? "scale-110 text-slate-700" : "text-slate-500"}`}>Home</NavLink>
                            <NavLink to="/admin/jobs" className={({ isActive }) => `font-semibold hover:text-slate-800  transition-all duration-200 ease-in-out  ${isActive ? "scale-110 text-slate-700" : "text-slate-500"}`}>Jobs</NavLink>
                        </>
                    ) : (
                        <>
                            <NavLink to="/" className={({ isActive }) => `font-semibold hover:text-slate-800  transition-all duration-200 ease-in-out  ${isActive ? "scale-110 text-slate-700" : "text-slate-500"}`}>Home</NavLink>
                            <NavLink to="/jobs" className={({ isActive }) => `font-semibold hover:text-slate-800  transition-all duration-200 ease-in-out  ${isActive ? "scale-110 text-slate-700" : "text-slate-500"}`}>Jobs</NavLink>
                            <NavLink to="/browse" className={({ isActive }) => `font-semibold hover:text-slate-800  transition-all duration-200 ease-in-out  ${isActive ? "scale-110 text-slate-700" : "text-slate-500"}`}>Browse</NavLink>
                        </>
                    )}
                </ul>
                {user && (
                    <div className="profile">
                        <Popover>
                            <PopoverTrigger>
                                <Avatar className='cursor-pointer'>
                                    <AvatarImage src={user?.profile?.profilePicture} />
                                </Avatar>
                            </PopoverTrigger>
                            <PopoverContent>
                                <div className='flex flex-col gap-3'>
                                    <div className='flex items-center gap-5'>
                                        <Avatar>
                                            <AvatarImage src={user?.profile?.profilePicture} />
                                        </Avatar>
                                        <div>
                                            <h1 className='text-lg font-semibold'>{user?.fullname}</h1>
                                            <p className='text-sm text-muted-foreground'>{user?.profile?.bio}</p>
                                        </div>
                                    </div>
                                    <div className='flex flex-col text-slate-500'>
                                        <div className='flex items-center w-fit gap-1 cursor-pointer'>
                                            <User2 />
                                            {user?.role === 'recruiter' ? (
                                                <Link to='/admin/profile'><Button variant="link" className='text-base text-slate-700'>View Profile</Button></Link>
                                            ) : (
                                                <Link to='/profile'><Button variant="link" className='text-base text-slate-700'>View Profile</Button></Link>
                                            )}
                                        </div>
                                        <div className='flex items-center w-fit gap-1 cursor-pointer'>
                                            <LogOut />
                                            <Button variant="link" className='text-base text-slate-700' onClick={handleLogout}>Logout</Button>
                                        </div>
                                    </div>
                                </div>
                            </PopoverContent>
                        </Popover>
                    </div>
                )}
                {!user && (
                    <div className="buttons flex items gap-2">
                        <Link to='/login'><Button variant="outline">Log In</Button></Link>
                        <Link to='/signup'><Button className='bg-cyan-500 hover:bg-cyan-700'>Sign Up</Button></Link>
                    </div>
                )}
            </div>
        </nav>
    )
}

export default Navbar