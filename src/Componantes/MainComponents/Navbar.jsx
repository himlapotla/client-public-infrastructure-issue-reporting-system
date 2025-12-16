import { use, useContext, useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router'
import { FaMoon, FaSun } from 'react-icons/fa'
import { toast } from 'react-toastify'
import { AllContext } from '../Provider/AuthProvider'
import axios from 'axios'

const Navbar = () => {

    const { user, logOutt, changeColor, color, imageURL } = useContext(AllContext)
    const [open, setOpen] = useState(false)
    const navigate = useNavigate()

    const links = <>
        <Link to={'/'}> <p className='font-semibold'>Home</p> </Link>
        <Link to={'/allIssues'}> <p className='font-semibold'>All Issues</p> </Link>
    </>

    const handleOut = () => {
        setOpen(false)
        logOutt()
            .then(() => {
                navigate('/')
                toast.success("You are logged out")
            })
    }

    return (
        <div className=' bg-gradient-to-r from-amber-400 to-amber-500'>
{/* {
    role
} */}
            <div className="navbar w-15/16 mx-auto flex items-center py-4"> 
                <div className="navbar-start">
                    <div className="dropdown">
                        <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"> <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" /> </svg>
                        </div>
                        <ul
                            tabIndex="-1"
                            className="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow">
                            <form>
                                {links}
                            </form>
                        </ul>
                    </div>

                    <div className='flex items-center gap-1'>
                        <div>
                            <p>image</p>
                        </div>
                        <div>
                            <Link to={'/'} className=" text-2xl font-bold text-amber-700"> TravelEase </Link>
                        </div>
                        <div className='text-3xl px-3' onClick={changeColor}> {color === "light-mode" ? <FaMoon> </FaMoon> : <FaSun></FaSun>}
                        </div>
                    </div>


                </div>
                <div className="navbar-center hidden lg:flex">
                    <ul className="menu menu-horizontal px-3">
                        <div className='flex gap-4'>
                            {links}
                        </div>
                    </ul>
                </div>

                <div className="navbar-end gap-3">

                    {
                        <img
                            onClick={() => setOpen(!open)}
                            className="w-3/12 md:w-2/12 lg:w-1/12 rounded-full cursor-pointer"
                            title={user ? user.displayName : ""}
                            // src={user?.photoURL || user?.imageURL || "nai"}
                            // alt=""
                            src={user ? user.photoURL : 'nai'}
                        />

                    }

                    {open && (
                        <div className="absolute right-0 bg-white shadow-lg rounded-lg mt-44 w-40 p-2">
                            <div className="p-2 hover:bg-gray-100 cursor-pointer">
                                {user?.displayName || "User Name"}
                            </div>
                            <Link to={'/dashboard'} className="p-2 hover:bg-gray-100 cursor-pointer">
                                Dashboard
                            </Link>
                            <div onClick={handleOut} className="p-2 hover:bg-gray-100 cursor-pointer">
                                Logout
                            </div>
                        </div>
                    )}

                    {
                        !user && <Link to="/login" className="btn font-semibold bg-amber-400"> Login </Link>
                    }
                </div>
            </div>

        </div>
    )
}

export default Navbar
