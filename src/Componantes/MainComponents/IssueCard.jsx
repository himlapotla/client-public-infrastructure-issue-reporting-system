import React, { useContext, useState } from "react";
import Upvote from "../UserPages/Upvote";
import PrivateRoute from "../Provider/PrivateRoute";
import { AllContext } from "../Provider/AuthProvider";
import { toast } from "react-toastify";
import axios from "axios";

const IssueCard = ({ report }) => {
    const { user } = useContext(AllContext)
    const [upvotes, setUpvotes] = useState(report.upvoteCount)
    const {
        title,
        description,
        category,
        image,
        location,
        status,
        priority,
        upvoteCount,
    } = report

    const handleUpvote = async () => {

        if (!user) {
            return navigate("/login")
        }

        try {
            await axios.put(
                `${import.meta.env.VITE_API_URL}/reports/upvote/${report._id}`,
                { userEmail: user.email }
            )

            setUpvotes(prev => prev + 1)
            toast.success("Upvoted!")
        } 
        catch (err) {
            console.log(err.message);
            
            toast.error(err.response?.data?.message || "Upvote failed")
        }
    };


    return (
        <div className="rounded-xl border p-4 shadow-sm dark:border-gray-700">

            {/* Image */}
            {image && (
                <img
                    src={image}
                    alt="Issue"
                    className="h-40 w-full rounded-lg object-cover"
                />
            )}

            {/* Content */}
            <div className="mt-3 space-y-2">
                <h2 className="text-lg font-bold">{title}</h2>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                    {description}
                </p>

            </div>

            <div className="grid grid-cols-2 gap-y-1 gap-x-3 text-sm leading-tight">
                <span className="font-medium text-gray-600">Category</span>
                <span className="w-fit rounded bg-blue-100 px-2 py-0.5 text-blue-700">
                    {category}
                </span>

                <span className="font-medium text-gray-600">Location</span>
                <span className="w-fit rounded bg-purple-100 px-2 py-0.5 text-purple-700">
                    {location}
                </span>

                <span className="font-medium text-gray-600">Priority</span>
                <span className="w-fit rounded bg-yellow-100 px-2 py-0.5 text-yellow-700">
                    {priority}
                </span>

                <span className="font-medium text-gray-600">Status</span>
                <span className="w-fit rounded bg-red-100 px-2 py-0.5 text-red-700">
                    {status}
                </span>
            </div>



            {/* Footer */}
            <div className="flex items-center justify-between pt-3">
                <span className="text-sm font-medium">
                    {
                        user ? <button onClick={handleUpvote} className="btn"> upvote </button> : <button className="disabled:"> upvote </button>
                    } {upvotes}
                </span>

                <button className="rounded bg-blue-600 px-3 py-1.5 text-sm text-white hover:bg-blue-700">
                    View Details
                </button>
            </div>
        </div>
    )
}

export default IssueCard
