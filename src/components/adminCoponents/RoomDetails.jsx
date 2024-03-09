import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { singleRoomDetails, verifyRoom } from "../../api/adminApi";
import { toast } from "react-toastify";
import Loading from "../loading/Loading";

const RoomDetails = () => {
  const { roomId } = useParams();
  const [loading, setLoading] = useState(false);
  const [room, setRooom] = useState();

  useEffect(() => {
    setLoading(true);
    singleRoomDetails(roomId)
      .then((res) => {
        setLoading(false);
        setRooom(res?.data.room);
      })
      .catch((err) => {
        setLoading(false);
        console.log(err.message);
      });
  }, [roomId]);

  const handleApprove = async () => {
    try {
      setLoading(true);
      const res = await verifyRoom(roomId, "approve");
      if (res?.status === 200) {
        setRooom(res?.data?.room);
        toast.success(res?.data?.succMessage);
      }
      setLoading(false);
    } catch (error) {
      setLoading(false);
      console.log(error.message);
      toast.error(error.response?.data?.message);
    }
  };

  const handleReject = async () => {
    try {
      setLoading(true);
      const res = await verifyRoom(roomId, "reject");
      if (res?.status === 200) {
        setRooom(res?.data?.room);
        toast.error(res?.data?.errMessage);
      }
      setLoading(false);
    } catch (error) {
      setLoading(false);
      console.log(error.message);
      toast.error(error.response?.data?.message);
    }
  };
  return (
    <>
      {loading ? (
        <div className="fixed inset-0 flex items-center justify-center">
          <div className="spinnerouter">
            <Loading />
          </div>
        </div>
      ) : (
        <div className="w-full md:w-3/4 px-4 mb-5 mt-5 font-serif">
          <div className="p-4 border border-gray-200 rounded-lg dark:border-gray-300">
            <div className="bg-white p-4 shadow-xl rounded-lg">
              <div className="flex flex-col md:flex-row items-center justify-between mb-4">
                <h2 className="text-xl font-semibold mb-2 md:mb-0">
                  Room Details
                </h2>
                {room?.verificationStatus === "Pending" && (
                  <div className="flex justify-end mt-4 md:mt-0">
                    <button
                      onClick={handleApprove}
                      className="bg-green-500 text-white py-2 px-4 rounded-md hover:bg-green-600 mr-2"
                    >
                      Approve
                    </button>
                    <button
                      onClick={handleReject}
                      className="bg-red-500 text-white py-2 px-4 rounded-md hover:bg-red-600"
                    >
                      Reject
                    </button>
                  </div>
                )}
              </div>
              <hr className="border-t border-gray-300 mb-4" />
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="bg-white shadow-lg rounded-lg overflow-hidden">
                  <img
                    src={room?.roomImages[0]}
                    alt="Room Image"
                    className="w-full h-full object-cover object-center"
                    style={{ aspectRatio: "16/9" }} 
                  />
                </div>

                <div className="col-span-2 px-6 py-4">
                  <h2 className="text-4xl text-center md:text-left font-semibold mb-8 text-red-600">
                    {room?.roomName}
                  </h2>
                  <p className="text-black mb-2">
                    <strong>Owner Name :</strong> {room?.ownerId?.name}
                  </p>
                  <p className="text-black mb-2">
                    <strong>Location :</strong> {room?.location}
                  </p>
                  <p className="text-black mb-2">
                    <strong>Model :</strong> {room?.model}
                  </p>
                  <p className="text-black mb-2">
                    <strong>Available :</strong> {room?.acType}
                  </p>
                  <p className="text-black mb-2">
                    <strong>Room Type :</strong> {room?.roomType}
                  </p>
                  
                  <p>
                    <strong>Verification status :</strong>{" "}
                    <span
                      className={`pl-3 text-1xl ${
                        room?.verificationStatus === "Approved"
                          ? "text-green-500"
                          : room?.verificationStatus === "Rejected"
                          ? "text-red-500"
                          : room?.verificationStatus === "Pending"
                          ? "text-orange-600"
                          : "text-gray-700"
                      }`}
                    >
                      {room?.verificationStatus}
                    </span>
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default RoomDetails;
