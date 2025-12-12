import React from 'react'
import Navbar from '../MainComponents/Navbar'
import { Outlet } from 'react-router'
import Footer from '../MainComponents/Footer'
import Sidebar from './Sidebar'

const DashboardLayout = () => {
  return (
    <div className='space-y-12 '>
        <Navbar> </Navbar>

        <div className='flex w-11/12 mx-auto gap-5 '>
          <div className=''>
            <Sidebar> </Sidebar>
          </div>
          <div className='w-full min-h-screen bg-amber-200 p-5 rounded-2xl'>
            <Outlet> </Outlet>
          </div>
        </div>

        <Footer> </Footer>
    </div>
  )
}

export default DashboardLayout