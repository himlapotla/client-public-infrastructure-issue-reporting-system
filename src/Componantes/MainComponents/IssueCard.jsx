import React, { useContext, useState } from "react";
import Upvote from "../UserPages/Upvote";
import PrivateRoute from "../Provider/PrivateRoute";
import { AllContext } from "../Provider/AuthProvider";
import { toast } from "react-toastify";
import axios from "axios";
import { Link, useNavigate } from "react-router";

const IssueCard = ({ report }) => {
    const { user } = useContext(AllContext)
    const [upvotes, setUpvotes] = useState(report.upvoteCount)
    const navigate = useNavigate()
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
            toast.success("Upvoted successfil.")
        }
        catch (err) {
            console.log(err.message);

            toast.error(err.response?.data?.message || "Upvote failed")
        }
    }

    return (
        <div className="group rounded-2xl border border-gray-200 bg-white p-5 shadow-sm transition hover:shadow-xl dark:border-gray-700 dark:bg-gray-900 space-y-4">

            {image && (
                <div className="overflow-hidden rounded-xl">
                    <img
                        src={image}
                        alt="Issue"
                        className="h-56 w-full object-cover transition-transform duration-500 group-hover:scale-110"
                    />
                </div>
            )}

            <div>
                <h2 className="text-lg font-bold text-gray-800 dark:text-white">
                    {title}
                </h2>
                <p className="mt-1 text-sm text-gray-600 dark:text-gray-400 line-clamp-2">
                    {description}
                </p>
            </div>

            <div className="space-y-2 text-sm">

                <p>
                    <span className="font-semibold text-gray-700 dark:text-gray-300">
                        Category :
                    </span>{" "}
                    <span className="rounded-md bg-blue-100 px-2 py-0.5 text-blue-700">
                        {category}
                    </span>
                </p>

                <p>
                    <span className="font-semibold text-gray-700 dark:text-gray-300">
                        Location :
                    </span>{" "}
                    <span className="rounded-md bg-purple-100 px-2 py-0.5 text-purple-700">
                        {location}
                    </span>
                </p>

                <p>
                    <span className="font-semibold text-gray-700 dark:text-gray-300">
                        Priority :
                    </span>{" "}
                    <span className="rounded-md bg-yellow-100 px-2 py-0.5 text-yellow-700">
                        {priority}
                    </span>
                </p>

                <p>
                    <span className="font-semibold text-gray-700 dark:text-gray-300">
                        Status :
                    </span>{" "}
                    <span className="rounded-md bg-red-100 px-2 py-0.5 text-red-700">
                        {status}
                    </span>
                </p>

            </div>

            <div className="h-px bg-gray-200 dark:bg-gray-700" />

            <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                    <button
                        onClick={handleUpvote}
                        className="rounded-full bg-amber-500 px-4 py-1.5 text-sm font-semibold text-white transition hover:bg-amber-600"
                    >
                        Upvote
                    </button>
                    <span className="text-lg font-bold text-green-600">
                        {upvotes}
                    </span>
                </div>

                <Link to={`/issueDetails/${report._id}?value=${upvotes}`}>
                    <button className="rounded-lg bg-emerald-500 px-4 py-2 text-sm font-semibold text-white transition cursor-pointer">
                        View Details
                    </button>
                </Link>
            </div>
        </div>
    );


}

export default IssueCard
