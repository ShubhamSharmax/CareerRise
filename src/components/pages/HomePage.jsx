import React, { useEffect } from 'react'
import HomeBanner from '../common/HomeBanner'
import RecentJobsList from '../common/RecentJobsList'
import useGetJobs from '@/hooks/useGetJobs'

const HomePage = () => {
  useEffect(() => {
    document.title = 'CareerRise'
  }, []);
  useGetJobs();
  return (
    <>
        <HomeBanner/>
        <RecentJobsList/>
    </>
  )
}

export default HomePage