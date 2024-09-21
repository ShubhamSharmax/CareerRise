import React from 'react'
import { Label } from '../ui/label'
import { Button } from '../ui/button'
import { Link } from 'react-router-dom'
import { RadioGroup, RadioGroupItem } from '../ui/radio-group'
import { useForm } from 'react-hook-form'
import { Input } from '../ui/input'

const TestRadio = () => {
    const {
        register,
        handleSubmit,
        setValue, // Adding setValue for handling value changes
        formState: { errors, isSubmitting },
    } = useForm()


    const handleData = async (data) => {
        console.log(data)
    }

    return (
        <>
            <div className='max-w-7xl m-auto flex items-center justify-center my-10'>
                <form onSubmit={handleSubmit(handleData)} className='w-1/2 flex flex-col gap-6 border p-5 shadow-md rounded-md border-slate-300'>
                    <h1 className='font-bold text-2xl text-center mb-5'>Radio Test</h1>
                    <div className="role flex items-center">
                        <RadioGroup
                            className='flex items-center gap-5'
                            onValueChange={(value) => setValue("role", value)} // Update form state with selected value
                        >
                            <div className="flex items-center space-x-2">
                                <RadioGroupItem id="candidate" value="candidate" />
                                <Label htmlFor="candidate">Candidate</Label>
                            </div>
                            <div className="flex items-center space-x-2">
                                <RadioGroupItem id="recruiter" value="recruiter" />
                                <Label htmlFor="recruiter">Recruiter</Label>
                            </div>
                        </RadioGroup>
                    </div>
                    <Button disabled={isSubmitting} type='Submit'>Submit</Button>
                </form>
            </div>
        </>
    )
}

export default TestRadio