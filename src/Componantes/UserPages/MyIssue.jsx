import axios from 'axios'
import React, { useContext, useEffect, useState } from 'react'
import { AllContext } from '../Provider/AuthProvider'
import { Link } from 'react-router'

const MyIssue = () => {

  const [reports, setReports] = useState([])
  const [loading, setLoading] = useState(false)
  const { user } = useContext(AllContext)

  const handleDelete = async (id) => {
    await axios.delete(`/reports/${id}`)
    refetch()
  }


  useEffect(() => {
    if (!user?.email) return

    const fetchMyReports = async () => {
      try {
        setLoading(true)

        const res = await axios.get(
          `${import.meta.env.VITE_API_URL}/my-reports?email=${user.email}`
        )
        const data = Array.isArray(res.data) ? res.data : []
        setReports(data)

      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }

    }

    fetchMyReports()

  }, [user?.email,])

  return (
    <div>
      <table className="table">
        <thead>
          <tr>
            <th>Title</th>
            <th>Category</th>
            <th>Status</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {reports.map(report => (
            <tr key={report._id}>
              <td>{report.title}</td>
              <td>{report.category}</td>
              <td>{report.status}</td>
              <td className="flex gap-2">
                {report.status === 'pending' && (
                  <button
                    className="btn btn-xs btn-warning"
                    onClick={() => openEditModal(report)}
                  >
                    Edit
                  </button>
                )}

                <button
                  className="btn btn-xs btn-error"
                  onClick={() => handleDelete(report._id)}
                >
                  Delete
                </button>

                <Link
                  to={`/reports/${report._id}`}
                  className="btn btn-xs btn-info"
                >
                  View
                </Link>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

    </div>
  )
}

export default MyIssue