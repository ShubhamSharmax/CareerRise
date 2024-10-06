import React, { useState } from 'react'
import { Button } from '../ui/button'
import { Search } from 'lucide-react'
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from '../ui/carousel'
import { useDispatch } from 'react-redux'
import { setSearchQuery } from '@/redux/jobSlice'
import { useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'


const HomeBanner = () => {
    const [searchText, setSearchText] = useState("");
    const dispatch = useDispatch()
    const navigate = useNavigate()

    const handleSearch = () => {
        dispatch(setSearchQuery(searchText));
        navigate(`/browse`)
    }

    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8 }}
            className='flex flex-col items-center justify-evenly gap-8 my-16 mx-auto max-md:my-12 max-sm:my-8 max-sm:gap-5'
        >
            <motion.span
                initial={{ y: -20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.5, delay: 0.3 }}
                className='px-4 py-2 bg-slate-100 text-blue-700 font-medium rounded-full max-sm:text-sm'
            >
                Your Job Search Ends Here!
            </motion.span>
            <motion.h1
                initial={{ x: -100, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ duration: 0.5, delay: 0.8 }}
                className='text-6xl font-bold text-center max-md:text-5xl max-sm:text-3xl'
            >
                Search, Apply &  <br />Get Your <span className='text-cyan-500'>Dream Jobs</span>
            </motion.h1>
            <motion.p
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.5, delay: 1 }}
                className="text-center text-muted-foreground max-md:px-4 max-sm:text-sm "
            >
                Lorem ipsum dolor, sit amet consectetur adipisicing elit. Incidunt esse dolor sit quisquam sint pariatur totam maiores autem.
            </motion.p>
            <div className='searchbox w-1/2 flex my-5 max-lg:w-2/3 max-md:w-3/4 max-sm:w-11/12'>
                <motion.input
                    initial={{ width: 0 }}
                    animate={{ width: '100%' }}
                    transition={{ duration: 0.8, delay: 1 }}
                    onChange={(e) => setSearchText(e.target.value)}
                    type="text"
                    placeholder='Search Jobs'
                    className='w-full rounded-l-full outline-none py-2 px-6 border border-slate-200 shadow-lg'
                />
                <Button onClick={handleSearch} className='rounded-r-full shadow-lg bg-cyan-500 p-8 hover:bg-cyan-700 max-sm:px-4 max-sm:p-6'><Search /></Button>
            </div>
            <motion.div
                initial={{ y: 50, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.8, delay: 1.2 }}
                className="w-1/2 my-10"
            >
                <Categories />
            </motion.div>
        </motion.div>
    )
}

export default HomeBanner

const Categories = () => {
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const category = [
        'Frontend Developer',
        'Backend Developer',
        'Data Scientist',
        'Full Stack Developer',
        'Project Manager',
        'UX/UI Designer'
    ];

    const handleSearch = (text) => {
        dispatch(setSearchQuery(text));
        navigate(`/browse`)
    }

    return (
        <div className='w-full'>
            <Carousel>
                <CarouselContent>
                    {category.map(cat => (
                        <CarouselItem onClick={() => handleSearch(cat)} className="md:basis-1/3 lg:basis-1/4"><Button variant='outline' className='text-sm rounded-full'>{cat}</Button></CarouselItem>
                    ))}
                </CarouselContent>
                <CarouselPrevious />
                <CarouselNext />
            </Carousel>
        </div>
    )
}