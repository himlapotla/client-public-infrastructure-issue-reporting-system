import { use, useContext, useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router'
import { FaMoon, FaSun } from 'react-icons/fa'
import { toast } from 'react-toastify'
import { AllContext } from '../Provider/AuthProvider'
import axios from 'axios'

const Navbar = () => {

    const { user, logOutt, changeColor, role, color } = useContext(AllContext)
    const [open, setOpen] = useState(false)
    const navigate = useNavigate()
    const [photo, setPhoto] = useState(null)
    const [photo2, setPhoto2] = useState(null)


    const links = <>
        <Link to={'/'}> <p className='font-semibold text-'>Home</p> </Link>
        <Link to={'/allIssues'}> <p className='font-semibold text-'>All Issues</p> </Link>

        {role == 'citizen' &&
        <> <Link to={'/dashboard/Report-issue'}> <p className='font-semibold text-'>Report An Issue</p> </Link>
        <Link to={'/dashboard/All-my-issues'}> <p className='font-semibold text-'>All My Issues</p> </Link> </>
        }

        {role == 'staff' &&
        <> <Link to={'/dashboard/All-assigned-issues'}> <p className='font-semibold text-'>All Assigned Issues</p> </Link>
        <Link to={'/dashboard'}> <p className='font-semibold text-'>All Tasks</p> </Link> </>
        }

        {role == 'admin' &&
        <> <Link to={'/dashboard/Manage-user'}> <p className='font-semibold text-'>Manage User</p> </Link>
        <Link to={'/dashboard/Manage-staff'}> <p className='font-semibold text-'>Manage Staff</p> </Link> </>
        }
    </>
    console.log(photo);

    const handleOut = () => {
        setOpen(false)
        logOutt()
            .then(() => {
                navigate('/')
                toast.success("You are logged out")
            })
    }

    useEffect(() => {
        if (!user?.email) return

        const fetchUsers = async () => {
            try {
                const res = await axios.get(
                    `${import.meta.env.VITE_API_URL}/user/${user.email}`
                )
                setPhoto(res.data.imageURL)
                setPhoto2(res.data.photoURL)
                console.log(res.data);
            }
            catch (error) {
                console.error(error)
            }
        }
        fetchUsers()
    }, [user?.email])


    return (
        <div className=' bg-gradient-to-r from-emerald-400 to-emerald-500 text-white'>

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

                    <div className="flex items-center gap-3">

                        <img
                            src="https://i.ibb.co.com/zTWJnbYW/imagesss.jpg"
                            alt="CityFix Logo"
                            className="w-10 h-10 rounded-md object-cover"
                        />

                        <Link
                            to="/"
                            className="text-2xl font-extrabold tracking-wide text-amber-700 hover:text-amber-600 transition-colors duration-300"
                        >
                            City<span className="text-gray-800 dark:text-gray-200">Fix</span>
                        </Link>

                        <button
                            onClick={changeColor}
                            aria-label="Toggle theme"
                            className="ml-2 p-2 rounded-full bg-amber-100 text-amber-700 
                   hover:bg-amber-200 hover:scale-105
                   dark:bg-gray-700 dark:text-yellow-400
                   transition-all duration-300"
                        >
                            {color === "light-mode" ? <FaMoon size={18} /> : <FaSun size={18} />}
                        </button>
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
                        user ? <img
                            onClick={() => setOpen(!open)}
                            className="w-15 h-15 rounded-full border object-cover cursor-pointer"
                            title={user ? user.displayName : ""}
                            src={user ? (photo || photo2) : 'nai'}
                        /> :
                            <Link to="/login" className="btn text-white font-semibold bg-emerald-400"> Login </Link>

                    }

                    {open && (
                        <div className="absolute right-0 bg-white shadow-lg rounded-lg absolute mt-44 w-40 p-2">
                            <div className="p-2 hover:bg-gray-100 cursor-pointer">
                                <p className='text-black'> {user?.displayName || "User Name"} </p>
                            </div>
                            <Link to={'/dashboard'} className="p-2 text-black hover:bg-gray-100 cursor-pointer">
                                Dashboard
                            </Link>
                            <div onClick={handleOut} className="p-2 text-black hover:bg-gray-100 cursor-pointer">
                                Logout
                            </div>
                        </div>
                    )}

                </div>
            </div>

        </div>
    )
}

export default Navbar
