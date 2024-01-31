import axios from "axios";
import React, { useState } from "react";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

const UpdatePassword = () => {
  const navigate = useNavigate();

  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = {
      Password: password,
    };

    try {
      const response = await axios.patch(
        `https://doctrack-server.onrender.com/api/v1/user/${email}`,
        data
      );

      if (response.data.status === "Success") {
        toast.success("Successfully Update Password");
        navigate("/login");
      }
    } catch (error) {
      console.error("Error:", error);
      // Handle the error, e.g., show an error message to the user.
    }
  };

  return (
    <div className="mt-20 login-container">
      <h3 className="text-xl bold ">Forgot Password</h3>
      <form onSubmit={handleSubmit} className="register-form">
        <div className="form-group">
          <label className="text-left " htmlFor="email">
            Email
          </label>
          <input
            className="border form-input"
            onChange={(e) => setEmail(e.target.value)}
            type="email"
            name="email"
            id="email"
            required
          />
        </div>
        <div className="form-group">
          <label className="text-left " htmlFor="password">
            New Password
          </label>
          <input
            className="border form-input"
            onChange={(e) => setPassword(e.target.value)}
            type="password"
            name="password"
            id="password"
          />
        </div>

        <button
          type="submit"
          variant="primary"
          className="p-2 text-white bg-primary"
          style={{ width: "100px" }}
        >
          Submit
        </button>
      </form>
    </div>
  );
};

export default UpdatePassword;
