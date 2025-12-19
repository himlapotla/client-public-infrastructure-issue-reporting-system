import { Link } from "react-router";
import { useContext } from "react";
import { AllContext } from "../Provider/AuthProvider";

const Sidebar = () => {
  const { role, user } = useContext(AllContext);

  return (
    <div className="w-64 min-h-screen bg-amber-100 p-5 rounded-2xl space-y-4">

      <h2 className="text-xl font-bold mb-4">Dashboard</h2>



      {user && role === "citizen" && (
        <>
          <Link to="/dashboard/user-profile" className="block p-2 rounded hover:bg-amber-200">
            Profile
          </Link>

          <Link to="/dashboard/Total-issues-submitted" className="block p-2 rounded hover:bg-amber-200">
            Total issues submitted
          </Link>

          <Link to="/dashboard/Total-pending-issues" className="block p-2 rounded hover:bg-amber-200">
            Total pending issues
          </Link>

          <Link to="/dashboard/Total-in-progress-issues" className="block p-2 rounded hover:bg-amber-200">
            Total in progress issues
          </Link>

          <Link to="/dashboard/Total-Resolved-issues" className="block p-2 rounded hover:bg-amber-200">
            Total Resolved issues
          </Link>

          <Link to="/dashboard/Total-payments" className="block p-2 rounded hover:bg-amber-200">
            Total payments
          </Link>

          <Link to="/dashboard/All-my-issues" className="block p-2 rounded hover:bg-amber-200">
            All my issues
          </Link>

          <Link to="/dashboard/Report-issue" className="block p-2 rounded hover:bg-amber-200">
            Report Issue
          </Link>
        </>
      )}


      {user && role === "staff" && (
        <>
          <Link to="/dashboard/profile" className="block p-2 rounded hover:bg-amber-200">
            Profile
          </Link>

          <Link to="/dashboard/Assigned-issues-count" className="block p-2 rounded hover:bg-amber-200">
            Assigned issues count
          </Link>

          <Link to="/dashboard/Issues-resolved-count" className="block p-2 rounded hover:bg-amber-200">
            Issues resolved count

          </Link>

          <Link to="/dashboard/Todays-task" className="block p-2 rounded hover:bg-amber-200">
            Todays task
          </Link>

          <Link to="/dashboard/All-assigned-issues" className="block p-2 rounded hover:bg-amber-200">
            All assigned issues
          </Link>
        </>

      )}


      {user && role === "admin" && (
        <>
          <Link to="/dashboard/user-profile" className="block p-2 rounded hover:bg-amber-200">
            Profile
          </Link>

          <Link to="/dashboard/All-issues" className="block p-2 rounded hover:bg-amber-200">
            All Issues
          </Link>

          <Link to="/dashboard/Manage-user" className="block p-2 rounded hover:bg-amber-200">
            Manage user
          </Link>

          <Link to="/dashboard/Manage-staff" className="block p-2 rounded hover:bg-amber-200">
            Manage staff
          </Link>

          <Link to="/dashboard/Total-issue-count" className="block p-2 rounded hover:bg-amber-200">
            Total issue count
          </Link>

          <Link to="/dashboard/All-payments" className="block p-2 rounded hover:bg-amber-200">
            All payments
          </Link>

          <Link to="/dashboard/Resolved-issue-count" className="block p-2 rounded hover:bg-amber-200">
            Resolved issue count
          </Link>

          <Link to="/dashboard/Pending-issue-count" className="block p-2 rounded hover:bg-amber-200">
            Pending issue count
          </Link>

          <Link to="/dashboard/Rejected-issue-count" className="block p-2 rounded hover:bg-amber-200">
            Rejected issue count
          </Link>

          <Link to="/dashboard/Total-payment-received" className="block p-2 rounded hover:bg-amber-200">
            Total payment received
          </Link>
        </>
      )}
    </div>
  )
}

export default Sidebar;

