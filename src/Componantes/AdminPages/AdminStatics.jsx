import { useContext, useEffect, useState } from "react";
import { AllContext } from "../Provider/AuthProvider";
import axios from "axios";

const AdminStatics = () => {
    const { user, role } = useContext(AllContext)
    const [stats, setStats] = useState({});
    const [loading, setLoading] = useState(true);

    // if(!role) {
    //     setStats({})
    // }
    useEffect(() => {
        if (!user?.email || !role) return

        setStats({});
        setLoading(true)

        let url = "";

        if (role === "admin") {
            url = `${import.meta.env.VITE_API_URL}/stats/admin`;
        } else if (role === "citizen") {
            url = `${import.meta.env.VITE_API_URL}/stats/citizen/${user.email}`;
        } else {
            url = `${import.meta.env.VITE_API_URL}/stats/staff/${user.email}`
        }

        axios
            .get(url)
            .then((res) => {
                setStats(res.data);
                setLoading(false);
                
            })
            .catch((error) => {
                console.error(error);
                setLoading(false);
            });

    }, [user?.email, role]);


    if (loading) {
        return <p className="text-center text-lg">Loadiiiing stats...</p>;
    }


    // return (
    //     <div className="grid grid-cols-1 md:grid-cols-3 gap-6">

    //         {role !== "staff" && (
    //             <>
    //                 <div className="rounded-xl bg-white p-6 shadow border">
    //                     <h3 className="text-sm text-gray-500">Total Issues Submitted</h3>
    //                     <p className="mt-2 text-3xl font-bold text-blue-600">
    //                         {stats.totalIssues || 0}
    //                     </p>
    //                 </div>

    //                 <div className="rounded-xl bg-white p-6 shadow border">
    //                     <h3 className="text-sm text-gray-500">Pending Issues</h3>
    //                     <p className="mt-2 text-3xl font-bold text-yellow-500">
    //                         {stats.pendingIssues || 0}
    //                     </p>
    //                 </div>

    //                 <div className="rounded-xl bg-white p-6 shadow border">
    //                     <h3 className="text-sm text-gray-500">In Progress Issues</h3>
    //                     <p className="mt-2 text-3xl font-bold text-indigo-600">
    //                         {stats.inProgressIssues || 0}
    //                     </p>
    //                 </div>

    //                 <div className="rounded-xl bg-white p-6 shadow border">
    //                     <h3 className="text-sm text-gray-500">Resolved Issues</h3>
    //                     <p className="mt-2 text-3xl font-bold text-green-600">
    //                         {stats.resolvedIssues || 0}
    //                     </p>
    //                 </div>
    //             </>
    //         )}

    //         {role === "staff" && (
    //             <>
    //                 <div className="rounded-xl bg-white p-6 shadow border">
    //                     <h3 className="text-sm text-gray-500">Assigned Issues</h3>
    //                     <p className="mt-2 text-3xl font-bold text-blue-600">
    //                         {stats.assignedIssues || 0}
    //                     </p>
    //                 </div>

    //                 <div className="rounded-xl bg-white p-6 shadow border">
    //                     <h3 className="text-sm text-gray-500">Resolved Issues</h3>
    //                     <p className="mt-2 text-3xl font-bold text-green-600">
    //                         {stats.resolvedIssues || 0}
    //                     </p>
    //                 </div>

    //                 <div className="rounded-xl bg-white p-6 shadow border">
    //                     <h3 className="text-sm text-gray-500">Today’s Tasks</h3>
    //                     <p className="mt-2 text-3xl font-bold text-indigo-600">
    //                         {stats.todaysTasks || 0}
    //                     </p>
    //                 </div>
    //             </>
    //         )}

    //     </div>
    // )

    if (role == 'citizen') {
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
            </div>
        )
    }

    else if (role == 'admin') {
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
            </div>
        )
    }

    else if (role == 'staff') {

        return (
            <div className="flex gap-3">
                <div className="rounded-xl flex-1 bg-white p-6 shadow border">
                    <h3 className="text-sm text-gray-500">Assigned Issues</h3>
                    <p className="mt-2 text-3xl font-bold text-blue-600">
                        {stats.assignedIssues || 0}
                    </p>
                </div>

                <div className="rounded-xl flex-1 bg-white p-6 shadow border">
                    <h3 className="text-sm text-gray-500">Resolved Issues</h3>
                    <p className="mt-2 text-3xl font-bold text-green-600">
                        {stats.resolvedIssues || 0}
                    </p>
                </div>

                <div className="rounded-xl flex-1 bg-white p-6 shadow border">
                    <h3 className="text-sm text-gray-500">Today’s Tasks</h3>
                    <p className="mt-2 text-3xl font-bold text-indigo-600">
                        {stats.todaysTasks || 0}
                    </p>
                </div>
            </div>
        )
    }
}
export default AdminStatics;
