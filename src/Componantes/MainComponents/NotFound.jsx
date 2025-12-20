import React from 'react'
import { Link } from 'react-router';

const NotFound = () => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 text-center">
      <h1 className="text-7xl font-bold text-red-500 mb-4">404</h1>

      <h2 className="text-2xl font-semibold mb-2">
        Page Not Found
      </h2>

      <Link
        to="/"
        className="px-6 py-3 bg-emerald-500 text-white rounded-lg hover:bg-emerald-600 transition"
      >
        Go Back Home
      </Link>
    </div>
  );
}

export default NotFound