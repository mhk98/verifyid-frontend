import React, { useEffect, useState } from "react";
import { useGetSinglePostQuery } from "../../features/post/post";
import { useParams } from "react-router-dom";
import { useCreateUserNotificationMutation } from "../../features/userNotification/userNotification";
import toast from "react-hot-toast";
import { useCreateAdminNotificationMutation } from "../../features/adminNotification/adminNotification";

const Verify = () => {
  const { id } = useParams();
  const [idNumber, setIdNumber] = useState("");
  const [isMatch, setIsMatch] = useState(false);
  const userId = localStorage.getItem("userId");
  const role = localStorage.getItem("role");

  const { data, isLoading, isError, error } = useGetSinglePostQuery(id);
  const [posts, setPosts] = useState([]);
  useEffect(() => {
    if (isError) {
      console.error("Error fetching post data:", error);
    } else if (!isLoading) {
      setPosts(data.data);
    }
  }, [data, isLoading, isError, error]);

  useEffect(() => {
    if (posts.length > 0) {
      const matchedPost = posts.find((post) => post.IdNumber === idNumber);
      setIsMatch(!!matchedPost);
    } else {
      setIsMatch(false);
    }
  }, [idNumber, posts]);

  const [createUserNotification] = useCreateUserNotificationMutation();
  const [createAdminNotification] = useCreateAdminNotificationMutation();

  const handleNotification = async (post) => {
    console.log("post", post);
    const data = {
      Name: post.Name,
      Email: post.Email,
      Contact: post.Contact,
      Location: post.Location,
      IdNumber: post.IdNumber,
    };

    const userRes = await createUserNotification({ id: userId, data });

    const adminRes = await createAdminNotification({ id: role, data });

    if (userRes || adminRes) {
      toast.success("Successfully Insert");

      console.log("Response", userRes, adminRes);
    }
  };

  return (
    <div>
      {posts.map((post) => (
        <div
          key={post.post_Id}
          className="card w-2/5 bg-base-100 shadow-xl mx-auto mt-8"
        >
          {/* <form onSubmit={handleNotification}> */}
          <div className="card-body mx-auto">
            <h2 className="card-title">Name: {post.Name}</h2>
            <p>Email: {post.Email}</p>
            <p>Contact: {post.Contact}</p>
            <p>Location: {post.Location}</p>

            <p>Id Number: {post.IdNumber.substring(6)}</p>
            <div className="form-group">
              <label htmlFor="username">Please match your Id number</label>
              <input
                className="form-input border"
                type="text"
                name="Name"
                id="username"
                onChange={(e) => setIdNumber(e.target.value)}
                required
              />
              <button
                className={`bg-green-500 p-2 text-white ${
                  isMatch ? "" : "opacity-50 cursor-not-allowed"
                }`}
                disabled={!isMatch}
                onClick={() => handleNotification(post)}
              >
                Submit
              </button>
            </div>
          </div>
          {/* </form> */}
          <div className="mt-16"></div>
        </div>
      ))}
    </div>
  );
};

export default Verify;
