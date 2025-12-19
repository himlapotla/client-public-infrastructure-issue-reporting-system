import React, { useContext, useState } from 'react'
import { Link, useNavigate } from 'react-router'
import { toast } from 'react-toastify'
import { FaEye, FaEyeSlash, FaGoogle } from 'react-icons/fa'
import { AllContext } from '../Provider/AuthProvider'
import axios from 'axios'

const Register = () => {

    const { createUser, googleRegister, updateUserProfile, setUser, saveOrUpdateUser } = useContext(AllContext)
    const navigate = useNavigate()
    const [error, setError] = useState('')
    const [show, setShow] = useState(false)
    const [imageURL, setImageURL] = useState("");

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
                toast.success("You registered successfully")
                setUser(result.user)
                navigate('/')
            })

    }

    const handleImageUpload = async (e) => {
        const image = e.target.files[0];
        if (!image) return;

        const formData = new FormData();
        formData.append("image", image);

        try {
            const res = await axios.post(
                `https://api.imgbb.com/1/upload?key=${import.meta.env.VITE_IMGBB_API_KEY}`,
                formData
            );

            const url = res.data.data.url;
            setImageURL(url);

            console.log("Uploaded URL:", url);
        }
        catch (err) {
            console.log("Upload failed:", err);
        }
    }

    const handleRegister = async (e) => {
        e.preventDefault();

        const email = e.target.email.value;
        const pass = e.target.password.value;
        const name = e.target.name.value;

        if (!imageURL) {
            setError("Please upload an image first");
            return;
        }
        if (!/[A-Z]/.test(pass)) {
            setError('Password must contain at least one Uppercase letter')
            return
        }
        else if (!/[a-z]/.test(pass)) {
            setError('Password must contain at least one Lowercase letter')
            return
        }
        else if (pass.length < 6) {
            setError("Password must be at least 6 characters long");
            return
        }
        else {
            createUser(email, pass)
                .then((res) => {
                    updateUserProfile({
                        displayName: name,
                        photoURL: imageURL,
                    })
                        .then(() => {
                            setUser({ ...res.user, displayName: name, photoURL: imageURL });
                        });

                    navigate("/");
                    toast.success("You registered successfully")
                })
                .catch(() => setError("This user/email is already registered"))

            saveOrUpdateUser({ name, email, imageURL })
        }
    }

    return (
        <form onSubmit={handleRegister} className='form flex justify-center items-center'>
            <div className=' rounded-2xl shadow-2xl p-10 space-y-2'>

                <p className='font-bold pb-4'> Signup Now </p>

                <label className='label'> upload the photo </label>  <br />
                <input
                    name='image'
                    type='file'
                    id='image'
                    accept='image/*'
                    className='input'
                    onChange={handleImageUpload} />

                <label className='label'>Name</label> <br />
                <input required name='name' type="text" className='input' placeholder='Name' />

                <label className="label">Email</label> <br />
                <input required name='email' type="email" className="input" placeholder="Email" />

                <label className="label">Password</label> <br />
                <div className='flex items-center gap-1'>
                    <input name='password' type={show ? "text" : "password"} className="input" placeholder="Password" />
                    <span onClick={showPass} className='p-1 border-1 rounded-2xl'> {show ? <FaEyeSlash> </FaEyeSlash> : <FaEye> </FaEye>} </span>
                </div>

                <button type='submit' className="btn bg-amber-400 mt-4 w-full">Register</button>

                <p className='text-red-600'> {error ? error : ''} </p>

                <button type='button' onClick={handleGoogleRegister} className='cursor-pointer mt-2 p-3 flex gap-2 items-center justify-center rounded-sm w-full bg-amber-400' > <FaGoogle></FaGoogle> Regiter with Google </button>

                <p className='pt-2'> Already have an acount? <Link to={'/login'}> <span className='underline text-blue-400'> Go to login </span> </Link> </p>

            </div>
        </form>
    )
}
export default Register
