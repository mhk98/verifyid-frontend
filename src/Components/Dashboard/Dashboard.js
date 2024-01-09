import React from "react";
import { Link, Outlet } from "react-router-dom";

const Dashboard = () => {
  return (
    <div className="drawer lg:drawer-open">
      <input id="my-drawer-2" type="checkbox" className="drawer-toggle" />
      <div className="drawer-content flex flex-col items-center justify-center">
        {/* Page content here */}
        {/* <h2 className="text-3xl font-bold text-black-500">
          Welcome to your Dashboard
        </h2> */}
        <Outlet></Outlet>
        <label
          htmlFor="my-drawer-2"
          className="btn btn-white border border-gray-300 mt-8 drawer-button lg:hidden"
        >
          Open drawer
        </label>
      </div>
      <div className="drawer-side mt-16">
        <label
          htmlFor="my-drawer-2"
          aria-label="close sidebar"
          className="drawer-overlay"
        ></label>
        <ul className="menu p-4 w-80 min-h-full bg-base-200 text-base-content">
          {/* Sidebar content here */}
          <li>
            <Link to="/">All Users</Link>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Dashboard;
