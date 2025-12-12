import React, { useContext, useState } from "react";
import { AllContext } from "../Provider/AuthProvider";
import axios from "axios";

const ManageStaff = () => {

    const {  } = useContext(AllContext)
    const [open, setOpen] = useState(false)
    const [error, setError] = useState('')
    const [imageURL, setImageURL] = useState("")

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

    const handleStaff = async (e) => {
        e.preventDefault();

        const email = e.target.email.value;
        const pass = e.target.password.value;
        const name = e.target.name.value;
        const phone = e.target.phone.value;

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
            // Submit to backend /create-staff route
            try {
                const res = await axios.post(`${import.meta.env.VITE_API_URL}/create-staff`, {
                    name,
                    email,
                    phone,
                    pass,
                    photoURL: imageURL,
                });

                if (res.data.success) {
                    alert("Staff added successfully!");
                    setOpen(false);
                    setImageURL("");
                    e.target.reset()
                } else {
                    setError("Failed to add staff");
                }
            } catch (err) {
                console.error(err);
                setError(err.response?.data?.message || "Server error");
            }
        };

        // saveOrUpdateUser({ name, email, phone, imageURL, })
    }

    return (
    <div>

        <button className="btn" onClick={() => setOpen(true)} >
            Add Staff
        </button>

        {open && (
            <div className="fixed inset-0 bg-opacity-50 flex justify-center items-center z-50">

                <div className="bg-white p-6 rounded-xl w-96 shadow-lg relative">

                    <h2 className="text-xl font-bold mb-4">Add Staff</h2>


                    <form onSubmit={handleStaff} className="space-y-5">
                        <input
                            type="text"
                            name="name"
                            placeholder="Full Name"
                            className="input input-bordered w-full"
                            required
                        />

                        <input
                            type="email"
                            name="email"
                            placeholder="Email Address"
                            className="input input-bordered w-full"
                            required
                        />

                        <input
                            type="text"
                            name="phone"
                            placeholder="Phone Number"
                            className="input input-bordered w-full"
                            required
                        />

                        <label className='label'> upload the photo </label>  <br />
                        <input
                            name='image'
                            type='file'
                            id='image'
                            accept='image/*'
                            className='input'
                            onChange={handleImageUpload} />

                        <input
                            type="password"
                            name="password"
                            placeholder="Password"
                            className="input input-bordered w-full"
                            required
                        />


                        <button className="btn btn-primary w-full">Save</button>
                    </form>


                    <button
                        className="btn btn-sm btn-circle absolute top-2 right-2"
                        onClick={() => setOpen(false)}
                    >
                        ✕
                    </button>

                </div>
            </div>
        )}
    </div>
);
}





export default ManageStaff;


