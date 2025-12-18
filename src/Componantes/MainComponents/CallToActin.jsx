import React from 'react'
import { Link } from 'react-router'

const CallToActin = () => {
  return (
    <section className="py-20 mt-15 bg-emerald-600 text-white rounded-2xl">
      <div className="max-w-7xl mx-auto px-6 text-center">
        <h2 className="text-3xl font-bold mb-6">
          Be a Part of a Better City
        </h2>
        <p className="text-gray-300 mb-8 max-w-2xl mx-auto">
          Join thousands of citizens improving public infrastructure through
          transparent reporting and smart collaboration.
        </p>

        <Link
          to="/register"
          className="inline-block bg-white text-emerald-500 px-8 py-3 rounded-lg font-semibold "
        >
          Get Started Today
        </Link>
      </div>
    </section>
  )
}

export default CallToActin