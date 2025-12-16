import { Link, useNavigate, useParams } from "react-router";
import { useContext, useEffect, useState } from "react";
import axios from "axios";
import { AllContext } from "../Provider/AuthProvider";
import { toast } from "react-toastify";
import Timeline from "./Timeline";

import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import CheckoutForm from "./CheckoutForm";

const stripePromise = loadStripe(
    import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY
);

const IssueDetails = () => {
    const { id } = useParams()
    const { user } = useContext(AllContext)
    const navigate = useNavigate()

    const [issue, setIssue] = useState(null)
    const [clientSecret, setClientSecret] = useState(null)
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        axios
            .get(`${import.meta.env.VITE_API_URL}/reports/${id}`)
            .then((res) => {
                setIssue(res.data);
                setLoading(false);
            })
            .catch(() => {
                toast.error("Failed to load issue");
                setLoading(false);
            });
    }, [id]);

    const handleDelete = async () => {
        const confirm = window.confirm("Are you sure you want to delete this report?");
        if (!confirm) return;

        try {
            await axios.delete(`${import.meta.env.VITE_API_URL}/reports/${id}`);
            toast.success("Report deleted successfully.");
            navigate('/allIssues');
        }
        catch (err) {
            console.error(err);
            toast.error(err.response?.data?.message || "Failed to delete report.");
        }
    }

    const handleBoost = async () => {
        try {
            const res = await axios.post(
                `${import.meta.env.VITE_API_URL}/create-payment-intent`,
                { issueId: issue._id }
            );

            setClientSecret(res.data.clientSecret);
        }
        catch (err) {
            console.log("BOOST ERROR 👉", err.response?.data || err.message);
            toast.error(err.response?.data?.message || "Boost failed");
        }
    };

    if (loading) return <p className="text-center mt-10">Loading...</p>;
    if (!issue) return <p className="text-center mt-10">Issue not found</p>;

    const isOwner = user && issue.email === user.email;

    return (
        <div className="max-w-4xl mx-auto p-6 space-y-6">

            <div className="bg-white dark:bg-gray-900 p-6 rounded-xl shadow">
                {issue.image && (
                    <img
                        src={issue.image}
                        alt="Issue"
                        className="rounded-lg mb-4 w-full h-74 object-cover"
                    />
                )}

                <h1 className="text-2xl font-bold"> {issue.title} </h1>
                <p className="text-gray-600 dark:text-gray-400 mt-2">
                    {issue.description}
                </p>

                <div className="flex gap-3 mt-4 flex-wrap">
                    <span className="badge">{issue.category}</span>
                    <span className="badge bg-yellow-100 text-yellow-800">
                        {issue.priority}
                    </span>
                    <span className="badge bg-red-100 text-red-800">
                        {issue.status}
                    </span>
                </div>
            </div>

            <div className="flex flex-wrap gap-3 bg-white dark:bg-gray-900 p-6 rounded-xl shadow">

                {(isOwner && issue.status === "pending") ? (
                    <Link to={`/edit/${id}`}> <button className="btn">Edit</button> </Link>
                ) : <button disabled className="btn"> Edit </button>}

                {isOwner ? (
                    <button onClick={handleDelete} className="btn bg-red-600 text-white">Delete</button>
                ) : <button disabled className="btn"> Delete </button>}

                {isOwner && issue.priority !== "high" ? (
                    <button
                        onClick={handleBoost}
                        className="btn bg-green-600 text-white"
                    >
                        Boost Issue (100tk)
                    </button>
                ) : <button disabled className="btn"> Boost Issue (100tk) </button>}
            </div>

            {clientSecret && (
                <Elements stripe={stripePromise}>
                    <CheckoutForm
                        issueId={issue._id}
                        clientSecret={clientSecret}
                        onSuccess={() => {
                            toast.success("Issue boosted successfully!");
                            setIssue(prev => ({ ...prev, priority: "high" }));
                            setClientSecret(null);
                        }}
                    />
                </Elements>
            )}



            <div className="bg-white dark:bg-gray-900 p-6 rounded-xl shadow">
                <p className="font-bold mb-2">Assigned Staff</p>
                {issue.staff ? (
                    <div className="bg-blue-50 p-4 rounded">
                        <p className="font-semibold">{issue.staff.name}</p>
                    </div>
                ) : (
                    <p className="text-gray-500">Staff will be assigned soon</p>
                )}
            </div>


            <div className="">
                <Timeline timeline={issue.timeline} />
            </div>

        </div>
    )
}

export default IssueDetails;
