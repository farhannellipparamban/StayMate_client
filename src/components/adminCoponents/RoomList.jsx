import React, { useEffect, useState } from "react";
import { roomList } from "../../api/adminApi";
import Loading from "../loading/Loading";
import { Link } from "react-router-dom";
import Pagination from "../common/Pagination";

const RoomList = () => {
  const [rooms, setRooms] = useState([]);
  const [loading, setLoading] = useState(false);
  const [searchInput, setSearchInput] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const roomPerPage = 5;

  useEffect(() => {
    setLoading(true);
    roomList()
      .then((res) => {
        setRooms(res?.data?.rooms);
      })
      .catch((error) => {
        console.log(error.message);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  const handleInputChange = (e) => {
    setSearchInput(e.target.value);
    setCurrentPage(1);
  };

  const filteredData = !searchInput
    ? rooms
    : rooms.filter((room) =>
        room.roomName.toLowerCase().includes(searchInput.toLowerCase())
      );
  const lastIndex = currentPage * roomPerPage;
  const firstIndex = lastIndex - roomPerPage;
  const roomsInSinglePage = filteredData.slice(firstIndex, lastIndex);
  const totalPages = Math.ceil(filteredData.length / roomPerPage);
  const numbers = [...Array(totalPages + 1).keys()].slice(1);
  return (
    <>
      <div className="w-full md:w-3/4 px-4 mb-5 mt-5">
        <div className="p-4 border-2 border-gray-200 rounded-lg dark:border-gray-300">
          {loading ? (
            <div className="fixed inset-0 flex items-center justify-center">
              <div className="spinnerouter">
                <Loading />
              </div>
            </div>
          ) : (
            <>
              <div className="relative shadow-md sm:rounded-lg">
                <h1 className="text-3xl pt-2">Room List</h1>
                <div className="flex items-center justify-end py-4 bg-gray-400 gray:bg-gray-700">
                  <label htmlFor="table-search" className="sr-only">
                    Search
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                      <svg
                        className="w-4 h-4 text-gray-500 dark:text-gray-400"
                        aria-hidden="true"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 20 20"
                      >
                        <path
                          stroke="currentColor"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
                        />
                      </svg>
                    </div>
                    <input
                      type="text"
                      id="table-search-Rooms"
                      value={searchInput}
                      onChange={handleInputChange}
                      className="block p-2 pl-10 text-sm text-gray-900 border border-gray-300 rounded-lg w-80 bg-white focus:ring-blue-900 focus:border-blue-900 white:bg-gray-700 white:border-gray-600 white:placeholder-gray-900 white:text-black white:focus:ring-blue-900 white:focus:border-blue-900"
                      placeholder="Search for rooms"
                    />
                  </div>
                </div>
                <div className="overflow-x-auto">
                  <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-400">
                    <thead className="bg-gray-50 dark:bg-gray-300">
                      <tr className="text-xs text-gray-700 dark:text-gray-600 uppercase">
                        <th scope="col" className="px-6 py-3">
                          Room Name
                        </th>
                        <th scope="col" className="px-6 py-3">
                          Owner Name
                        </th>
                        <th scope="col" className="px-6 py-3">
                          Room Model
                        </th>
                        <th scope="col" className="px-6 py-3">
                          Room Rent
                        </th>
                        <th scope="col" className="px-6 py-3">
                          Verification
                        </th>
                        <th scope="col" className="px-6 py-3">
                          Action
                        </th>
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200 dark:bg-gray-200 dark:divide-gray-300">
                      {roomsInSinglePage.length > 0 ? (
                        roomsInSinglePage.map((room) => (
                          <tr
                            key={room?._id}
                            className="text-sm text-gray-900 dark:text-dark"
                          >
                            <td className="px-6 py-4 whitespace-nowrap">
                              <div className="flex items-center">
                                <img
                                  className="w-12 h-12 rounded-full mr-4"
                                  src={room?.roomImages[0]}
                                  alt="RoomImage"
                                />
                                <div>
                                  <div className="font-semibold">
                                    {room?.roomName}
                                  </div>
                                </div>
                              </div>
                            </td>
                            <td className="px-6 py-4">{room?.ownerId.name}</td>
                            <td className="px-6 py-4">{room?.model}</td>
                            <td className="px-6 py-4">₹ {room?.rent}</td>
                            <td className="px-6 py-4">
                              <div className="flex items-center">
                                {room?.verificationStatus === "Pending" && (
                                  <div className="h-2 w-2 rounded-full bg-orange-500 mr-2 animate-ping"></div>
                                )}
                                {room?.verificationStatus === "Pending" && (
                                  <span className="text-orange-500">
                                    Pending
                                  </span>
                                )}
                                {room?.verificationStatus === "Approved" && (
                                  <div className="h-2 w-2 rounded-full bg-green-500 mr-2"></div>
                                )}
                                {room?.verificationStatus === "Approved" && (
                                  <span className="text-green-500">
                                    Approved
                                  </span>
                                )}
                                {room?.verificationStatus === "Rejected" && (
                                  <div className="h-2 w-2 rounded-full bg-red-600 mr-2"></div>
                                )}
                                {room?.verificationStatus === "Rejected" && (
                                  <span className="text-red-600">Rejected</span>
                                )}
                              </div>
                            </td>
                            <td className="px-6 py-4">
                              <div className="flex items-center">
                                {room?.verificationStatus === "Pending" ? (
                                  <Link
                                    to={`/admin/roomDetails/${room?._id}`}
                                    className="bg-green-500 text-white font-medium py-2 px-4 rounded-full hover:bg-green-600 inline-block"
                                  >
                                    Verify Room
                                  </Link>
                                ) : (
                                  <>
                                    {room?.verificationStatus ===
                                      "Approved" && (
                                      <Link
                                        to={`/admin/roomDetails/${room?._id}`}
                                        className="bg-black text-white font-medium py-2 px-4 rounded-full hover:bg-gray-600 inline-block"
                                      >
                                        Room Details
                                      </Link>
                                    )}
                                    {room?.verificationStatus ===
                                      "Rejected" && (
                                      <Link
                                        to={`/admin/roomDetails/${room?._id}`}
                                        className="bg-red-500 text-white font-medium py-2 px-4 rounded-full hover:bg-red-600 inline-block"
                                      >
                                        Room Details
                                      </Link>
                                    )}
                                  </>
                                )}
                              </div>
                            </td>
                          </tr>
                        ))
                      ) : (
                        <tr>
                          <td
                            colSpan="6"
                            className="px-6 py-4 text-center text-gray-900 dark:text-dark"
                          >
                            No rooms
                          </td>
                        </tr>
                      )}
                    </tbody>
                  </table>
                </div>
              </div>
              <Pagination
                totalPages={totalPages}
                numbers={numbers}
                setCurrentPage={setCurrentPage}
                currentPage={currentPage}
              />
            </>
          )}
        </div>
      </div>
    </>
  );
};

export default RoomList;
