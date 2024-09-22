import React from 'react'
import { RadioGroup, RadioGroupItem } from '../ui/radio-group'
import { Label } from '../ui/label'

const JobFilterMenu = () => {
    const jobFilters = [
        {
            type: "Location",
            values: ['Noida', 'Gurugram', 'Mumbai', 'Pune', 'Bangalore']

        },
        {
            type: 'Job Role',
            values: ['Frontend Developer', 'Backend Developer', 'Fullstack Developer', 'UI/UX Designer']

        },
        {
            type: "Salary",
            values: ['0-2 LPA', '2-5 LPA', '5+ LPA']
        }
    ]
    return (
        <div className='my-10'>
            <h1 className='font-bold text-2xl text-center'>Filter Jobs</h1>
            <hr className='my-2 border-2' />
            {jobFilters.map((data, index) => (
                <div key={index} className='my-5'>
                    <h1 className='text-xl font-bold p-2'>{data.type}</h1>
                    <RadioGroup className='flex flex-col gap-3 pl-6'>
                        {data.values.map((item, index) => (
                            <div key={index} className='flex gap-3 items-center'>
                                <RadioGroupItem id={item} value={item} />
                                <Label htmlFor={item} className='cursor-pointer text-base' >{item}</Label>
                            </div>
                        ))}
                    </RadioGroup>
                </div>
            ))}
        </div>
    )
}

export default JobFilterMenu