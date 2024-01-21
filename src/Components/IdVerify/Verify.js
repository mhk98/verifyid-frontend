import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useNavigate, useParams } from "react-router-dom";
import { useCreateAdminNotificationMutation } from "../../features/adminNotification/adminNotification";
import { useGetSinglePostQuery } from "../../features/post/post";
import { useCreateUserNotificationMutation } from "../../features/userNotification/userNotification";

const Verify = () => {
  const { id } = useParams();
  const [idNumber, setIdNumber] = useState("");
  const [isMatch, setIsMatch] = useState(false);
  const userId = localStorage.getItem("userId");
  const role = localStorage.getItem("role");
  const email = localStorage.getItem("email");

  const navigate = useNavigate();
  console.log("params", id);
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

    const data1 = {
      Name: post.Name,
      Email: email,
      Contact: post.Contact,
      Location: post.Location,
      IdNumber: post.IdNumber,
    };

    console.log("data1", data1);

    const userRes = await createUserNotification({ id: userId, data });

    const adminRes = await createAdminNotification(data1);

    if (userRes || adminRes) {
      toast.success("Successfully Insert");

      navigate("/user-notification");
    }
  };

  return (
    <div>
      {posts.map((post) => (
        <div
          key={post.post_Id}
          className="card bg-base-100 shadow-xl mx-auto mt-8"
        >
          {/* <form onSubmit={handleNotification}> */}
          <div className="mx-auto card-body">
            <h2 className="card-title">
              <span className="font-bold">Name: </span>
              {post.Name}
            </h2>
            <p className="text-left">
              <span className="font-bold">Status: </span>

              {post.Status}
            </p>
            <p className="text-left">
              <span className="font-bold">Type: </span>

              {post.Identification}
            </p>

            <p>
              <span className="font-bold">Location: </span>
              {post.Location}
            </p>

            <p>
              <span className="font-bold">Id: </span>
              {post.IdNumber.slice(-6)} (Last 6 digits)
            </p>

            <div className="form-group">
              <label htmlFor="username">Please match your Id number</label>
              <input
                className="border form-input"
                type="text"
                name="Name"
                id="username"
                onChange={(e) => setIdNumber(e.target.value)}
                required
              />
              <br />
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
