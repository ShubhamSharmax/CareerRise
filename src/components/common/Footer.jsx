import { FacebookIcon, Github, House, InstagramIcon, Layers, LinkedinIcon, TwitterIcon, User2 } from 'lucide-react';
import React from 'react'
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom'
import { Button } from '../ui/button';

const Footer = () => {
  const { user } = useSelector((store) => store.auth);
  return (
    <div className='footer bg-slate-200 shadow-inner'>
      <hr />
      <div className='flex max-w-7xl mx-auto justify-between items-center max-md:justify-evenly max-sm:flex-col max-sm:max-w-[95%]' >
        <div className="left flex flex-col gap-2 max-sm:items-center">
          <div className="logo mt-5">
            <Link to='/'><h1 className='font-bold text-3xl text-slate-800'>Career<span className='text-cyan-500'>RISE</span></h1></Link>
            <p className='font-medium text-slate-600 -mt-2'>Start Your Career Journey</p>
          </div>
          <div className='flex flex-col max-sm:flex-row'>
            {user && user?.role === 'recruiter' ? (
              <>
                <Link to="/admin"  ><Button variant='link' className='text-lg font-medium flex gap-2'><House /> Home</Button></Link>
                <Link to="/admin/jobs"  ><Button variant='link' className='text-lg font-medium flex gap-2 '><Layers /> Jobs</Button></Link>
                <Link to="/profile"  ><Button variant='link' className='text-lg font-medium flex gap-2'><User2 /> User Profile</Button></Link>
              </>
            ) : (
              <>
                <Link to="/"  ><Button variant='link' className='text-lg font-medium flex gap-2'><House /> Home</Button></Link>
                <Link to="/jobs"  ><Button variant='link' className='text-lg font-medium flex gap-2 '><Layers /> Jobs</Button></Link>
                <Link to="/profile"  ><Button variant='link' className='text-lg font-medium flex gap-2'><User2 /> User Profile</Button></Link>
              </>
            )}
          </div>
        </div>
        <div className="right flex flex-col items-center max-sm:my-4">
          <h1 className='text-2xl font-bold my-2 max-sm:text-xl'>Social Links</h1>
          <div className='flex items-center gap-5'>
            <Github className='stroke-cyan-500 hover:scale-110 cursor-pointer' size='42' />
            <FacebookIcon className='stroke-cyan-500 hover:scale-110 cursor-pointer' size='42' />
            <LinkedinIcon className='stroke-cyan-500 hover:scale-110 cursor-pointer' size='42' />
            <InstagramIcon className='stroke-cyan-500 hover:scale-110 cursor-pointer' size='42' />
            <TwitterIcon className='stroke-cyan-500 hover:scale-110 cursor-pointer' size='42' />
          </div>
        </div>
      </div>
      <hr className='border-slate-300' />
      <p className='text-center p-2 text-base font-medium text-slate-500'>&copy; 2024 CareerRise. All rights reserved.</p>
    </div>
  )
}

export default Footer