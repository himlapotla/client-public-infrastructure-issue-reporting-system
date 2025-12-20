import React, { useEffect, useState } from "react";
import axios from "axios";
import IssueCard from "./IssueCard";

const Issue = () => {
  const [reports, setReports] = useState([])
  const [loading, setLoading] = useState(true)

  const [search, setSearch] = useState("")
  const [status, setStatus] = useState("all")
  const [priority, setPriority] = useState("all")
  const [category, setCategory] = useState("all")
  const [currentPage, setCurrentPage] = useState(1)
  const [totalPages, setTotalPages] = useState(1)

  const limit = 6

  const fetchReports = async () => {
    setLoading(true);

    const res = await axios.get(
      `${import.meta.env.VITE_API_URL}/reports`,
      {
        params: {
          search,
          status,
          priority,
          category,
          page: currentPage,
          limit
        }
      }
    );

    setReports(res.data.reports);
    setTotalPages(res.data.totalPages);
    setLoading(false);
  }

  useEffect(() => {
    setCurrentPage(1);
  }, [search, status, priority, category])

  useEffect(() => {
    fetchReports();
  }, [search, status, priority, category, currentPage])

  useEffect(() => {
    fetchReports();
  }, [search, status, priority, category])


  if (loading) {
    return <p className="text-center mt-10">Loading...</p>;
  }

  if (reports.length === 0) {
    return <p className="text-center mt-10">No issues found</p>;
  }

  return (

    <div>
      <div className="w-7/12 relative mx-auto mb-6 grid gap-4 md:grid-cols-4">

        <input
          type="text"
          placeholder="Search by title, category, location"
          className="input input-bordered w-full"
          value={search}
          onChange={e => setSearch(e.target.value)}
        />

        <select
          className="select select-bordered"
          value={status}
          onChange={e => setStatus(e.target.value)}
        >
          <option value="all">All Status</option>
          <option value="pending">Pending</option>
          <option value="in-progress">In Progress</option>
          <option value="resolved">Resolved</option>
        </select>

        <select
          className="select select-bordered"
          value={priority}
          onChange={e => setPriority(e.target.value)}
        >
          <option value="all">All Priority</option>
          <option value="normal">Normal</option>
          <option value="high">High</option>
        </select>

        <select
          className="select select-bordered"
          value={category}
          onChange={e => setCategory(e.target.value)}
        >
          <option value="all">All Category</option>
          <option value="Road">Road</option>
          <option value="Electricity">Electricity</option>
          <option value="Water">Water</option>
          <option value="Garbage">Garbage</option>
          <option value="Public Transport">Public Transport</option>

        </select>

      </div>

      <div className="w-11/12 mx-auto grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {reports.map(report => (
          <IssueCard key={report._id} report={report} />
        ))}
      </div>

      <div className="flex justify-center items-center gap-2 mt-10">

        <button
          disabled={currentPage === 1}
          onClick={() => setCurrentPage(prev => prev - 1)}
          className="btn btn-sm"
        >
          Prev
        </button>

        {[...Array(totalPages).keys()].map(num => (
          <button
            key={num}
            onClick={() => setCurrentPage(num + 1)}
            className={`btn btn-sm ${currentPage === num + 1 ? 'btn-primary' : ''
              }`}
          >
            {num + 1}
          </button>
        ))}

        <button
          disabled={currentPage === totalPages}
          onClick={() => setCurrentPage(prev => prev + 1)}
          className="btn btn-sm"
        >
          Next
        </button>
      </div>

    </div>
  )
}

export default Issue
