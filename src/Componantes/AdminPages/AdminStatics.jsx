import { useContext, useEffect, useState } from "react";
import { AllContext } from "../Provider/AuthProvider";
import axios from "axios";

const AdminStatics = () => {
    const { user } = useContext(AllContext)
    const [stats, setStats] = useState({});
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (!user?.email) return;

        setLoading(true);

        axios
            .get(`${import.meta.env.VITE_API_URL}/stats/admin`)
            .then((res) => {
                setStats(res.data);
                setLoading(false);
            })
            .catch((error) => {
                console.error(error);
                setLoading(false);
            });

    }, [user?.email]);


    if (loading) {
        return <p className="text-center text-lg">Loading stats...</p>;
    }

    return (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">

            <div className="rounded-xl bg-white p-6 shadow border">
                <h3 className="text-sm text-gray-500">Total Issues Submitted</h3>
                <p className="mt-2 text-3xl font-bold text-blue-600">
                    {stats.totalIssues || 0}
                </p>
            </div>

            <div className="rounded-xl bg-white p-6 shadow border">
                <h3 className="text-sm text-gray-500">Pending Issues</h3>
                <p className="mt-2 text-3xl font-bold text-yellow-500">
                    {stats.pendingIssues || 0}
                </p>
            </div>

            <div className="rounded-xl bg-white p-6 shadow border">
                <h3 className="text-sm text-gray-500">In Progress Issues</h3>
                <p className="mt-2 text-3xl font-bold text-indigo-600">
                    {stats.inProgressIssues || 0}
                </p>
            </div>

            <div className="rounded-xl bg-white p-6 shadow border">
                <h3 className="text-sm text-gray-500">Resolved Issues</h3>
                <p className="mt-2 text-3xl font-bold text-green-600">
                    {stats.resolvedIssues || 0}
                </p>
            </div>

            <div className="rounded-xl bg-white p-6 shadow border">
                <h3 className="text-sm text-gray-500">Total Payments</h3>
                <p className="mt-2 text-3xl font-bold text-emerald-600">
                    {stats.totalPayments || 0}
                </p>
            </div>

        </div>
    );
};

export default AdminStatics;
