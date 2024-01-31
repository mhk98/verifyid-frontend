import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import {
  useEditPostDataMutation,
  useGetAllPostQuery,
} from "../../features/post/post";
import axios from "axios";

const PostStatus = () => {
  const [selectedStatus, setSelectedStatus] = useState("");

  const handleStatusChange = (event) => {
    setSelectedStatus(event.target.value);
  };

  const [status, setStatus] = useState([]);

  const { data, isLoading, isError, error } = useGetAllPostQuery();

  console.log("AllPost", status);

  useEffect(() => {
    if (isError) {
      console.error("Error fetching post data:", error);
    } else if (!isLoading) {
      setStatus(data.data);
    }
  }, [data, isLoading, isError, error]);

  console.log("selectedStatus", selectedStatus);

  const handleEdit = async (id) => {
    const data = {
      Post_Status: selectedStatus,
    };
    const res = await axios.patch(
      `https://doctrack-server.onrender.com/api/v1/post/${id}`,
      data
    );

    if (res) {
      toast.success("Successfully update post");
      window.location.reload();
    }
  };
  const handleDelete = async (id) => {
    const res = await axios.delete(
      `https://doctrack-server.onrender.com/api/v1/post/${id}`
    );

    if (res) {
      toast.success("Successfully delete post");
      window.location.reload();
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
            <th>Status</th>
            <th>Action</th>
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
                    src={`https://doctrack-server.onrender.com/${post.image}`}
                    alt=""
                  />
                </td>
                <td>{post.Identification}</td>
                <td>
                  <select
                    className="select w-full max-w-xs"
                    onChange={handleStatusChange}
                  >
                    <option disabled value="">
                      Choose status
                    </option>
                    <option value="Pending">Pending</option>
                    <option value="Approved">Approved</option>
                  </select>
                </td>
                <td>
                  <button
                    className="bg-white"
                    onClick={() => handleEdit(post.post_Id)}
                  >
                    Submit
                  </button>
                </td>
                <td>
                  <button
                    className="bg-white"
                    onClick={() => handleDelete(post.post_Id)}
                  >
                    Delete
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

export default PostStatus;
