import axios from "axios";
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";

const Review = () => {
  const [review, setReview] = useState("");
  const handleInsert = async () => {
    const data = {
      review: review,
    };
    const res = await axios.post(
      "https://doctrack-server.onrender.com/api/v1/review",
      data
    );
    if (res) {
      toast("Successfully insert review");
    }
  };

  const [allReviews, setAllReviews] = useState([]);
  const allReview = async () => {
    const res = await axios.get(
      "https://doctrack-server.onrender.com/api/v1/review"
    );
    setAllReviews(res.data.data);
  };

  useEffect(() => {
    allReview();
  });
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        marginTop: "100px",
      }}
    >
      <form onSubmit={handleInsert}>
        <h3 className="text-2xl mb-3">Please give your review</h3>
        <textarea
          onChange={(e) => setReview(e.target.value)}
          className="border border-black outline-none"
          name=""
          id=""
          cols="80"
          rows="5"
        ></textarea>
        <br />
        <input
          className="bg-primary p-2 text-white"
          type="submit"
          value="Submit"
        />
      </form>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-4 mt-16 mb-16">
        {allReviews.map((review, index) => (
          <div key={index} className="card bg-neutral text-neutral-content">
            <div className="card-body text-center">
              <p>{review.review}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Review;
