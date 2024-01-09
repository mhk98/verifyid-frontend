import React, { useEffect, useState } from "react";

import {
  useDeleteUserNotificationMutation,
  useGetAllUserNotificationQuery,
} from "../../features/userNotification/userNotification";
import toast from "react-hot-toast";

const UserNotification = () => {
  const userId = localStorage.getItem("userId");
  const { data, isLoading, isError, error } =
    useGetAllUserNotificationQuery(userId);
  const [userNotification, setUserNotification] = useState([]);

  useEffect(() => {
    if (isError) {
      console.error("Error fetching post data:", error);
    } else if (!isLoading) {
      setUserNotification(data.data);
    }
  }, [data, isLoading, isError, error]);

  const [deleteUserNotification] = useDeleteUserNotificationMutation();

  const handleDeleteUser = async (id) => {
    const res = await deleteUserNotification(id);
    if (res?.data?.status === "Success") {
      toast.success("Successfully delete notification");
    }
  };
  return (
    <div>
      {isLoading ? (
        <h3>Loading...</h3>
      ) : userNotification ? (
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
              {userNotification.map((notification) => (
                <tr className="bg-base-200" key={notification.Id}>
                  <td>{notification.Id}</td>
                  <td>
                    Please contact this number
                    <span className="font-bold ms-1">
                      {notification.Contact}
                    </span>{" "}
                    for getting your documents{" "}
                    <span className="font-bold">{notification.Name}</span>
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

export default UserNotification;
