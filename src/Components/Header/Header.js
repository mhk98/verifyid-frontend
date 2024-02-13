import React, { Fragment, useEffect, useState } from "react";
import "./Header.css";

import { Disclosure, Menu, Transition } from "@headlessui/react";
import { Bars3Icon, BellIcon, XMarkIcon } from "@heroicons/react/24/outline";
import { Link, useNavigate } from "react-router-dom";
import { useGetAllAdminNotificationQuery } from "../../features/adminNotification/adminNotification";
import { useGetAllUserNotificationQuery } from "../../features/userNotification/userNotification";
import logo from "../../image/logo final.png";
const Header = () => {
  const token = localStorage.getItem("token");
  const image = localStorage.getItem("image");
  const userId = localStorage.getItem("userId");
  const Role = localStorage.getItem("role");
  const name = localStorage.getItem("name");

  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.clear();
    navigate("/login");
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
  } = useGetAllAdminNotificationQuery();
  const [adminNotification, setAdminNotification] = useState("");

  useEffect(() => {
    if (isError1) {
      console.error("Error fetching post data:", error1);
    } else if (!isLoading1) {
      setAdminNotification(data1.data);
    }
  }, [data1, isLoading1, isError1, error1]);

  console.log("notification", userNotification);

  const [activeItem, setActiveItem] = useState(null);

  // Function to handle click on menu item
  const handleItemClick = (index) => {
    setActiveItem(index);
  };
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
    //           src={`https://doctrack-server.onrender.com/${image}`}
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

    <Disclosure as="nav" className="bg-gray-400 ">
      {({ open }) => (
        <div>
          <div className="fixed top-0 left-0 right-0 z-50 bg-white">
            <div className=" px-2 mx-auto max-w-7xl sm:px-6 lg:px-8">
              <div className="relative flex items-center justify-between h-16">
                <div className="absolute inset-y-0 left-0 flex items-center sm:hidden">
                  {/* Mobile menu button*/}
                  <Disclosure.Button className="relative inline-flex items-center justify-center p-2 text-black rounded-md hover:bg-gray-700 hover:text-white focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white">
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
                      className="w-auto h-12"
                      src={logo}
                      alt="Your Company"
                    />
                  </div>
                  {/* <div className="text-white lg:ml-7 lg:first-line:mr-10 ">
                    {" "}
                    <span className="text-2xl  text-amber-500">D</span>oc{" "}
                    <span className="text-2xl text-amber-500">T</span>rack
                  </div> */}
                  <div className="hidden sm:ml-6 sm:block">
                    <div className="flex space-x-4 ms-24 mt-2">
                      <Link
                        to="/"
                        className={classNames(
                          activeItem === 1 ? "active" : "",
                          "text-black hover:bg-gray-700 hover:text-white",
                          "rounded-md px-3 py-2 text-sm font-medium"
                        )}
                        onClick={() => {
                          handleItemClick(1);
                        }}
                        aria-current={
                          window.location.pathname === "/" ? "page" : undefined
                        }
                      >
                        Home
                      </Link>

                      <Link
                        to="/add-post"
                        className={classNames(
                          activeItem === 2 ? "active" : "",
                          "text-black hover:bg-gray-700 hover:text-white",
                          "rounded-md px-3 py-2 text-sm font-medium"
                        )}
                        onClick={() => {
                          handleItemClick(2);
                        }}
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
                          activeItem === 3 ? "active" : "",
                          "text-black hover:bg-gray-700 hover:text-white",
                          "rounded-md px-3 py-2 text-sm font-medium"
                        )}
                        onClick={() => {
                          handleItemClick(3);
                        }}
                        aria-current={
                          window.location.pathname === "/my-post"
                            ? "page"
                            : undefined
                        }
                      >
                        My Posts
                      </Link>

                      <Link
                        to="/dashboard"
                        className={classNames(
                          activeItem === 4 ? "active" : "",
                          "text-black hover:bg-gray-700 hover:text-white",
                          "rounded-md px-3 py-2 text-sm font-medium"
                        )}
                        onClick={() => {
                          handleItemClick(4);
                        }}
                        aria-current={
                          window.location.pathname === "/dashboard"
                            ? "page"
                            : undefined
                        }
                      >
                        Dashboard
                      </Link>

                      <Link
                        to="/add-review"
                        className={classNames(
                          activeItem === 5 ? "active" : "",
                          "text-black hover:bg-gray-700 hover:text-white",
                          "rounded-md px-3 py-2 text-sm font-medium"
                        )}
                        onClick={() => {
                          handleItemClick(5);
                        }}
                        aria-current={
                          window.location.pathname === "/add-review"
                            ? "page"
                            : undefined
                        }
                      >
                        Add Review
                      </Link>
                      <Link
                        to="/contact"
                        className={classNames(
                          activeItem === 6 ? "active" : "",
                          "text-black hover:bg-gray-700 hover:text-white",
                          "rounded-md px-3 py-2 text-sm font-medium"
                        )}
                        onClick={() => {
                          handleItemClick(6);
                        }}
                        aria-current={
                          window.location.pathname === "/contact"
                            ? "page"
                            : undefined
                        }
                      >
                        Contact
                      </Link>
                      <Link
                        to="/blog"
                        className={classNames(
                          activeItem === 7 ? "active" : "",
                          "text-black hover:bg-gray-700 hover:text-white",
                          "rounded-md px-3 py-2 text-sm font-medium"
                        )}
                        onClick={() => {
                          handleItemClick(7);
                        }}
                        aria-current={
                          window.location.pathname === "/blog"
                            ? "page"
                            : undefined
                        }
                      >
                        Blog
                      </Link>
                    </div>
                  </div>
                </div>

                <div className="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">
                  {Role === "admin" ? (
                    <Link to="/admin-notification">
                      <button
                        type="button"
                        className="relative p-1 text-black bg-white rounded-full hover:text-gray-800 focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800"
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
                        className="relative p-1 text-white bg-white rounded-full hover:text-gray-800 focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800"
                      >
                        <span
                          className="text-black"
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
                          className="w-6 h-6 text-black"
                          aria-hidden="true"
                        />
                        <span></span>
                      </button>
                    </Link>
                  )}

                  {/* Profile dropdown */}
                  <Menu as="div" className="relative ml-3">
                    <div>
                      <Menu.Button className="relative flex text-sm bg-white rounded-full focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800">
                        <span className="absolute -inset-1.5" />
                        <span className="sr-only">Open user menu</span>

                        {token ? (
                          <div className="">
                            <img
                              className="h-8 w-8 rounded-full"
                              src={`https://doctrack-server.onrender.com/${image}`}
                              alt=""
                            />

                            <span className="text-black">{`${name}`}</span>
                          </div>
                        ) : (
                          ""
                        )}
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
          </div>

          <Disclosure.Panel className="sm:hidden">
            <div className="px-2 pt-20 pb-3 space-y-1">
              <Link
                to="/"
                className={classNames(
                  activeItem === 1 ? "active" : "",
                  "text-black hover:bg-gray-700 hover:text-white",
                  "rounded-md px-3 py-2 text-sm font-medium"
                )}
                onClick={() => {
                  handleItemClick(1);
                }}
                aria-current={
                  window.location.pathname === "/" ? "page" : undefined
                }
              >
                Home
              </Link>
              <br />
              <Link
                to="/add-post"
                className={classNames(
                  activeItem === 2 ? "active" : "",
                  "text-black hover:bg-gray-700 hover:text-white",
                  "rounded-md px-3 py-2 text-sm font-medium"
                )}
                onClick={() => {
                  handleItemClick(2);
                }}
                aria-current={
                  window.location.pathname === "/add-post" ? "page" : undefined
                }
              >
                Add Post
              </Link>
              <br />

              <Link
                to="/my-post"
                className={classNames(
                  activeItem === 3 ? "active" : "",
                  "text-black hover:bg-gray-700 hover:text-white",
                  "rounded-md px-3 py-2 text-sm font-medium"
                )}
                onClick={() => {
                  handleItemClick(3);
                }}
                aria-current={
                  window.location.pathname === "/my-post" ? "page" : undefined
                }
              >
                My Post
              </Link>
              <br />

              <Link
                to="/dashboard"
                className={classNames(
                  activeItem === 4 ? "active" : "",
                  "text-black hover:bg-gray-700 hover:text-white",
                  "rounded-md px-3 py-2 text-sm font-medium"
                )}
                onClick={() => {
                  handleItemClick(4);
                }}
                aria-current={
                  window.location.pathname === "/dashboard" ? "page" : undefined
                }
              >
                Dashboard
              </Link>
              <br />

              <Link
                to="/add-review"
                className={classNames(
                  activeItem === 5 ? "active" : "",
                  "text-black hover:bg-gray-700 hover:text-white",
                  "rounded-md px-3 py-2 text-sm font-medium"
                )}
                onClick={() => {
                  handleItemClick(5);
                }}
                aria-current={
                  window.location.pathname === "/add-review"
                    ? "page"
                    : undefined
                }
              >
                Add Review
              </Link>
              <br />

              <Link
                to="/contact"
                className={classNames(
                  activeItem === 6 ? "active" : "",
                  "text-black hover:bg-gray-700 hover:text-white",
                  "rounded-md px-3 py-2 text-sm font-medium"
                )}
                onClick={() => {
                  handleItemClick(6);
                }}
                aria-current={
                  window.location.pathname === "/contact" ? "page" : undefined
                }
              >
                Contact
              </Link>
              <br />

              <Link
                to="/blog"
                className={classNames(
                  activeItem === 7 ? "active" : "",
                  "text-black hover:bg-gray-700 hover:text-white",
                  "rounded-md px-3 py-2 text-sm font-medium"
                )}
                onClick={() => {
                  handleItemClick(7);
                }}
                aria-current={
                  window.location.pathname === "/blog" ? "page" : undefined
                }
              >
                Blog
              </Link>
            </div>
          </Disclosure.Panel>
        </div>
      )}
    </Disclosure>
  );
};

export default Header;
