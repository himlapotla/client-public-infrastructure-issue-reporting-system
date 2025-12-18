import {
  MapPin,
  Clock,
  ShieldCheck,
  TrendingUp,
  Users,
  CreditCard,
} from "lucide-react";

import React from 'react'

const features = [
  {
    icon: <MapPin size={32} />,
    title: "Location-Based Issue Reporting",
    description:
      "Citizens can report real-world problems with exact location and images for faster verification.",
  },
  {
    icon: <Clock size={32} />,
    title: "Real-Time Status Tracking",
    description:
      "Track issues from Pending to Closed with a transparent timeline and progress updates.",
  },
  {
    icon: <Users size={32} />,
    title: "Role-Based Management",
    description:
      "Dedicated dashboards for Admin, Staff, and Citizens ensure smooth collaboration.",
  },
  {
    icon: <TrendingUp size={32} />,
    title: "Priority Boost System",
    description:
      "Boost critical issues with payment to get faster attention from authorities.",
  },
  {
    icon: <ShieldCheck size={32} />,
    title: "Secure & Reliable",
    description:
      "Authentication, protected routes, and role permissions keep the system safe.",
  },
  {
    icon: <CreditCard size={32} />,
    title: "Premium Subscription",
    description:
      "Premium citizens enjoy unlimited issue reporting and priority support.",
  },
];

const Features = () => {
 return (
    <section className="py-20 rounded-2xl">
      <div className="max-w-7xl mx-auto px-6">
        <h2 className="text-3xl font-bold text-center mb-12">
          Powerful Features for Smarter Cities
        </h2>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <div
              key={index}
              className="bg-white rounded-2xl p-6 shadow hover:shadow-lg transition"
            >
              <div className="text-emerald-600 mb-4">
                {feature.icon}
              </div>
              <h3 className="text-xl font-semibold mb-2">
                {feature.title}
              </h3>
              <p className="text-gray-600 text-sm">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default Features