import { useContext, useEffect, useState } from "react";
import { AllContext } from "../Provider/AuthProvider";

const StaffStatic = () => {
  const { user } = useContext(AllContext)
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user?.email) return;

    fetch(`${import.meta.env.VITE_API_URL}/stats/staff/${user.email}`)
      .then(res => res.json())
      .then(data => {
        setStats(data);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, [user?.email]);

  if (loading) {
    return (
      <p className="text-center text-lg font-semibold text-gray-500">
        Loading statistics...
      </p>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">

      <div className="rounded-xl bg-white p-6 shadow border dark:bg-gray-900 dark:border-gray-700">
        <h3 className="text-sm text-gray-500">Assigned Issues</h3>
        <p className="mt-2 text-3xl font-bold text-blue-600">
          {stats?.assignedIssues || 0}
        </p>
      </div>

      <div className="rounded-xl bg-white p-6 shadow border dark:bg-gray-900 dark:border-gray-700">
        <h3 className="text-sm text-gray-500">Issues Resolved</h3>
        <p className="mt-2 text-3xl font-bold text-green-600">
          {stats?.resolvedIssues || 0}
        </p>
      </div>

      <div className="rounded-xl bg-emerald-500 p-6 shadow border dark:bg-gray-900 dark:border-gray-700">
        <h3 className="text-sm text-gray-500">Today's Tasks</h3>
        <p className="mt-2 text-3xl font-bold text-amber-600">
          {stats?.todaysTasks || 0}
        </p>
      </div>

    </div>
  );
};

export default StaffStatic;
