import React from 'react'
import { Button } from '../ui/button'
import { Search } from 'lucide-react'
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from '../ui/carousel'


const HomeBanner = () => {
    return (
        <div className='flex flex-col items-center justify-evenly gap-8 my-16'>
            <span className='px-4 py-2 bg-slate-100 text-blue-700 font-medium rounded-full'>Your Job Search Ends Here!</span>
            <h1 className='text-6xl font-bold text-center'>Search, Apply &  <br />Get Your <span className='text-cyan-500'>Dream Jobs</span></h1>
            <p className="text-center text-muted-foreground">Lorem ipsum dolor, sit amet consectetur adipisicing elit. Incidunt esse dolor sit quisquam sint pariatur totam maiores autem.</p>
            <div className='searchbox w-1/2 flex my-5'>
                <input type="text" placeholder='Search Jobs' className='w-full rounded-l-full outline-none py-2 px-6 border border-slate-200 shadow-lg' />
                <Button className='rounded-r-full shadow-lg bg-cyan-500 p-8 hover:bg-cyan-700'><Search /></Button>
            </div>
            <div className="w-1/2 my-10">
            <Categories />
            </div>
        </div>
    )
}

export default HomeBanner

const Categories = () => {
    const category = [
        'Frontend Developer',
        'Backend Developer',
        'Data Scientist',
        'Product Manager',
        'Project Manager',
        'UX/UI Designer',
        'HR Manager'
    ];

    return (
        <div className='w-full'>
            <Carousel>
                <CarouselContent>
                    {category.map(cat => (
                        <CarouselItem className="md:basis-1/3 lg:basis-1/4"><Button variant='outline' className='text-sm rounded-full'>{cat}</Button></CarouselItem>
                    ))}
                </CarouselContent>
                <CarouselPrevious />
                <CarouselNext />
            </Carousel>
        </div>
    )
}