import React from 'react'
import Navbar from '../MainComponents/Navbar'
import { Outlet } from 'react-router'
import Footer from '../MainComponents/Footer'
import Sidebar from './Sidebar'

const DashboardLayout = () => {
  return (
    <div className="space-y-8 sm:space-y-12">
      <Navbar />

      {/* Main Content */}
      <div className="
        flex flex-col lg:flex-row
        w-full lg:w-11/12
        mx-auto
        gap-4 lg:gap-5
        px-3 lg:px-0
      ">
        {/* Sidebar */}
        <div className="
          w-full lg:w-1/4
        ">
          <Sidebar />
        </div>

        {/* Outlet Content */}
        <div className="
          w-full
          min-h-screen
          bg-amber-200
          p-4 sm:p-5
          rounded-2xl
        ">
          <Outlet />
        </div>
      </div>

      <Footer />
    </div>
  )
}

export default DashboardLayout
