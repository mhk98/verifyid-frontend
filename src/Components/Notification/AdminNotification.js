import React from "react";
import { useEffect, useState } from "react";
import { useGetAllUserNotificationQuery } from "../../features/userNotification/userNotification";
import {
  useDeleteAdminNotificationMutation,
  useGetAllAdminNotificationQuery,
} from "../../features/adminNotification/adminNotification";
import toast from "react-hot-toast";

const AdminNotification = () => {
  const Role = localStorage.getItem("role");

  const {
    data: data1,
    isLoading: isLoading1,
    isError: isError1,
    error: error1,
  } = useGetAllAdminNotificationQuery(Role);
  const [adminNotification, setAdminNotification] = useState([]);

  useEffect(() => {
    if (isError1) {
      console.error("Error fetching post data:", error1);
    } else if (!isLoading1) {
      setAdminNotification(data1.data);
    }
  }, [data1, isLoading1, isError1, error1]);

  const [deleteAdminNotification] = useDeleteAdminNotificationMutation();

  const handleDeleteUser = async (id) => {
    const res = await deleteAdminNotification(id);
    if (res?.data?.status === "Success") {
      toast.success("Successfully delete notification");
    }
  };
  return (
    <div>
      {isLoading1 ? (
        <h3>Loading...</h3>
      ) : adminNotification ? (
        // userNotification.map((notification) => (
        //   <h3>
        //     Please contact this number {notification.Contact} for getting your
        //     documents {notification.Name}
        //   </h3>
        // ))

        <div className="overflow-x-auto flex flex-1 justify-center mt-4">
          <table className="table">
            {/* head */}
            <thead>
              <tr className="border">
                <th className="font-bold text-black">No</th>
                <th className="font-bold text-black">Message</th>
                {/* <th className="font-bold text-black">Action</th> */}
              </tr>
            </thead>
            <tbody>
              {adminNotification.map((notification) => (
                <tr className="bg-base-200" key={notification.Id}>
                  <td>{notification.Id}</td>
                  <td>
                    We send a notification
                    <span className="font-bold">{notification.Name}.</span>
                    This is user number
                    <span className="font-bold ms-1">
                      {notification.Contact}
                    </span>
                    to getting his documents
                  </td>
                  <td
                    className="cursor-pointer"
                    onClick={() => handleDeleteUser(notification.Id)}
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      height="16"
                      width="14"
                      viewBox="0 0 448 512"
                    >
                      <path d="M135.2 17.7L128 32H32C14.3 32 0 46.3 0 64S14.3 96 32 96H416c17.7 0 32-14.3 32-32s-14.3-32-32-32H320l-7.2-14.3C307.4 6.8 296.3 0 284.2 0H163.8c-12.1 0-23.2 6.8-28.6 17.7zM416 128H32L53.2 467c1.6 25.3 22.6 45 47.9 45H346.9c25.3 0 46.3-19.7 47.9-45L416 128z" />
                    </svg>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <h3>No notification available</h3>
      )}
    </div>
  );
};

export default AdminNotification;
