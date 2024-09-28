import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { setCompanies } from '@/redux/companySlice'
import { Avatar, AvatarImage } from '@radix-ui/react-avatar'
import axios from 'axios'
import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'

const AdminHome = () => {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const { companies } = useSelector(store => store.company)

  useEffect(() => {
    const fetchCompanies = async () => {
      try {
        const apiUrl = `${import.meta.env.VITE_API_COMPANY}/get`
        const res = await axios.get(apiUrl, { withCredentials: true });
        if (res.status === 200) {
          dispatch(setCompanies(res.data.companies))
        }
      } catch (error) {
        console.log(error);

      }
    }
    fetchCompanies()
  }, [])

  return (
    <div className='max-w-7xl mx-auto my-10'>
      <div className='my-2'>
        <h1 className='text-xl font-bold'>Admin Dashboard</h1>
        <p>Welcome to the admin dashboard.</p>
      </div>
      <div className='flex items-center gap-4 my-10'>
        <Input
          type="text"
          placeholder="Search Companies"
          className='text-lg p-6'
        />
        <Button onClick={() => navigate('/admin/companies/register')} className='p-6 px-10 bg-cyan-500 hover:bg-cyan-700'>Add New</Button>
      </div>
      <div>
        <h1 className='my-5 text-xl font-bold'>Companies Created By You </h1>
        <Table>
          <TableCaption>
            Companies
            <span className='text-xs text-gray-500'>
              ({companies.length})
            </span>
          </TableCaption>
          <TableHeader>
            <TableRow>
              <TableHead>Logo</TableHead>
              <TableHead>Company Name</TableHead>
              <TableHead>Website</TableHead>
              <TableHead className='text-center'>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {companies.map((company, index) => (
              <TableRow key={index}>
                <TableCell>
                  <Avatar >
                    <AvatarImage className='w-6' src={company?.logo} />
                  </Avatar>
                </TableCell>
                <TableCell>{company?.name}</TableCell>
                <TableCell><a href={company?.website}><Button variant='link' className='p-0'>{company?.name}</Button></a></TableCell>
                <TableCell className='flex items-center gap-4 justify-center'>
                  <Button variant='outline' onClick={() => navigate(`/admin/companies/${company._id}`)} >Details</Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

    </div>

  )
}

export default AdminHome