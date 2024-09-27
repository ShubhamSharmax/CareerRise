import React from 'react'
import HomeBanner from '../common/HomeBanner'
import RecentJobsList from '../common/RecentJobsList'
import useGetJobs from '@/hooks/useGetJobs'

const HomePage = () => {
  useGetJobs();
  return (
    <>
        <HomeBanner/>
        <RecentJobsList/>
    </>
  )
}

export default HomePage