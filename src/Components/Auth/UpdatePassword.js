import axios from "axios";
import React, { useState } from "react";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

const UpdatePassword = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    Email: "",
    Password: "",
  });
  const userId = localStorage.getItem("userId");

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  console.log("formData", formData);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.patch(
        `https://verifyid-backend.onrender.com/api/v1/user/`,
        formData
      );

      if (response.data.status === "Success") {
        navigate("/");
        toast.success("Successfully Update Password");
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
            type="email"
            name="Email"
            id="email"
            value={formData.Email}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label className="text-left " htmlFor="password">
            New Password
          </label>
          <input
            className="border form-input"
            type="password"
            name="Password"
            id="password"
            value={formData.Password}
            onChange={handleChange}
            required
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
