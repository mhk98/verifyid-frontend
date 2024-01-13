import React from "react";
import { Link, Outlet } from "react-router-dom";

const Dashboard = () => {
  const Role = localStorage.getItem("role");

  return (
    <div className="drawer lg:drawer-open">
      <input id="my-drawer-2" type="checkbox" className="drawer-toggle" />
      <div className="flex flex-col items-center justify-center drawer-content">
        {/* Page content here */}

        <Outlet></Outlet>
        <label
          htmlFor="my-drawer-2"
          className="mt-8 border border-gray-300 btn btn-white drawer-button lg:hidden"
        >
          Open drawer
        </label>
      </div>
      <div className="mt-8 drawer-side">
        <label
          htmlFor="my-drawer-2"
          aria-label="close sidebar"
          className="drawer-overlay"
        ></label>
        <ul className="min-h-full p-4 menu w-80 bg-base-200 text-base-content">
          {/* Sidebar content here */}

          {/* {Role === "admin" && ( */}
          <li>
            <Link to="/dashboard/users">All Users</Link>
          </li>
          {/* )} */}
          <li>
            <Link to="/dashboard/posts">Posts</Link>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Dashboard;
