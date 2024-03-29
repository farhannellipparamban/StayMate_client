import React from 'react'

const ReviewList = ({room}) => {

  return (
    <div className="w-full md:w-3/4 px-4 mb-5 mt-5">
    <div className="p-4 border-2 border-gray-200 border-solid rounded-lg dark:border-gray-400">
      <h1 className="text-3xl px-3 mb-5 mt-5 font-serif">Ratings</h1>
      <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
        <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
          <thead className="text-xs text-gray-900 uppercase bg-gray-50 dark:bg-gray-500 dark:text-gray-900">
            <tr>
              <th scope="col" className="px-6 py-3">
                Room
              </th>
              <th scope="col" className="px-6 py-3">
                Postedby
              </th>
              <th scope="col" className="px-6 py-3">
                Description
              </th>
              <th scope="col" className="px-6 py-3">
                Rating
              </th>
            </tr>
          </thead>
          <tbody>
            {room && room?.ratings && room?.ratings?.length > 0 ? (
              room?.ratings?.map((rate) => (
                <tr
                  key={rate._id}
                  className="bg-white border-b dark:bg-gray-400 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600"
                >
                  <th
                    scope="row"
                    className="flex items-center px-6 py-4 text-gray-900 whitespace-nowrap dark:text-white"
                  >
                    <img
                      className="w-10 h-10 rounded-full"
                      src={room?.roomImages[0]}
                      alt="Room image"
                    />
                    <div className="pl-3">
                      <div className="text-base font-semibold">
                        {room?.roomName}
                      </div>
                    </div>
                  </th>
                  <td className="px-6 py-4 text-black font-bold ">
                    {rate?.postedBy?.name}
                  </td>
                  <td className="px-6 py-4 text-black italic font-semibold">
                    {rate?.description}
                  </td>

                  <td className="px-6 py-4">
                    <div className="flex items-center">
                      <svg
                        className="w-4 h-4 text-yellow-400 mr-1"
                        aria-hidden="true"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="currentColor"
                        viewBox="0 0 22 20"
                      >
                        <path d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z" />
                      </svg>
                      <p className="ml-2 text-sm font-bold text-gray-900 dark:text-white">
                        {rate?.star}
                      </p>
                    </div>
                  </td>
                </tr>
              ))
            ) : (
              <tr className="bg-white dark:bg-gray-400">
                <td
                  colSpan="4"
                  className="py-8 text-center text-gray-500 dark:text-white font-bold"
                >
                  No reviews
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  </div>
  )
}

export default ReviewList
