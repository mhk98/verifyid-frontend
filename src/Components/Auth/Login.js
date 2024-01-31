import axios from "axios";
import { useState } from "react";
import toast from "react-hot-toast";
import { Link, useNavigate } from "react-router-dom";
import "./Auth.css";

const Login = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    Email: "",
    Password: "",
  });

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
      const response = await axios.post(
        "https://doctrack-server.onrender.com/api/v1/user/login",
        formData
      );

      if (response.data.status === "Success") {
        navigate("/");
        toast.success("Successfully Logged In");
        localStorage.setItem("token", response.data.data.accessToken);
        localStorage.setItem("name", response.data.data.user.Name);
        localStorage.setItem("email", response.data.data.user.Email);
        localStorage.setItem("role", response.data.data.user.role);
        localStorage.setItem("image", response.data.data.user.image);
        localStorage.setItem("userId", response.data.data.user.User_ID);
      }
    } catch (error) {
      toast.error(error.message);
      console.error("Error:", error);
      // Handle the error, e.g., show an error message to the user.
    }
  };

  return (
    <div className="mt-20 login-container">
      <h3 className="text-xl bold">Login</h3>
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
            Password
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
        <div>
          <Link to="/forgot-password" className="text-left">
            Forgot Password
          </Link>
        </div>
        <button
          type="submit"
          variant="primary"
          className="p-2 text-white bg-primary"
          style={{ width: "100px" }}
        >
          Login
        </button>
      </form>
      <p className="mt-2">
        <span>Don't have account?</span>
        <span>
          <Link to="/register" className="text-primary">
            {" "}
            Sign Up
          </Link>
        </span>
      </p>
    </div>
  );
};

export default Login;
