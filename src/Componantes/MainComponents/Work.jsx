const steps = [
  {
    step: "01",
    title: "Report an Issue",
    description:
      "Citizens submit issues with details, photos, and location through the platform.",
  },
  {
    step: "02",
    title: "Admin Review & Assignment",
    description:
      "Admins verify reports and assign them to the appropriate staff members.",
  },
  {
    step: "03",
    title: "Staff Action & Updates",
    description:
      "Staff work on assigned issues and update progress in real-time.",
  },
  {
    step: "04",
    title: "Resolution & Closure",
    description:
      "Issues are resolved, closed, and permanently tracked for transparency.",
  },
];

const Work = () => {
  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-6">
        <h2 className="text-3xl font-bold text-center mb-16">
          How the System Works
        </h2>

        <div className="grid md:grid-cols-4 gap-8">
          {steps.map((item, index) => (
            <div
              key={index}
              className="text-center p-6 border rounded-xl hover:border-emerald-500 transition"
            >
              <div className="text-emerald-600 text-4xl font-bold mb-4">
                {item.step}
              </div>
              <h3 className="text-xl font-semibold mb-2">
                {item.title}
              </h3>
              <p className="text-gray-600 text-sm">
                {item.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Work;
