import React from "react";
import { Link } from "react-router-dom";
import licence from "../../image/licence.jpg";
const Blog = () => {
  return (
    <div className="flex items-center justify-center my-20">
      <div className="grid lg:grid-cols-3 md:grid-cols-3 sm:grid-cols-1 gap-4 ">
        <div className="card w-96 bg-base-100 shadow-xl">
          <figure className="px-10 pt-10">
            <img
              src="https://i.ibb.co/51ntN8n/nid.jpg"
              alt="nid"
              className="rounded-xl"
            />
          </figure>
          <div className="card-body items-center text-center">
            <h2 className="card-title">জাতীয় পরিচয়পত্র হারিয়ে গেলে করণীয়!</h2>
            <p>
              পরিচয়পত্রটি যেখানে হারিয়েছে, তার নিকটবর্তী থানায় যত দ্রুত সম্ভব
              সাধারণ ডায়েরি করতে হবে। পরবর্তী সময়ে ব্যবহারের জন্য সাধারণ ডায়েরির
              কাগজটি সংরক্ষণ করে রাখতে হবে।
            </p>
            <div className="card-actions">
              <button className="btn btn-primary">
                <Link to="/nid-details">বিস্তারিত</Link>
              </button>
            </div>
          </div>
        </div>
        <div className="card w-96 bg-base-100 shadow-xl">
          <figure className="px-10 pt-10">
            <img src={licence} alt="Shoes" className="rounded-xl" />
          </figure>
          <div className="card-body items-center text-center">
            <h2 className="card-title">
              ড্রাইভিং লাইসেন্স হারিয়ে গেলে করণীয়!
            </h2>
            <p>
              শিক্ষার্থীদেরকে বোর্ড কর্তৃক যেই সার্টিফিকেটগুলো দেওয়া হয়, তার
              একটি কপি বোর্ড কর্তৃপক্ষ তাদের সংরক্ষণাগারে রেখে দেয়। তাই যে কোনো
              শিক্ষার্থীর সার্টিফিকেট বা মূল্যবান শিক্ষাসংক্রান্ত কাগজপত্র
              অনাকাঙ্খিত ভাবে হারিয়ে গেলে বা নষ্ট হয়ে গেলে হতাশার কিছু নেই।
            </p>
            <div className="card-actions">
              <button className="btn btn-primary">
                <Link to="/certificate-details">বিস্তারিত</Link>
              </button>
            </div>
          </div>
        </div>
        <div className="card w-96 bg-base-100 shadow-xl">
          <figure className="px-10 pt-10">
            <img
              src="https://i.ibb.co/G58WTDf/certificate.jpg"
              alt="Shoes"
              className="rounded-xl"
            />
          </figure>
          <div className="card-body items-center text-center">
            <h2 className="card-title">সার্টিফিকেট হারিয়ে গেলে করণীয়!</h2>
            <p>
              আজকাল ড্রাইভিং লাইসেন্স সোনার হরিণের মত হয়ে গেছে। অনেক সাধনার পরে
              একটি ড্রাইভিং লাইসেন্স হাতে পাওয়া যায়। ড্রাইভিং লাইসেন্স এখন
              এনআইডি স্মার্ট কার্ডের মত একটি কার্ড যেটি সব সময় বহন করা যায়।
            </p>
            <div className="card-actions">
              <button className="btn btn-primary">
                <Link to="/licence-details">বিস্তারিত</Link>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Blog;
