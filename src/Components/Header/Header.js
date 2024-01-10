import React, { Fragment, useEffect, useState } from "react";
import "./Header.css";

import { Disclosure, Menu, Transition } from "@headlessui/react";
import { Bars3Icon, BellIcon, XMarkIcon } from "@heroicons/react/24/outline";
import { Link, useNavigate } from "react-router-dom";
import { useGetAllAdminNotificationQuery } from "../../features/adminNotification/adminNotification";
import { useGetAllUserNotificationQuery } from "../../features/userNotification/userNotification";
const Header = () => {
  const token = localStorage.getItem("token");
  const image = localStorage.getItem("image");
  const userId = localStorage.getItem("userId");
  const Role = localStorage.getItem("role");

  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.clear();
    navigate("/login");
    window.location.reload();
  };

  function classNames(...classes) {
    return classes.filter(Boolean).join(" ");
  }

  const { data, isLoading, isError, error } =
    useGetAllUserNotificationQuery(userId);
  const [userNotification, setUserNotification] = useState("");

  useEffect(() => {
    if (isError) {
      console.error("Error fetching post data:", error);
    } else if (!isLoading) {
      setUserNotification(data.data);
    }
  }, [data, isLoading, isError, error]);

  const {
    data: data1,
    isLoading: isLoading1,
    isError: isError1,
    error: error1,
  } = useGetAllAdminNotificationQuery(Role);
  const [adminNotification, setAdminNotification] = useState("");

  useEffect(() => {
    if (isError1) {
      console.error("Error fetching post data:", error1);
    } else if (!isLoading1) {
      setAdminNotification(data1.data);
    }
  }, [data1, isLoading1, isError1, error1]);

  console.log("notification", userNotification);

  return (
    // <div className="flex-none gap-2">
    //   <div className="dropdown dropdown-end">
    //     <div
    //       tabIndex={0}
    //       role="button"
    //       className="btn btn-ghost btn-circle avatar"
    //     >
    //       <div className="w-10 rounded-full">
    //         <img
    //           alt="Tailwind CSS Navbar component"
    //           src={`https://verifyid-backend.onrender.com/${image}`}
    //         />
    //       </div>
    //     </div>
    //     <ul className="mt-3 z-[1] p-2 shadow menu menu-sm dropdown-content bg-base-100 rounded-box w-52">
    //       <li>
    //         <a className="justify-between">
    //           Profile
    //           <span className="badge">New</span>
    //         </a>
    //       </li>

    //       {token ? (
    //         <li>
    //           <Link onClick={handleLogout}>Logout</Link>
    //         </li>
    //       ) : (
    //         <li>
    //           <Link to="/login">Login</Link>
    //         </li>
    //       )}
    //     </ul>
    //   </div>
    // </div>

    <Disclosure as="nav" className="bg-gray-800">
      {({ open }) => (
        <>
          <div className="px-2 mx-auto max-w-7xl sm:px-6 lg:px-8">
            <div className="relative flex items-center justify-between h-16">
              <div className="absolute inset-y-0 left-0 flex items-center sm:hidden">
                {/* Mobile menu button*/}
                <Disclosure.Button className="relative inline-flex items-center justify-center p-2 text-gray-400 rounded-md hover:bg-gray-700 hover:text-white focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white">
                  <span className="absolute -inset-0.5" />
                  <span className="sr-only">Open main menu</span>
                  {open ? (
                    <XMarkIcon className="block w-6 h-6" aria-hidden="true" />
                  ) : (
                    <Bars3Icon className="block w-6 h-6" aria-hidden="true" />
                  )}
                </Disclosure.Button>
              </div>
              <div className="flex items-center justify-center flex-1 sm:items-stretch sm:justify-start">
                <div className="flex items-center flex-shrink-0">
                  <img
                    className="w-auto h-8"
                    src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=500"
                    alt="Your Company"
                  />
                </div>
                <div className="hidden sm:ml-6 sm:block">
                  <div className="flex space-x-4">
                    <Link
                      to="/"
                      className={classNames(
                        "text-gray-300 hover:bg-gray-700 hover:text-white",
                        "rounded-md px-3 py-2 text-sm font-medium"
                      )}
                      aria-current={
                        window.location.pathname === "/"
                          ? "page"
                          : undefined
                      }
                    >
                      Home
                    </Link>

                    <Link
                      to="/add-post"
                      className={classNames(
                        "text-gray-300 hover:bg-gray-700 hover:text-white",
                        "rounded-md px-3 py-2 text-sm font-medium"
                      )}
                      aria-current={
                        window.location.pathname === "/add-post"
                          ? "page"
                          : undefined
                      }
                    >
                      Add Post
                    </Link>

                    <Link
                      to="/my-post"
                      className={classNames(
                        "text-gray-300 hover:bg-gray-700 hover:text-white",
                        "rounded-md px-3 py-2 text-sm font-medium"
                      )}
                      aria-current={
                        window.location.pathname === "/my-post"
                          ? "page"
                          : undefined
                      }
                    >
                      My Posts
                    </Link>

                    {Role === "admin" && (
                      <Link
                        to="/dashboard"
                        className={classNames(
                          "text-gray-300 hover:bg-gray-700 hover:text-white",
                          "rounded-md px-3 py-2 text-sm font-medium"
                        )}
                        aria-current={
                          window.location.pathname === "/dashboard"
                            ? "page"
                            : undefined
                        }
                      >
                        Dashboard
                      </Link>
                    )}
                  </div>
                </div>
              </div>

              <div className="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">
                {Role === "admin" ? (
                  <Link to="/admin-notification">
                    <button
                      type="button"
                      className="relative p-1 text-gray-400 bg-gray-800 rounded-full hover:text-white focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800"
                    >
                      <span
                        className=""
                        style={{
                          position: "absolute",
                          right: "4px",
                          top: "-7px",
                        }}
                      >
                        {adminNotification.length}
                      </span>
                      {/* <span className="sr-only">View notifications</span> */}
                      <BellIcon className="w-6 h-6" aria-hidden="true" />
                      <span></span>
                    </button>
                  </Link>
                ) : (
                  <Link to="/user-notification">
                    <button
                      type="button"
                      className="relative p-1 text-gray-400 bg-gray-800 rounded-full hover:text-white focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800"
                    >
                      <span
                        className="text-white"
                        style={{
                          position: "absolute",
                          right: "4px",
                          top: "-7px",
                        }}
                      >
                        {userNotification.length}
                      </span>
                      {/* <span className="sr-only">View notifications</span> */}
                      <BellIcon
                        className="w-6 h-6 text-white"
                        aria-hidden="true"
                      />
                      <span></span>
                    </button>
                  </Link>
                )}

                {/* Profile dropdown */}
                <Menu as="div" className="relative ml-3">
                  <div>
                    <Menu.Button className="relative flex text-sm bg-gray-800 rounded-full focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800">
                      <span className="absolute -inset-1.5" />
                      <span className="sr-only">Open user menu</span>
                      <img
                        className="w-8 h-8 rounded-full"
                        src={`https://verifyid-backend.onrender.com/${image}`}
                        alt=""
                      />
                    </Menu.Button>
                  </div>
                  <Transition
                    as={Fragment}
                    enter="transition ease-out duration-100"
                    enterFrom="transform opacity-0 scale-95"
                    enterTo="transform opacity-100 scale-100"
                    leave="transition ease-in duration-75"
                    leaveFrom="transform opacity-100 scale-100"
                    leaveTo="transform opacity-0 scale-95"
                  >
                    <Menu.Items className="absolute right-0 z-10 w-48 py-1 mt-2 origin-top-right bg-white rounded-md shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                      {token ? (
                        <Menu.Item>
                          {({ active }) => (
                            <a
                              href="#"
                              className={classNames(
                                active ? "bg-gray-100" : "",
                                "block px-4 py-2 text-sm text-gray-700"
                              )}
                              onClick={handleLogout}
                            >
                              Sign out
                            </a>
                          )}
                        </Menu.Item>
                      ) : (
                        <Menu.Item>
                          {({ active }) => (
                            <a
                              className={classNames(
                                active ? "bg-gray-100" : "",
                                "block px-4 py-2 text-sm text-gray-700"
                              )}
                            >
                              Sign in
                            </a>
                          )}
                        </Menu.Item>
                      )}
                    </Menu.Items>
                  </Transition>
                </Menu>
              </div>
            </div>
          </div>

          <Disclosure.Panel className="sm:hidden">
            <div className="px-2 pt-2 pb-3 space-y-1">
              <Link
                to="/"
                className={classNames(
                  "text-gray-300 hover:bg-gray-700 hover:text-white",
                  "block rounded-md px-3 py-2 text-base font-medium"
                )}
                aria-current={
                  window.location.pathname === "/" ? "page" : undefined
                }
              >
                Home
              </Link>

              <Link
                to="/add-post"
                className={classNames(
                  "text-gray-300 hover:bg-gray-700 hover:text-white",
                  "block rounded-md px-3 py-2 text-base font-medium"
                )}
                aria-current={
                  window.location.pathname === "/add-post" ? "page" : undefined
                }
              >
                Add Post
              </Link>

              <Link
                to="/my-post"
                className={classNames(
                  "text-gray-300 hover:bg-gray-700 hover:text-white",
                  "block rounded-md px-3 py-2 text-base font-medium"
                )}
                aria-current={
                  window.location.pathname === "/my-post" ? "page" : undefined
                }
              >
                My Post
              </Link>

              {Role === "admin" && (
                <Link
                  to="/dashboard"
                  className={classNames(
                    "text-gray-300 hover:bg-gray-700 hover:text-white",
                    "block rounded-md px-3 py-2 text-base font-medium"
                  )}
                  aria-current={
                    window.location.pathname === "/dashboard"
                      ? "page"
                      : undefined
                  }
                >
                  Dashboard
                </Link>
              )}
            </div>
          </Disclosure.Panel>
        </>
      )}
    </Disclosure>
  );
};

export default Header;
