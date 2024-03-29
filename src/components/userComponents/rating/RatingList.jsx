import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { reviewList } from "../../../api/userApi";

const RatingList = () => {
  const { state } = useLocation();
  const [reviews, setReviews] = useState([]);

  const { _id } = state.room;
  useEffect(() => {
    reviewList(_id)
      .then((res) => {
        setReviews(res?.data);
      })
      .catch((err) => {
        console.log(err.message);
      });
  }, []);
  return (
    <>
      {reviews && reviews.length > 0 && (
        <div className="max-w-4xl m-6 mt-10">
          <h1 className="text-3xl font-bold text-gray-900 mb-8">
            Latest Reviews
          </h1>
          {reviews.map((review) => (
            <article
              key={review._id}
              className="bg-white rounded-lg shadow-md p-6 mb-8"
            >
              <div className="flex items-center mb-4">
                <img
                  src="https://images.unsplash.com/photo-1544005313-94ddf0286df2?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=100&h=100&q=80"
                  alt="Profile"
                  className="w-10 h-10 me-4 rounded-full"
                />
                <div>
                  <p className="text-lg font-semibold text-black">
                    {review?.postedBy?.name}
                  </p>
                  <p className="text-sm text-gray-600">
                    {review?.postedDate && (
                      <time dateTime={review?.postedDate}>
                        {new Date(review?.postedDate).toLocaleDateString(
                          "en-US",
                          {
                            year: "numeric",
                            month: "long",
                            day: "numeric",
                          }
                        )}
                      </time>
                    )}
                  </p>
                </div>
              </div>
              <div className="flex items-center mb-2 space-x-1 rtl:space-x-reverse">
                {Array.from({ length: review?.star }, (_, index) => (
                  <svg
                  key={index}
                  className="w-6 h-6 text-yellow-400"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fillRule="evenodd"
                    d="M10 0L12.245 6.721H19.39L13.78 10.889l2.245 6.721L10 13.443l-5.025 4.168 2.244-6.721L.61 6.721h7.146L10 0z"
                    clipRule="evenodd"
                  />
                </svg>
                
                ))}
              </div>
              <p className="text-gray-900">{review?.description}</p>
            </article>
          ))}
        </div>
      )}
    </>
  );
};

export default RatingList;
