import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import useGetCompanies from '@/hooks/useGetCompanies'
import { Avatar, AvatarImage } from '@radix-ui/react-avatar'
import { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'

const AdminHome = () => {
  useGetCompanies()
  const navigate = useNavigate()
  const { companies } = useSelector(store => store.company)

  const [searchText, setSearchText] = useState("")
  const [filterCompanies, setFilterCompanies] = useState(companies)

  useEffect(() => {
    document.title = 'CareerRise'
  }, []);


  useEffect(() => {
    setFilterCompanies(companies.filter(company => company.name.toLowerCase().includes(searchText.toLowerCase())))
  }, [searchText, companies])

  return (
    <div className='max-w-7xl mx-auto my-10 max-md:pl-2'>
      <div className='my-2 '>
        <h1 className='text-xl font-bold'>Admin Dashboard</h1>
        <p>Welcome to the admin dashboard.</p>
      </div>
      <div className='flex items-center gap-4 my-10 max-sm:flex-col max-sm:w-[95%] max-sm:mx-auto'>
        <Input
          type="text"
          placeholder="Search Companies"
          className='text-lg p-6'
          onChange={(e) => setSearchText(e.target.value)}
        />
        <Button onClick={() => navigate('/admin/companies/register')} className='p-6 px-10 bg-cyan-500 hover:bg-cyan-700 max-sm:self-end'>Add New</Button>
      </div>
      <div>
        <h1 className='my-5 text-xl font-bold'>Companies Created By You </h1>
        <Table className='my-2 max-sm:overflow-x-auto max-sm:w-[640px]'>
          <TableCaption>
            Companies
            <span className='text-xs text-gray-500'>
              ({filterCompanies.length})
            </span>
          </TableCaption>
          <TableHeader>
            <TableRow>
              <TableHead>Logo</TableHead>
              <TableHead>Company Name</TableHead>
              <TableHead>Website</TableHead>
              <TableHead>Date Created</TableHead>
              <TableHead className='text-center'>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filterCompanies.length > 0 && filterCompanies.map((company, index) => (
              <TableRow key={index}>
                <TableCell>
                  <Avatar >
                    <AvatarImage className='w-6' src={company?.logo} />
                  </Avatar>
                </TableCell>
                <TableCell>{company?.name}</TableCell>
                <TableCell><a href={company?.website}><Button variant='link' className='p-0'>{company?.name}</Button></a></TableCell>
                <TableCell>{company?.createdAt.split("T")[0]}</TableCell>
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