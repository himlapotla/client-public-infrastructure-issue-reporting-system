import { useContext, useEffect, useState } from "react";
import axios from "axios";
import { AllContext } from "../Provider/AuthProvider";
import { useNavigate } from "react-router";
import EditModal from "./EditModal";

const MyIssue = () => {
    const { user } = useContext(AllContext);
    const navigate = useNavigate();
    const [issues, setIssues] = useState([]);
    const [selectedIssue, setSelectedIssue] = useState(null);
    const [filters, setFilters] = useState({ status: "", category: "" });

    const fetchIssues = async () => {
        const res = await axios.get(
            `${import.meta.env.VITE_API_URL}/my-reports`,
            { params: { email: user.email, ...filters } }
        );
        setIssues(res.data);
    };

    useEffect(() => {
        if (user?.email) fetchIssues();
    }, [user, filters]);

    const handleDelete = async (id) => {
        if (!confirm("Delete this issue?")) return;
        await axios.delete(`${import.meta.env.VITE_API_URL}/reports/${id}`);
        setIssues(prev => prev.filter(issue => issue._id !== id));
    };

    return (
        <div className="p-6">
            {/* Filters */}
            <div className="flex gap-4 mb-4">
                <select onChange={e => setFilters({ ...filters, status: e.target.value })}>
                    <option value="">All Status</option>
                    <option value="pending">Pending</option>
                    <option value="resolved">Resolved</option>
                </select>

                <select onChange={e => setFilters({ ...filters, category: e.target.value })}>
                    <option value="">All Category</option>
                    <option value="Road">Road</option>
                    <option value="Water">Water</option>
                    <option value="Electricity">Electricity</option>
                </select>
            </div>

            {/* Table */}
            <table className="w-full border">
                <thead>
                    <tr className="bg-gray-100">
                        <th>Title</th>
                        <th>Status</th>
                        <th>Category</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {issues.map(issue => (
                        <tr key={issue._id} className="border">
                            <td>{issue.title}</td>
                            <td>{issue.status}</td>
                            <td>{issue.category}</td>
                            <td className="flex gap-2">
                                {issue.status === "pending" && (
                                    <button onClick={() => setSelectedIssue(issue)} className="btn">
                                        Edit
                                    </button>
                                )}
                                <button
                                    onClick={() => handleDelete(issue._id)}
                                    className="btn bg-red-600 text-white"
                                >
                                    Delete
                                </button>
                                <button
                                    onClick={() => navigate(`/report/${issue._id}`)}
                                    className="btn bg-green-600 text-white"
                                >
                                    View
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>

            {selectedIssue && (
                <EditModal
                    issue={selectedIssue}
                    onClose={() => setSelectedIssue(null)}
                    onUpdate={(updated) => {
                        setIssues(prev =>
                            prev.map(i => i._id === updated._id ? updated : i)
                        );
                        setSelectedIssue(null);
                    }}
                />
            )}
        </div>
    );
};

export default MyIssue;
