
import React from 'react'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '../ui/card'
import { Badge } from '../ui/badge'
import { Avatar, AvatarImage } from '../ui/avatar'
import { Bookmark } from 'lucide-react'
import { Button } from '../ui/button'

const JobCard = () => {
    return (
        <div>
            <Card>
                <CardHeader>
                    <div className="top flex justify-between item-center">
                        <span className='font-medium text-slate-400'>Job Posted</span>
                        <Button variant='outline' className='rounded-full h-10 w-10 p-0'><Bookmark /></Button>
                    </div>
                    <div className='flex items-center gap-5'>
                        <Avatar className='h-16 w-16 rounded-md'>
                            <AvatarImage src="https://github.com/apple.png" />
                        </Avatar>
                        <div>
                            <CardTitle className='text-3xl'>Job Title</CardTitle>
                            <CardDescription>location</CardDescription>
                        </div>

                    </div>
                </CardHeader>
                <CardContent>
                    <p>Job Description (Lorem ipsum dolor sit amet consectetur adipisicing elit. Deserunt aspernatur assumenda pariatur)</p>
                </CardContent>
                <CardFooter className='flex justify-between'>
                    <div className='flex gap-5'>
                        <Badge variant='ghost' className='text-red-600 font-medium text-sm'>salary</Badge>
                        <Badge variant='ghost' className='text-blue-600 font-medium text-sm'>positions</Badge>
                        <Badge variant='ghost' className='text-cyan-500 font-medium text-sm'>Job-Type</Badge>
                    </div>
                    <Button className='bg-cyan-500 hover:bg-cyan-700'>View Details</Button>
                </CardFooter>
            </Card>
        </div>
    )
}

export default JobCard