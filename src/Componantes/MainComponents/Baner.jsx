import React from 'react'
import { Link } from 'react-router'

const Baner = () => {
  return (
    <section className="bg-gradient-to-r from-emerald-600  to-teal-500 text-white rounded-2xl">
      <div className="max-w-7xl mx-auto px-6 py-24 grid md:grid-cols-2 gap-12 items-center">
        
        {/* Left Content */}
        <div>
          <h1 className="text-4xl md:text-5xl font-bold leading-tight">
            Report. Track. <br /> Improve Your City.
          </h1>

          <p className="mt-6 text-lg text-emerald-100">
            A smart public infrastructure reporting system that connects
            citizens, staff, and administrators to solve city problems faster
            and transparently.
          </p>

          <div className="mt-8 flex flex-wrap gap-4">
            <Link
              to="/all-issues"
              className="bg-white text-emerald-600 px-6 py-3 rounded-lg font-semibold hover:bg-gray-100 transition"
            >
              View All Issues
            </Link>

            <Link
              to="/register"
              className="border border-white px-6 py-3 rounded-lg font-semibold hover:bg-white hover:text-emerald-600 transition"
            >
              Report an Issue
            </Link>
          </div>
        </div>

        {/* Right Visual */}
        <div className="relative">
          <img
            src="https://i.ibb.co.com/zTWJnbYW/imagesss.jpg"
            alt="City Infrastructure"
            className="rounded-2xl shadow-2xl"
          />

          <div className="absolute -bottom-8 -left-6 bg-white text-emerald-600 p-4 rounded-xl shadow-lg">
            <p className="font-bold text-lg">Transparent Tracking</p>
            <p className="text-sm">From report to resolution</p>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Baner