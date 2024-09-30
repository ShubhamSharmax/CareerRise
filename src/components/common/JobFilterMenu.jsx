import React, { useEffect, useState } from 'react'
import { RadioGroup, RadioGroupItem } from '../ui/radio-group'
import { Label } from '../ui/label'
import { useDispatch } from 'react-redux'
import { setSearchQuery } from '@/redux/jobSlice'
import { Button } from '../ui/button'

const JobFilterMenu = () => {
    const [selectedValue, setSelectedValue] = useState('')
    const dispatch = useDispatch()
    const jobFilters = [
        {
            type: "Location",
            values: ['Noida', 'Gurugram', 'Mumbai', 'Pune', 'Bangalore'],
            searchValue: ['noida', 'gurugram', 'mumbai', 'pune', 'bangalore']

        },
        {
            type: 'Job Role',
            values: ['Frontend Developer', 'Backend Developer', 'Fullstack Developer', 'UI/UX Designer'],
            searchValues: ['Frontend Developer', 'Backend Developer', 'Fullstack Developer', 'UI/UX Designer']

        }
    ]

    const handleRadioChange = (value) => {
        setSelectedValue(value)
        dispatch(setSearchQuery(selectedValue))
    }
    const clearFilters = () => {
        setSelectedValue('')
        dispatch(setSearchQuery(''))
    }
    useEffect(() => {
        dispatch(setSearchQuery(selectedValue))
    }, [selectedValue])

    return (
        <div className='my-10'>
            <h1 className='font-bold text-2xl text-center'>Filter Jobs</h1>
            <hr className='my-2 border-2' />
            <div className='w-full flex items-center justify-end'>
                <Button variant='link' onClick={clearFilters}>Clear Filters</Button>
            </div>
            {jobFilters.map((data, index) => (
                <div key={index} className='my-5'>
                    <h1 className='text-xl font-bold p-2'>{data.type}</h1>
                    <RadioGroup className='flex flex-col gap-3 pl-6' value={selectedValue} onValueChange={handleRadioChange}>
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