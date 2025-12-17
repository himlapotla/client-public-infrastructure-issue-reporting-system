import axios from 'axios'
import Swal from 'sweetalert2'
import { useEffect, useState } from 'react'

const AllIssue = () => {
    const [reports, setReports] = useState([])
    const [staffList, setStaffList] = useState([])
    const [selectedIssue, setSelectedIssue] = useState(null)
    const [selectedStaff, setSelectedStaff] = useState('')

    useEffect(() => {
        fetchReports()
        fetchStaff()
    }, [])

    const fetchReports = async () => {
        const res = await axios.get(`${import.meta.env.VITE_API_URL}/reports`)
        setReports(res.data)
    }

    const fetchStaff = async () => {
        const res = await axios.get(`${import.meta.env.VITE_API_URL}/staff`)
        setStaffList(res.data)
    }

    const assignStaff = async () => {
        await axios.patch(
            `${import.meta.env.VITE_API_URL}/assign-staff/${selectedIssue._id}`,
            { staff: selectedStaff }
        )
        Swal.fire('Assigned!', 'Staff assigned successfully', 'success')
        setSelectedIssue(null)
        fetchReports()
    }

    const handleDelete = async (id) => {
        const result = await Swal.fire({
            title: 'Are you sure?',
            text: 'This issue will be permanently deleted!',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#d33',
            cancelButtonColor: '#3085d6',
            confirmButtonText: 'Yes, delete it!'
        })

        if (!result.isConfirmed) return

        try {
            await axios.delete(
                `${import.meta.env.VITE_API_URL}/reports/${id}`
            )

            setReports(prev => prev.filter(report => report._id !== id))

            Swal.fire({
                icon: 'success',
                title: 'Deleted!',
                text: 'Issue has been deleted.',
                timer: 1500,
                showConfirmButton: false
            })

        } catch (error) {
            Swal.fire({
                icon: 'error',
                title: 'Error',
                text: 'Failed to delete issue'
            })
        }
    }

    return (
        <>
            <div className="overflow-x-auto rounded-xl ">
                <table className="min-w-full text-sm text-left">
                    <thead className=" text-gray-900 uppercase text-xs">
                        <tr>
                            <th className="px-6 py-3">Title</th>
                            <th className="px-6 py-3">Category</th>
                            <th className="px-6 py-3">Status</th>
                            <th className="px-6 py-3">Priority</th>
                            <th className="px-6 py-3">Assigned Staff</th>
                            <th className="px-6 py-3 text-center">Action</th>
                        </tr>
                    </thead>

                    <tbody>
                        {reports.map((report) => (
                            <tr
                                key={report._id}
                                className=""
                            >
                                <td className="px-6 py-4 font-medium text-gray-900">
                                    {report.title}
                                </td>

                                <td className="px-6 py-4">{report.category}</td>

                                <td className="px-6 py-4">
                                    <span
                                        className={`px-3 py-1 rounded-full text-xs font-semibold
                                                 ${report.status === 'pending'
                                                ? 'bg-yellow-100 text-yellow-700'
                                                : report.status === 'rejected'
                                                    ? 'bg-red-100 text-red-700'
                                                    : 'bg-green-100 text-green-700'}`}
                                    >
                                        {report.status}
                                    </span>
                                </td>

                                <td className="px-6 py-4">
                                    <span
                                        className={`px-3 py-1 rounded-full text-xs font-semibold
                                                  ${report.priority === 'high'
                                                ? 'bg-purple-100 text-purple-700'
                                                : 'bg-blue-100 text-blue-700'}`}
                                    >
                                        {report.priority}
                                    </span>
                                </td>

                                <td className="px-6 py-4">
                                    {report.staff ? (
                                        <span className="text-green-700 font-semibold">
                                            {report.staff.name}
                                        </span>
                                    ) : (
                                        <span className="text-gray-400 italic">
                                            Not Assigned
                                        </span>
                                    )}
                                </td>

                                <td className="px-6 py-4 text-center space-x-2">
                                    {!report.staff && (
                                        <button
                                            onClick={() => setSelectedIssue(report)}
                                            className="px-4 py-1.5 rounded-lg bg-indigo-500 text-white text-xs font-semibold hover:bg-indigo-600 transition"
                                        >
                                            Assign
                                        </button>
                                    )}

                                    {report.status === 'pending' && (
                                        <button
                                            onClick={() => handleDelete(report._id)}
                                            className="px-4 py-1.5 rounded-lg bg-red-500 text-white text-xs font-semibold hover:bg-red-600 transition"
                                        >
                                            Reject
                                        </button>
                                    )}
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {selectedIssue && (
                <div className="fixed inset-0  bg-opacity-40 flex items-center justify-center z-50">
                    <div className="bg-white rounded-xl p-6 w-96 shadow-lg animate-fadeIn">
                        <h3 className="text-lg font-semibold mb-4 ">
                            Assign Staff
                        </h3>

                        <select
                            className="w-full border rounded-lg px-3 py-2 mb-4 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                            onChange={(e) =>
                                setSelectedStaff(
                                    staffList.find((s) => s._id === e.target.value)
                                )
                            }
                        >
                            <option value="">Select Staff</option>
                            {staffList.map((staff) => (
                                <option key={staff._id} value={staff._id}>
                                    {staff.name}
                                </option>
                            ))}
                        </select>

                        <div className="flex justify-end gap-3">
                            <button
                                onClick={() => setSelectedIssue(null)}
                                className="px-4 py-2 rounded-lg bg-gray-200 hover:bg-gray-300 text-sm"
                            >
                                Cancel
                            </button>

                            <button
                                onClick={assignStaff}
                                className="px-4 py-2 rounded-lg bg-indigo-600 text-white hover:bg-indigo-700 text-sm"
                            >
                                Confirm
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </>

    )
}

export default AllIssue
