import React, { useState } from "react";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { useCreatePostMutation } from "../../features/post/post";
import "./AddPost.css";
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
  const [ownerName, setOwnerName] = useState("");

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
    formData.append("Owner_Name", ownerName);
    formData.append("Description", description);
    formData.append("Status", status);
    console.log("formData", formData);
    try {
      const res = await createPost({ id: userId, data: formData });

      if (res.data.status === "Success") {
        toast.success("Successfully created post");
        navigate("/");
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };
  return (
    <div className="grid grid-cols-1 mx-w-2xl">
      <h3 className="mt-8 text-xl font-bold text-center">
        Add Lost/Found Post
      </h3>
      <form onSubmit={handleSubmit} className="add-post-form">
        <div className="form-group">
          <label htmlFor="username">Name</label>
          <input
            className="border form-input same-size-input"
            type="text"
            name="Name"
            id="username"
            onChange={(e) => setName(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="email">Contact No</label>
          <input
            className="border form-input same-size-input"
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
            className="border form-input same-size-input"
            type="email"
            name="Email"
            id="email"
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>

        <select
          className="w-full max-w-xs select select-bordered same-size-input"
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
          className="w-full max-w-xs select select-bordered same-size-input"
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
            className="border form-input same-size-input"
            type="text"
            name="idNumber"
            id="idNumber"
            onChange={(e) => setIdNumber(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="password">Owner Name</label>
          <input
            className="border form-input same-size-input"
            type="text"
            name="Owner_Name"
            id="Owner_Name"
            onChange={(e) => setOwnerName(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="password">Location</label>
          <input
            className="border form-input same-size-input"
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
            className="border form-input same-size-input"
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
            className="border form-input same-size-input"
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
          className="p-2 mb-8 text-white bg-primary"
          style={{ width: "100px" }}
        >
          Submit
        </button>
      </form>
    </div>
  );
};

export default AddPost;
