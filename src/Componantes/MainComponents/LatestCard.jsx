import { Link } from "react-router"

const LatestCard = ({ issue }) => {
  return (
    <div className="bg-white rounded-xl shadow p-5 flex flex-col justify-between">
      <div>
        <h3 className="text-lg font-semibold mb-2">
          {issue.title}
        </h3>

        <p className="text-sm text-gray-600 mb-3 line-clamp-2">
          {issue.description}
        </p>

        <div className="flex items-center gap-2 text-sm">
          <span className="px-2 py-1 rounded bg-green-100 text-green-700">
            {issue.status}
          </span>

          <span className="px-2 py-1 rounded bg-blue-100 text-blue-700">
            {issue.priority}
          </span>
        </div>
      </div>

      <Link
        to={`/issueDetails/${issue._id}`}
        className="mt-4 text-center bg-teal-500 text-white py-2 rounded hover:bg-teal-600"
      >
        View Details
      </Link>
    </div>
  )
}

export default LatestCard