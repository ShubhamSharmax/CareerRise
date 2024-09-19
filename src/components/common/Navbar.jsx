import React, { useState } from 'react';
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover"
import { Avatar, AvatarImage } from '../ui/avatar';
import { LogOut, User2 } from 'lucide-react';
import { Button } from '../ui/button';
import { Link, NavLink } from 'react-router-dom';


const Navbar = () => {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    return (
        <nav className='navbar flex items-center justify-between mx-auto max-w-7xl h-16'>
            <div className="nav-left">
                <Link to='/'><h1 className='font-bold text-3xl text-slate-800'>Career<span className='text-cyan-500'>RISE</span></h1></Link>
            </div>
            <div className="nav-right flex items-center gap-5">
                <ul className='menu flex items-center gap-5 text-xl'>
                    <NavLink to="/" className={({ isActive }) =>`font-semibold hover:text-slate-800  transition-all duration-200 ease-in-out  ${isActive ? "scale-110 text-slate-700" : "text-slate-500"}`}>Home</NavLink>
                    <NavLink to="/jobs" className={({ isActive }) =>`font-semibold hover:text-slate-800  transition-all duration-200 ease-in-out  ${isActive ? "scale-110 text-slate-700" : "text-slate-500"}`}>Jobs</NavLink>
                    <NavLink to="/browse" className={({ isActive }) =>`font-semibold hover:text-slate-800  transition-all duration-200 ease-in-out  ${isActive ? "scale-110 text-slate-700" : "text-slate-500"}`}>Browse</NavLink>
                </ul>
                {isLoggedIn && (
                    <div className="profile">
                        <Popover>
                            <PopoverTrigger>
                                <Avatar className='cursor-pointer'>
                                    <AvatarImage src="https://github.com/shadcn.png"/>
                                </Avatar>
                            </PopoverTrigger>
                            <PopoverContent>
                                <div className='flex flex-col gap-3'>
                                    <div className='flex items-center gap-5'>
                                        <Avatar>
                                            <AvatarImage src="https://github.com/shadcn.png" />
                                        </Avatar>
                                        <div>
                                            <h1 className='text-lg font-semibold'>Shubham Sharma</h1>
                                            <p className='text-sm text-muted-foreground'>Full Stack Developer</p>
                                        </div>
                                    </div>
                                    <div className='flex flex-col text-slate-500'>
                                        <div className='flex items-center w-fit gap-1 cursor-pointer'>
                                            <User2 />
                                            <Button variant="link" className='text-base text-slate-700'>View Profile</Button>
                                        </div>
                                        <div className='flex items-center w-fit gap-1 cursor-pointer'>
                                            <LogOut />
                                            <Button variant="link" className='text-base text-slate-700'>Logout</Button>
                                        </div>
                                    </div>
                                </div>
                            </PopoverContent>
                        </Popover>
                    </div>
                )}
                {!isLoggedIn && (
                    <div className="buttons flex items gap-2">
                        <Link to='/login'><Button variant="outline">Log In</Button></Link>
                        <Link to='/signup'><Button>Sign Up</Button></Link>
                    </div>
                )}
            </div>
        </nav>
    )
}

export default Navbar