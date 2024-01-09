import React, { useEffect } from "react";
import {
  useDeleteUserMutation,
  useEditUserDataMutation,
  useGetAllUserQuery,
} from "../../features/user/user";
import { useState } from "react";
import toast from "react-hot-toast";

const Users = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [userId, setUserId] = useState("");
  const [role, setRole] = useState("");
  const { data, isLoading, isError, error } = useGetAllUserQuery();
  const [users, setUsers] = useState([]);
  useEffect(() => {
    if (isError) {
      console.error("Error fetching post data:", error);
    } else if (!isLoading) {
      setUsers(data.data);
    }
  }, [data, isLoading, isError, error]);
  const [deleteUser] = useDeleteUserMutation();

  const handleDelete = async (id) => {
    const res = await deleteUser(id);
    if (res) {
      toast.success("Successfully delete user");
    }
  };

  const [editUserData] = useEditUserDataMutation();

  const handleUserEdit = async (e) => {
    e.preventDefault();
    const data = {
      Name: name,
      Email: email,
      role: role,
    };
    console.log("info", userId);
    const res = await editUserData({ id: userId, data });
    if (res) {
      toast.success("Successfully update user");
    }
  };

  return (
    <div className="overflow-x-auto table_container">
      <table className="table">
        {/* head */}
        <thead>
          <tr>
            <th></th>
            <th>Name</th>
            <th>Email</th>
            <th>Role</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {isLoading ? (
            <h3 className="text-center">Loading...</h3>
          ) : users ? (
            users.map((user) => (
              <tr className="bg-base-200" key={user.User_ID}>
                <th>{user.User_ID}</th>

                <td>{user.Name}</td>
                <td>{user.Email}</td>
                <td>{user.role}</td>
                <td>
                  <div className="dropdown dropdown-bottom">
                    <div tabIndex={0} role="button" className="btn m-1">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        height="16"
                        width="4"
                        viewBox="0 0 128 512"
                      >
                        <path d="M64 360a56 56 0 1 0 0 112 56 56 0 1 0 0-112zm0-160a56 56 0 1 0 0 112 56 56 0 1 0 0-112zM120 96A56 56 0 1 0 8 96a56 56 0 1 0 112 0z" />
                      </svg>
                    </div>
                    <ul
                      tabIndex={0}
                      className="dropdown-content z-[1] menu rounded-box w-20 mt-(16) gap-2"
                    >
                      <li>
                        {/* Open the modal using document.getElementById('ID').showModal() method */}
                        <button
                           onClick={() => {
                            setUserId(user.User_ID); // Set the userId when the edit button is clicked
                            document.getElementById("my_modal_5").showModal();
                          }}
                        >
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            height="16"
                            width="16"
                            viewBox="0 0 512 512"
                          >
                            <path d="M471.6 21.7c-21.9-21.9-57.3-21.9-79.2 0L362.3 51.7l97.9 97.9 30.1-30.1c21.9-21.9 21.9-57.3 0-79.2L471.6 21.7zm-299.2 220c-6.1 6.1-10.8 13.6-13.5 21.9l-29.6 88.8c-2.9 8.6-.6 18.1 5.8 24.6s15.9 8.7 24.6 5.8l88.8-29.6c8.2-2.7 15.7-7.4 21.9-13.5L437.7 172.3 339.7 74.3 172.4 241.7zM96 64C43 64 0 107 0 160V416c0 53 43 96 96 96H352c53 0 96-43 96-96V320c0-17.7-14.3-32-32-32s-32 14.3-32 32v96c0 17.7-14.3 32-32 32H96c-17.7 0-32-14.3-32-32V160c0-17.7 14.3-32 32-32h96c17.7 0 32-14.3 32-32s-14.3-32-32-32H96z" />
                          </svg>
                        </button>
                        <dialog
                          id="my_modal_5"
                          style={{ display: "flex", justifyContent: "center" }}
                          className="modal modal-bottom sm:modal-middle"
                        >
                          <div className="modal-box">
                            <h3 className="font-bold text-xl mb-2">
                              Edit user info
                            </h3>
                            <form onSubmit={handleUserEdit}>
                              <input
                                type="text"
                                onChange={(e) => setName(e.target.value)}
                                placeholder="Name"
                                className="input border border-black w-full max-w-xs"
                              />
                              <input
                                type="email"
                                onChange={(e) => setEmail(e.target.value)}
                                placeholder="Email"
                                className="input mt-2 border border-black w-full max-w-xs"
                              />
                              <select
                                className="select border border-black mt-2 select-ghost w-full max-w-xs"
                                onChange={(e) => setRole(e.target.value)} // Ensure onChange is placed here
                                value={role} // Add value to keep track of the selected option
                              >
                                <option disabled selected>
                                  Select role
                                </option>
                                <option>user</option>
                                <option>admin</option>
                              </select>
                              <br />

                              <input
                                className="btn mt-4 border border-black"
                                type="submit"
                                value="Submit"
                              />
                            </form>
                            <div className="modal-action">
                              <form method="dialog">
                                {/* if there is a button in form, it will close the modal */}
                                <button className="btn">Close</button>
                              </form>
                            </div>
                          </div>
                        </dialog>
                      </li>
                      <li>
                        <button
                          className="bg-white"
                          onClick={() => handleDelete(user.User_ID)}
                        >
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            height="16"
                            width="14"
                            viewBox="0 0 448 512"
                          >
                            <path d="M135.2 17.7C140.6 6.8 151.7 0 163.8 0H284.2c12.1 0 23.2 6.8 28.6 17.7L320 32h96c17.7 0 32 14.3 32 32s-14.3 32-32 32H32C14.3 96 0 81.7 0 64S14.3 32 32 32h96l7.2-14.3zM32 128H416V448c0 35.3-28.7 64-64 64H96c-35.3 0-64-28.7-64-64V128zm96 64c-8.8 0-16 7.2-16 16V432c0 8.8 7.2 16 16 16s16-7.2 16-16V208c0-8.8-7.2-16-16-16zm96 0c-8.8 0-16 7.2-16 16V432c0 8.8 7.2 16 16 16s16-7.2 16-16V208c0-8.8-7.2-16-16-16zm96 0c-8.8 0-16 7.2-16 16V432c0 8.8 7.2 16 16 16s16-7.2 16-16V208c0-8.8-7.2-16-16-16z" />
                          </svg>
                        </button>
                      </li>
                    </ul>
                  </div>
                </td>
              </tr>
            ))
          ) : (
            <h3 className="text-center">No user found</h3>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default Users;
