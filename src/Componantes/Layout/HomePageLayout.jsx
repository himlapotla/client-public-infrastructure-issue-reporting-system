import React from 'react'
import Navbar from '../MainComponents/Navbar'
import { Outlet } from 'react-router'
import Footer from '../MainComponents/Footer'

const HomePageLayout = () => {
  return (
    <div className='space-y-14'>
        <Navbar> </Navbar>
        <Outlet></Outlet>
        <Footer> </Footer>
    </div>
  )
}

export default HomePageLayout