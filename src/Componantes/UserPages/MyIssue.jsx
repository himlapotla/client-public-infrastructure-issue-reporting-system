import axios from 'axios'
import React, { useContext, useEffect, useState } from 'react'
import { AllContext } from '../Provider/AuthProvider'
import { Link } from 'react-router'
import Swal from 'sweetalert2'

const MyIssue = () => {

  const [reports, setReports] = useState([])
  const [loading, setLoading] = useState(false)
  const { user } = useContext(AllContext)

  const [isOpen, setIsOpen] = useState(false)
  const [selectedReport, setSelectedReport] = useState(null)

  const [statusFilter, setStatusFilter] = useState('all')
  const [categoryFilter, setCategoryFilter] = useState('all')


  const openEditModal = (report) => {
    setSelectedReport(report)
    setIsOpen(true)
  }

  const closeModal = () => {
    setIsOpen(false)
    setSelectedReport(null)
  }

  const [formData, setFormData] = useState({
    title: '',
    category: '',
    description: ''
  })

  useEffect(() => {
    if (selectedReport) {
      setFormData({
        title: selectedReport.title,
        category: selectedReport.category,
        description: selectedReport.description
      })
    }
  }, [selectedReport])

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
  }

  const handleUpdate = async (e) => {
    e.preventDefault()

    try {
      const res = await axios.put(
        `${import.meta.env.VITE_API_URL}/reports/${selectedReport._id}`,
        formData
      )

      setReports(prev =>
        prev.map(report =>
          report._id === selectedReport._id
            ? { ...report, ...formData }
            : report
        )
      )
      closeModal()

    }
    catch (error) {
      console.error(error)
    }
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

  const filteredReports = reports.filter(report => {
    const statusMatch =
      statusFilter === 'all' || report.status === statusFilter

    const categoryMatch =
      categoryFilter === 'all' || report.category === categoryFilter

    return statusMatch && categoryMatch
  })


  return (
    <div>

      <div className="flex gap-4 mb-4">
        {/* Status Filter */}
        <select
          className="select select-bordered"
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
        >
          <option value="all">All Status</option>
          <option value="pending">Pending</option>
          <option value="in-progress">In Progress</option>
          <option value="resolved">Resolved</option>
        </select>

        {/* Category Filter */}
        <select
          className="select select-bordered"
          value={categoryFilter}
          onChange={(e) => setCategoryFilter(e.target.value)}
        >
          <option value="all">All Categories</option>
          <option value="road">Road</option>
          <option value="water">Water</option>
          <option value="electricity">Electricity</option>
          <option value="Public Transport">Public Transport</option>
          <option value="sanitation">Sanitation</option>
          <option value="Garbage"> Garbage </option>
        </select>

        {/* Reset Button */}
        <button
          className="btn"
          onClick={() => {
            setStatusFilter('all')
            setCategoryFilter('all')
          }}
        >
          Reset
        </button>
      </div>

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
          {filteredReports.length == 0 ? <p className='text-[22px] font-bold text-red-400'> No Reports Found </p> :
            filteredReports.map(report => (
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
                    to={`/issueDetails/${report._id}`}
                    className="btn btn-xs btn-info"
                  >
                    Viewww
                  </Link>
                </td>
              </tr>
            ))}
        </tbody>
      </table>

      {isOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center">
          <div className="bg-white p-5 rounded w-96">
            <h3 className="text-lg font-bold mb-3">Edit Issue</h3>

            <form onSubmit={handleUpdate} className="space-y-3">
              <input
                type="text"
                name="title"
                value={formData.title}
                onChange={handleChange}
                className="input input-bordered w-full"
                placeholder="Title"
              />

              <input
                type="text"
                name="category"
                value={formData.category}
                onChange={handleChange}
                className="input input-bordered w-full"
                placeholder="Category"
              />

              <textarea
                name="description"
                value={formData.description}
                onChange={handleChange}
                className="textarea textarea-bordered w-full"
                placeholder="Description"
              />

              <div className="flex justify-end gap-2">
                <button type="button" onClick={closeModal} className="btn btn-sm">
                  Cancel
                </button>
                <button type="submit" className="btn btn-sm btn-success">
                  Update
                </button>
              </div>
            </form>
          </div>
        </div>
      )}


    </div>
  )
}

export default MyIssue