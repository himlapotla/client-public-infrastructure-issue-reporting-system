import React, { useContext, useState } from 'react'
import { Link, useLocation, useNavigate } from 'react-router'
import { FaEye, FaEyeSlash, FaGoogle } from 'react-icons/fa'
import { AllContext } from '../Provider/AuthProvider'
import { toast } from 'react-toastify'

const Login = () => {

  const { logIn, setUser, setMail, saveOrUpdateUser, googleRegister, role } = useContext(AllContext)
  const navigate = useNavigate()
  const [err, setErr] = useState(null)
  const [show, setShow] = useState(false)

  const location = useLocation()

  const showPass = () => {
    setShow(!show)
  }

  const handleGoogleRegister = () => {

    googleRegister()
      .then((result) => {
        const user = result.user
        saveOrUpdateUser({
          name: user.displayName,
          email: user.email,
          photoURL: user.photoURL
        })

        toast.success("You are Logged in.")
        setUser(result.user)
        navigate(`${location.state ? location.state : '/'}`)
      })
  }

  const handleLogin = (e) => {

    e.preventDefault()
    const email = e.target.email.value
    const pass = e.target.password.value

    setMail(email)

    logIn(email, pass)
      .then((res) => {
        setUser(res.user)
        if (role === "staff") {
          navigate('/dashboard')
          toast.success("You are loged in successfully.")
        }
        else{
          navigate(`${location.state ? location.state : '/'}`)
          toast.success("You are loged in successfully.")
        }
      
        
      })
      .catch((err) => {
        setErr(err)
      })
  }

  return (

    <form onSubmit={handleLogin} className='form flex justify-center items-center '>


      <div className=' rounded-2xl shadow-2xl p-10 space-y-2'>
        <p className='font-bold pb-4'> Login Now </p>


        <label className="label">Email</label> <br />
        <input name='email' type="email" className="input" placeholder="Email" />

        <label className="label">Password</label> <br />
        <div className='flex items-center gap-1'>
          <input name='password' type={show ? "text" : "password"} className="input" placeholder="Password" />
          <span onClick={showPass} className='p-1 border-1 rounded-2xl'> {show ? <FaEyeSlash> </FaEyeSlash> : <FaEye> </FaEye>} </span>
        </div>

        <p> <Link className="link link-hover" to={'/forget-passwrd'}> Forgot password?</Link> </p>

        <button type='submit' className="btn bg-amber-400 mt-4 border-none w-full">Login</button>

        {
          err && <p className='text-red-600'> Please Provide Your Email/Password Correctly </p>
        }

        <button type='button' onClick={handleGoogleRegister} className='cursor-pointer mt-2 p-3 flex gap-2 items-center justify-center rounded-sm w-full bg-amber-400' > <FaGoogle></FaGoogle> Regiter with Google </button>

        <p className='pt-2'> Don't have an acount? <Link to={'/register'}> <span className='underline text-blue-400'> Register </span>  </Link> </p>

      </div>

    </form>
  )
}

export default Login