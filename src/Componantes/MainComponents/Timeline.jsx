import React from 'react'

const Timeline = ({ timeline }) => {
  return (
    <div className="bg-white p-6 rounded-xl shadow-lg">
      <h2 className="text-xl font-bold mb-4">Issue Timeline</h2>

      <div className="border-l-2 pl-4 space-y-4">
        {[...timeline].reverse().map((item, index) => (
          <div key={index} className="relative">
            <span className="absolute -left-3 w-3 h-3 bg-blue-500 rounded-full"></span>

            <p className="font-semibold">{item.status}</p>
            <p className="text-sm">{item.message}</p>
            <p className="text-xs text-gray-500">
              {item.updatedBy} - {new Date(item.date).toLocaleString()}
            </p>
          </div>
        ))}
      </div>
    </div>
  )
}

export default Timeline


