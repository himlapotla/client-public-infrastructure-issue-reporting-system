import React, { useContext, useEffect, useState } from 'react'
import axios from 'axios'
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router';
import { AllContext } from '../Provider/AuthProvider';

const ReportIssue = () => {

    const [imageURL, setImageURL] = useState("")
    const navigate = useNavigate()
    const { user } = useContext(AllContext)
    const [repot, setRepot] = useState([])
    const [loading, setLoading] = useState(true)
    const [dbUser, setDbUser] = useState(null)


    const handleImageUpload = async (e) => {
        const image = e.target.files[0]
        if (!image) return;

        const formData = new FormData()
        formData.append("image", image)

        try {
            const res = await axios.post(
                `https://api.imgbb.com/1/upload?key=${import.meta.env.VITE_IMGBB_API_KEY}`,
                formData
            )

            const url = res.data.data.url;
            setImageURL(url);

            console.log("Uploaded URL:", url)
        }
        catch (err) {
            console.log("Upload failed:", err)
        }
    }

    useEffect(() => {
        if (user?.email) {
            axios
                .get(`${import.meta.env.VITE_API_URL}/user/${user.email}`)
                .then((res) => setDbUser(res.data));
        }
    }, [user]);

    useEffect(() => {
        if (!user?.email) return;

        const fetchReports = async () => {
            try {
                const res = await axios.get(
                    `${import.meta.env.VITE_API_URL}/my-reports/${encodeURIComponent(user.email)}`
                );

                setRepot(res.data);
            } catch (err) {
                console.error(err);
            } finally {
                setLoading(false);
            }
        };

        fetchReports();
    }, [user?.email]);



    const handleSubmit = async (e) => {
        e.preventDefault()

        const title = e.target.title.value
        const description = e.target.description.value
        const category = e.target.category.value
        const location = e.target.location.value

        const reportData = {
            title,
            description,
            category,
            image: imageURL,
            location,
            email: user?.email,
        }

        try {
            const res = await axios.post(`${import.meta.env.VITE_API_URL}/reports`,
                reportData
            )

            console.log(res.data)
            toast.success("Your issue reported successfuly.")
            e.target.reset()
            navigate('/dashboard/All-my-issues')

        } catch (error) {
            console.error(error)
            toast.success(error.response?.data?.message)
        }
    }

    useEffect(() => {
        if (!loading && repot.length === 3 && !dbUser?.isPremium) {
            navigate("/dashboard/user-profile");
            toast.success("You have to be a premium user for more reports.")
        }
    }, [repot, loading, navigate]);

    console.log("Report length:", repot.length);



    return (
        <div className="max-w-xl mx-auto mt-10 p-6 bg-white dark:bg-gray-900 rounded-xl shadow">
            <h2 className="text-2xl font-bold mb-6 text-center">
                Report an Issue
            </h2>

            <form onSubmit={handleSubmit} className="space-y-4">

                <input
                    type="text"
                    name="title"
                    placeholder="Issue title"
                    required
                    className="w-full p-3 border rounded-lg"
                />

                <textarea
                    name="description"
                    placeholder="Describe the issue"
                    rows="4"
                    required
                    className="w-full p-3 border rounded-lg"
                />

                <select
                    name="category"
                    required
                    className="w-full p-3 border rounded-lg"
                >
                    <option value="">Select Category</option>
                    <option value="Road">Road</option>
                    <option value="Electricity">Electricity</option>
                    <option value="Water">Water</option>
                    <option value="Garbage">Garbage</option>
                    <option value="Public Transport">Public Transport</option>
                    <option value="Other">Other</option>
                </select>


                <input
                    name='image'
                    type='file'
                    id='image'
                    accept='image/*'
                    className='input'
                    onChange={handleImageUpload} />

                <input
                    type="text"
                    name="location"
                    placeholder="Location"
                    required
                    className="w-full p-3 border rounded-lg"
                />

                <button
                    type="submit"
                    className="w-full bg-emerald-500 text-white py-3 rounded-lg font-semibold"
                >
                    Submit Issue
                </button>

            </form>
        </div>
    )
}

export default ReportIssue

