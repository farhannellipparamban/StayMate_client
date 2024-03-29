import React, { useEffect, useState } from "react";
import {
  Card,
  CardHeader,
  CardBody,
  Typography,
} from "@material-tailwind/react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBed } from "@fortawesome/free-solid-svg-icons";
import Pagination from "../../common/Pagination";
import { Link, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";
import { MyRoomsList, RoomBlock } from "../../../api/ownerApi";
import Loading from "../../loading/Loading";
import { Button } from "flowbite-react";

const RoomsList = () => {
  const { _id } = useSelector((state) => state.ownerReducer.owner);
  const [rooms, setRooms] = useState([]);
  const [loading, setLoading] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchInput, setSearchInput] = useState("");
  const navigate = useNavigate();
  const ownerId = _id;
  const roomperpage = 2;

  useEffect(() => {
    setLoading(true);
    MyRoomsList(ownerId)
      .then((res) => {
        setLoading(false);
        setRooms(res?.data?.rooms);
      })
      .catch((error) => {
        setLoading(false);
        console.log(error.message);
        if (error.response?.status) {
          navigate("/owner/login");
          toast.error(error.response?.data?.message);
        }
      });
  }, []);

  const blockUnblockRoom = async (roomId, status) => {
    try {
      const res = await RoomBlock(roomId, status);
      if (res.status === 200) {
        let updatedData = rooms.map((room) => {
          let roomData = { ...room };
          if (roomData._id === roomId) {
            roomData.isBlocked = !status;
          }
          return roomData;
        });
        setRooms(updatedData);
        setShowModal(null);
        toast.success(res?.data?.message);
      }
    } catch (error) {
      toast.error(error.response?.data?.message);
      console.log(error.message);
    }
  };

  const openModal = (roomId) => {
    setShowModal(roomId);
  };

  const closeModal = () => {
    setShowModal(null);
  };

  const handleInputChange = (e) => {
    setSearchInput(e.target.value);
    setCurrentPage(1);
  };

  const filteredData = !searchInput
    ? rooms
    : rooms.filter((room) => {
        room.roomName.toLowerCase().includes(searchInput.toLowerCase());
      });
  const lastIndex = currentPage * roomperpage;
  const firstIndex = lastIndex - roomperpage;
  const roomsInSinglePage = filteredData.slice(firstIndex, lastIndex);
  const totalPages = Math.ceil(filteredData.length / roomperpage);
  const numbers = [...Array(totalPages + 1).keys()].slice(1);
  return (
    <>
      <div className="w-full md:w-3/4 px-4 mb-5 mt-5">
        <div className="p-4 border-2 border-gray-200 rounded-lg dark:border-gray-300">
          {loading ? (
            <div className="inset-0 flex w-full aspect-[2] items-center justify-center">
              <div className="spinnerouter">
                <Loading />
              </div>
            </div>
          ) : (
            <div>
              <div className="flex justify-between items-center bg-white p-4 mb-8">
                <div className="flex flex-col">
                  <h1 className="text-2xl font-semibold mb-7 text-black font-serif">
                    Rooms
                  </h1>
                  <button
                    onClick={() => navigate("/owner/addroom")}
                    className="text-lg font-serif font-semibold bg-red-600 hover:bg-red-700 text-white py-2 px-4 rounded-full shadow-md hover:shadow-lg transition duration-300 ease-in-out"
                  >
                    Add Rooms
                  </button>
                </div>

                <div className="flex mt-14 items-center justify-end">
                  <label htmlFor="table-search" className="sr-only">
                    Search
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                      <svg
                        className="w-4 h-4 text-gray-500 dark:text-gray-600"
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
              </div>

              {filteredData.length === 0 && (
                <div className="flex flex-col items-center justify-center h-[364px]">
                  <FontAwesomeIcon
                    icon={faBed}
                    beatFade
                    size="2xl"
                    className="h-16 w-16"
                    style={{ color: "red" }}
                  />
                  <p className="text-center text-2xl mt-5 font-bold text-red-600 font-mono">
                    No rooms available
                  </p>
                </div>
              )}

              {filteredData.length > 0 &&
                roomsInSinglePage.map((room) => {
                  return (
                    <>
                      <Card
                        className="w-full max-w-[80rem] mb-6 flex-row "
                        key={room._id}
                      >
                        <CardHeader
                          shadow={false}
                          floated={false}
                          className="m-0 w-2/5 shrink-0 rounded-r-none"
                        >
                          <img
                            src={room.roomImages[0]}
                            alt="card-image"
                            className="h-96  object-cover"
                          />
                        </CardHeader>

                        <CardBody>
                          <Typography
                            variant="h4"
                            color="gray"
                            className="mb-4 uppercase text-red-600 font-serif"
                          >
                            {room.roomName}
                          </Typography>
                          <Typography
                            variant="h6"
                            color="blue-gray"
                            className="mb-2"
                          >
                            Price / day : {room.rent} Rs
                          </Typography>
                          <Typography
                            variant="h6"
                            color="blue-gray"
                            className="mb-2"
                          >
                            Location : {room.location}
                          </Typography>
                          <Typography
                            variant="h6"
                            color="blue-gray"
                            className="mb-2"
                          >
                            {room.acType} Room
                          </Typography>
                          <Typography
                            variant="h6"
                            color="blue-gray"
                            className="mb-2"
                          >
                            Model : {room.model}
                          </Typography>
                          <Typography
                            variant="h6"
                            color="blue-gray"
                            className="mb-2"
                          >
                            <div className="flex items-center">
                              <span className="mr-2">Verification Status:</span>
                              {room?.verificationStatus === "Pending" && (
                                <div className="h-3 w-3 rounded-full bg-orange-600 mr-2 animate-ping"></div>
                              )}
                              {room?.verificationStatus === "Pending" && (
                                <span className="text-orange-600">Pending</span>
                              )}
                              {room?.verificationStatus === "Approved" && (
                                <div className="h-3 w-3 rounded-full bg-green-500 mr-2"></div>
                              )}
                              {room?.verificationStatus === "Approved" && (
                                <span className="text-green-500">Approved</span>
                              )}
                              {room?.verificationStatus === "Rejected" && (
                                <div className="h-3 w-3 rounded-full bg-red-600 mr-2"></div>
                              )}
                              {room?.verificationStatus === "Rejected" && (
                                <span className="text-red-600">Rejected</span>
                              )}
                            </div>
                          </Typography>

                          <div className="flex justify-start gap-3 mt-10">
                            <Link
                              to={`/owner/editRoom/${room._id}`}
                              className="inline-block"
                            >
                              <Button
                                variant="text"
                                className="flex bg-black items-center gap-2"
                              >
                                Edit room
                              </Button>
                            </Link>

                            {room?.isBlocked ? (
                              <button
                                type="button"
                                onClick={() => openModal(room?._id)}
                                className="focus:outline-none w-24 text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800"
                              >
                                Unlist
                              </button>
                            ) : (
                              <button
                                type="button"
                                onClick={() => openModal(room?._id)}
                                className="focus:outline-none w-24 text-white bg-red-700 hover-bg-red-800  focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-900"
                              >
                                List
                              </button>
                            )}
                            <div
                              id={`popup-modal-${room?._id}`}
                              tabIndex={-1}
                              className={`fixed top-0 left-0 right-0 bottom-0 z-50 flex items-center justify-center p-4 overflow-x-hidden overflow-y-auto md:inset-0 max-h-full ${
                                showModal === room?._id ? "" : "hidden"
                              }`}
                            >
                              <div className="relative w-full max-w-md max-h-full">
                                <div className="relative bg-white rounded-lg shadow dark:bg-gray-700">
                                  <button
                                    type="button"
                                    className="absolute top-3 right-2.5 text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ml-auto inline-flex justify-center items-center dark:hover-bg-gray-600 dark:hover-text-white"
                                    data-modal-hide={`popup-modal-${room?._id}`}
                                    onClick={() => closeModal()}
                                  >
                                    <svg
                                      className="w-3 h-3"
                                      aria-hidden="true"
                                      xmlns="http://www.w3.org/2000/svg"
                                      fill="none"
                                      viewBox="0 0 14 14"
                                    >
                                      <path
                                        stroke="currentColor"
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth={2}
                                        d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
                                      />
                                    </svg>
                                    <span className="sr-only">Close modal</span>
                                  </button>
                                  <div className="p-6 text-center">
                                    <svg
                                      className="mx-auto mb-4 text-gray-400 w-12 h-12 dark:text-gray-200"
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
                                        d="M10 11V6m0 8h.01M19 10a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
                                      />
                                    </svg>
                                    {room?.isBlocked ? (
                                      <h3 className="mb-5 text-lg font-normal text-gray-500 dark:text-gray-400">
                                        Are you sure you want to Unblock this{" "}
                                        {room?.name}?
                                      </h3>
                                    ) : (
                                      <h3 className="mb-5 text-lg font-normal text-gray-500 dark:text-gray-400">
                                        Are you sure you want to Block this{" "}
                                        {room?.name}?
                                      </h3>
                                    )}
                                    <button
                                      data-modal-hide={`popup-modal-${room?._id}`}
                                      type="button"
                                      onClick={() =>
                                        blockUnblockRoom(
                                          room?._id,
                                          room?.isBlocked
                                        )
                                      }
                                      className="text-white bg-red-600 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300 dark:focus:ring-red-800 font-medium rounded-lg text-sm inline-flex items-center px-5 py-2.5 text-center mr-2"
                                    >
                                      Yes, I'm sure
                                    </button>
                                    <button
                                      data-modal-hide={`popup-modal-${room?._id}`}
                                      type="button"
                                      onClick={() => closeModal()}
                                      className="text-gray-500 bg-white hover:bg-gray-100 focus:ring-4 focus:outline-none focus:ring-gray-200 rounded-lg border border-gray-200 text-sm font-medium px-5 py-2.5 hover:text-gray-900 focus:z-10 dark:bg-gray-700 dark:text-gray-300 dark:border-gray-500 dark:hover-text-white dark:hover-bg-gray-600 dark:focus:ring-gray-600"
                                    >
                                      No, cancel
                                    </button>
                                  </div>
                                </div>
                              </div>
                            </div>

                            <Button
                              variant="text"
                              onClick={() =>
                                navigate("/owner/reviewsList", {
                                  state: { room },
                                })
                              }
                              className="flex bg-black items-center gap-2 text-sm py-1 px-2 rounded-lg"
                            >
                              Get Reviews
                            </Button>
                          </div>
                        </CardBody>
                      </Card>
                    </>
                  );
                })}

              {filteredData.length > roomperpage && (
                <Pagination
                  totalPages={totalPages}
                  numbers={numbers}
                  setCurrentPage={setCurrentPage}
                  currentPage={currentPage}
                />
              )}
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default RoomsList;
