import React, { useContext, useEffect, useState } from 'react'
import axios from 'axios'
import { toast } from 'react-toastify';
import { useNavigate, useParams } from 'react-router';
import { AllContext } from '../Provider/AuthProvider';


const Edit = () => {

    const [imageURL, setImageURL] = useState("")
    const navigate = useNavigate()
    const { user } = useContext(AllContext)
    const [report, setReport] = useState(null)
    const [loading, setLoading] = useState(true)
    const { id } = useParams()

    useEffect(() => {
        const fetchReport = async () => {
            try {
                setLoading(true);
                const res = await axios.get(`${import.meta.env.VITE_API_URL}/reports/${id}`);
                setReport(res.data);
            } catch (err) {
                console.error(err);
                setError("Failed to fetch report");
            } finally {
                setLoading(false);
            }
        }

        fetchReport();
    }, [id])

    console.log(report);


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

    const handleSubmit = async (e) => {
        e.preventDefault()

        const title = e.target.title.value
        const description = e.target.description.value
        const category = e.target.category.value
        const location = e.target.location.value

        const updatedReport = {
            title,
            description,
            category,
            image: imageURL,
            location,
            email: user?.email,
        }

        try {
            await axios.put(`${import.meta.env.VITE_API_URL}/reports/${id}`, updatedReport);
            toast.success("Report updated successfully.");
            navigate('/dashboard/All-my-issues');
        } catch (err) {
            console.error(err);
            toast.error(err.response?.data?.message || "Failed to update report.");
        }
    }

    if (!user) return <p> loading </p>
    if (loading) return <p> loading </p>

    return (
        <div>
            <form onSubmit={handleSubmit} className="space-y-4 w-4/12 mx-auto ">

                <input
                    type="text"
                    name="title"
                    placeholder="Issue title"
                    required
                    className="w-full p-3 border rounded-lg"
                    defaultValue={report.title}
                />

                <textarea
                    name="description"
                    placeholder="Describe the issue"
                    rows="4"
                    required
                    className="w-full p-3 border rounded-lg"
                    defaultValue={report.description}
                />

                <select
                    name="category"
                    required
                    className="w-full p-3 border rounded-lg"
                    defaultValue={report.category}
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
                    // defaultValue={report.image}
                    onChange={handleImageUpload} />

                <input
                    type="text"
                    name="location"
                    placeholder="Location"
                    required
                    className="w-full p-3 border rounded-lg"
                    defaultValue={report.location}
                />

                <button
                    type="submit"
                    className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-lg font-semibold"
                >
                    Submit Issue
                </button>

            </form>
        </div>
    )
}

export default Edit