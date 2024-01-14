import React, { useEffect, useState } from "react";
import {
  useDeletePostMutation,
  useGetSinglePostQuery,
} from "../../features/post/post";
import toast from "react-hot-toast";
import { useGetAllMyPostQuery } from "../../features/myPost/myPost";

const Status = () => {
  //   const [name, setName] = useState("");
  //   const [email, setEmail] = useState("");
  //   const [userId, setUserId] = useState("");
  //   const [role, setRole] = useState("");
  //   const { data, isLoading, isError, error } = useGetAllUserQuery();
  //   const [users, setUsers] = useState([]);
  const userId = localStorage.getItem("userId");

  const [status, setStatus] = useState([]);
  const { data, isLoading, isError, error } = useGetSinglePostQuery(userId);

  useEffect(() => {
    if (isError) {
      console.error("Error fetching post data:", error);
    } else if (!isLoading) {
      setStatus(data.data);
    }
  }, [data, isLoading, isError, error]);
  const [deletePost] = useDeletePostMutation();

  const handleDelete = async (id) => {
    console.log("handleId", id);
    const res = await deletePost(id);
    if (res) {
      toast.success("Successfully delete post");
    }
  };

  return (
    <div className="overflow-x-auto table_container">
      <table className="table">
        {/* head */}
        <thead>
          <tr>
            <th></th>
            <th>Image</th>
            <th>Identification</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {isLoading ? (
            <h3 className="text-center">Loading...</h3>
          ) : status ? (
            status.map((post) => (
              <tr className="bg-base-200" key={post.post_ID}>
                <th>{post.post_Id}</th>

                <td>
                  <img
                    className="w-12 h-12"
                    src={`https://verifyid-backend.onrender.com/${post.Image}`}
                    alt=""
                  />
                </td>
                <td>{post.Identifiction}</td>
                <td>
                  <button
                    className="bg-white"
                    onClick={() => handleDelete(post.post_Id)}
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

export default Status;
