
import React from 'react'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '../ui/card'
import { Badge } from '../ui/badge'

const JobCard = () => {
    return (
        <div>
            <Card>
                <CardHeader>
                    <CardTitle className='text-3xl'>Job Title</CardTitle>
                    <CardDescription>location</CardDescription>
                </CardHeader>
                <CardContent>
                    <p>Job Description (Lorem ipsum dolor sit amet consectetur adipisicing elit. Deserunt aspernatur assumenda pariatur)</p>
                </CardContent>
                <CardFooter className='flex gap-5'>
                    <Badge variant='ghost' className='text-red-600 font-medium text-sm'>salary</Badge>
                    <Badge variant='ghost' className='text-blue-600 font-medium text-sm'>positions</Badge>
                    <Badge variant='ghost' className='text-cyan-500 font-medium text-sm'>Job-Type</Badge>
                </CardFooter>
            </Card>
        </div>
    )
}

export default JobCard