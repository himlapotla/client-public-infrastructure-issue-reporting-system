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

          <Link to="/dashboard/user-statics" className="block p-2 rounded hover:bg-amber-200">
            All statics
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
          <Link to="/dashboard/user-profile" className="block p-2 rounded hover:bg-amber-200">
            Profile
          </Link>

          <Link to="/dashboard/All-assigned-issues" className="block p-2 rounded hover:bg-amber-200">
            All assigned issues
          </Link>

          <Link to="/dashboard/staff-static" className="block p-2 rounded hover:bg-amber-200">
            All statics
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

          <Link to="/dashboard/All-payments" className="block p-2 rounded hover:bg-amber-200">
            All payments
          </Link>

          <Link to="/dashboard/admin-statics" className="block p-2 rounded hover:bg-amber-200">
            All statics
          </Link>

          

          
        </>
      )}
    </div>
  )
}

export default Sidebar;

