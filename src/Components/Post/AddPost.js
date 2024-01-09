import axios from "axios";
import React, { useState } from "react";
import toast from "react-hot-toast";
import { Link, useNavigate } from "react-router-dom";
import "./AddPost.css";
import { useCreatePostMutation } from "../../features/post/post";
const AddPost = () => {
  const navigate = useNavigate();
  const [image, setImage] = useState("");
  const [file, setFile] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState();
  const [contact, setContact] = useState();
  const [identification, setIdentification] = useState("");
  const [idNumber, setIdNumber] = useState("");
  const [location, setLocation] = useState("");
  const [description, setDescription] = useState("");
  const [status, setStatus] = useState("");

  const userId = localStorage.getItem("userId");

  function handleImageChange(e) {
    setFile(URL.createObjectURL(e.target.files[0]));
    if (e.target.files && e.target.files.length > 0) {
      setImage(e.target.files[0]);
    }
  }

  const [createPost] = useCreatePostMutation();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("Name", name);
    formData.append("Email", email);
    formData.append("Image", image);
    formData.append("Contact", contact);
    formData.append("Identification", identification);
    formData.append("IdNumber", idNumber);
    formData.append("Location", location);
    formData.append("Description", description);
    formData.append("Status", status);
    console.log("formData", formData);
    try {
      const res = await createPost({ id: userId, data: formData });

      if (res) {
        toast.success("Successfully created post");
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };
  return (
    <div className=" mx-w-2xl grid grid-cols-1">
      <h3 className="text-xl font-bold">Add Lost/Found Post</h3>
      <form onSubmit={handleSubmit} className="add-post-form">
        <div className="form-group">
          <label htmlFor="username">Name</label>
          <input
            className="form-input border"
            type="text"
            name="Name"
            id="username"
            onChange={(e) => setName(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="email">Conact No</label>
          <input
            className="form-input border"
            type="text"
            name="Contact"
            id="contact"
            onChange={(e) => setContact(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="email">Email</label>
          <input
            className="form-input border"
            type="email"
            name="Email"
            id="email"
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>

        <select
          className="select select-bordered w-full max-w-xs"
          onChange={(e) => setStatus(e.target.value)}
          style={{
            outline: "none",
            border: "1px solid black",
            margin: "10px 0px",
          }}
        >
          <option disabled selected>
            Post status
          </option>
          <option>Found</option>
          <option>Lost</option>
        </select>
        <select
          className="select select-bordered w-full max-w-xs"
          onChange={(e) => setIdentification(e.target.value)}
          style={{
            outline: "none",
            border: "1px solid black",
            margin: "10px 0px",
          }}
        >
          <option disabled selected>
            Pick your identification document
          </option>
          <option>NID</option>
          <option>Certificate</option>
          <option>Licence</option>
        </select>
        <div className="form-group">
          <label htmlFor="password">ID Number</label>
          <input
            className="form-input border"
            type="text"
            name="idNumber"
            id="idNumber"
            onChange={(e) => setIdNumber(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="password">Location</label>
          <input
            className="form-input border"
            type="text"
            name="location"
            id="location"
            onChange={(e) => setLocation(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="password">Description</label>
          <textarea
            style={{ outline: "none", border: "1px solid black" }}
            name="description"
            id=""
            cols="36"
            rows="5"
            onChange={(e) => setDescription(e.target.value)}
          ></textarea>
        </div>
        <div className="form-group">
          <label htmlFor="password">Image</label>
          <input
            className="form-input border"
            type="file"
            name="image"
            id="image"
            accept="image/*"
            onChange={handleImageChange}
            required
          />
        </div>
        <button
          type="submit"
          variant="primary"
          className="bg-primary p-2 mb-8 text-white"
          style={{ width: "100px" }}
        >
          Submit
        </button>
      </form>
    </div>
  );
};

export default AddPost;
