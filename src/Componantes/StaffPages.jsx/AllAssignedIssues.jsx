import axios from "axios"
import { useContext, useEffect, useState } from "react"
import { AllContext } from "../Provider/AuthProvider"
import StatusDropdown from "./StatusDropdown"

const AllAssignedIssues = () => {
    const { user, loading } = useContext(AllContext)
    const [reports, setReports] = useState([])
    const [filterStatus, setFilterStatus] = useState("")
    // const { loading, setloading } = useState(true)
    const API = import.meta.env.VITE_API_URL



    useEffect(() => {
        if (user) {
            fetchAssignedReports()
        }
    }, [user])

    const fetchAssignedReports = async () => {
        const res = await axios.get(
            `${API}/staff-reports/${user?.email}`
        )

        const sorted = res.data.sort((a, b) =>
            a.priority === "boosted" ? -1 : 1
        )

        setReports(sorted)
    }

    const changeStatus = async (id, newStatus) => {
        await axios.patch(`${API}/reports/status/${id}`, {
            status: newStatus,
            updatedBy: user.email
        })

        setReports(prev =>
            prev.map(item =>
                item._id === id ? { ...item, status: newStatus } : item
            )
        )
    }

    const filteredReports = filterStatus
        ? reports.filter(r => r.status === filterStatus)
        : reports;

    return (
        <div>

            <select onChange={e => setFilterStatus(e.target.value)}>
                <option value="">All Status</option>
                <option value="pending">Pending</option>
                <option value="in-progress">In Progress</option>
                <option value="working">Working</option>
                <option value="resolved">Resolved</option>
                <option value="closed">Closed</option>
            </select>

            <div className="p-4">
                <h2 className="text-2xl font-bold mb-4">Assigned Issues</h2>

                <div className="overflow-x-auto">
                    <table className="min-w-full divide-y shadow-md rounded-lg overflow-hidden">
                        <thead className="">
                            <tr>
                                <th className="px-6 py-3 text-left text-xs font-medium text-black-700 uppercase tracking-wider">
                                    Title
                                </th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-black-700 uppercase tracking-wider">
                                    Priority
                                </th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-black-700 uppercase tracking-wider">
                                    Status
                                </th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-black-700 uppercase tracking-wider">
                                    Change Status
                                </th>
                            </tr>
                        </thead>

                        <tbody className=" divide-gray-200">
                            {filteredReports.length === 0 ? (
                                <tr>
                                    <td colSpan="4" className="px-6 py-4 text-center text-gray-500">
                                        No assigned issues
                                    </td>
                                </tr>
                            ) : (
                                filteredReports.map((report) => (
                                    <tr key={report._id} className="">
                                        <td className="px-6 py-4 whitespace-nowrap font-medium text-gray-900">
                                            {report.title}
                                        </td>

                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <span
                                                className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${report.priority === "boosted"
                                                    ? "bg-yellow-100 text-yellow-800"
                                                    : "bg-gray-100 text-gray-800"
                                                    }`}
                                            >
                                                {report.priority}
                                            </span>
                                        </td>

                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <span
                                                className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${report.status === "pending"
                                                    ? "bg-gray-100 text-gray-800"
                                                    : report.status === "in-progress"
                                                        ? "bg-blue-100 text-blue-800"
                                                        : report.status === "working"
                                                            ? "bg-indigo-100 text-indigo-800"
                                                            : report.status === "resolved"
                                                                ? "bg-green-100 text-green-800"
                                                                : "bg-gray-200 text-gray-700"
                                                    }`}
                                            >
                                                {report.status}
                                            </span>
                                        </td>

                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <StatusDropdown report={report} changeStatus={changeStatus} />
                                        </td>
                                    </tr>
                                ))
                            )}
                        </tbody>
                    </table>
                </div>
            </div>

        </div>
    )
}

export default AllAssignedIssues