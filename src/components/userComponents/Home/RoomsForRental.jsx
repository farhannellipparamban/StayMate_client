import React, { useEffect, useState } from "react";
import HomeRoomCard from "./HomeRoomCard";
import { HomeRoomList } from "../../../api/userApi";
import Loading from "../../loading/Loading";

const RoomsForRental = ({ dataRef }) => {
  const [loading, setLoading] = useState(true);
  const [roomList, setRoomList] = useState([]);
  useEffect(() => {
    HomeRoomList()
      .then((res) => {
        setRoomList(res?.data?.rooms);
        setLoading(false);
      })
      .catch((err) => {
        console.log(err.message);
      });
  }, []);
  return (
    <div className="w-full h-full bg-gray-100 -mt-6 text-center lg:text-left py-10 lg:pl-20">
      <h3 className="text-4xl font-extrabold mb-2 text-gray-800">
        Our Living Room
      </h3>
      <h3 className="text-4xl font-extrabold mb-6 text-gray-800">
        Rooms & Suites
      </h3>

      <h4
        className="text-4xl font-family:monospace
    font-style:oblique text-center font-semibold text-gray-600 p-10"
      >
        The most memorable rest time starts here.
      </h4>
      {loading ? (
        <div className="inset-0 flex w-full aspect-[2] items-center justify-center">
          <div className="spinnerouter">
            <Loading />
          </div>
        </div>
      ) : (
        <div className="flex flex-wrap justify-center gap-8 md:gap-10 lg:gap-12 xl:gap-14 -ml-20 mb-10">
          {roomList?.map((room) => (
            <div
              key={room._id}
              className="max-w-sm bg-white rounded-xl overflow-hidden shadow-lg transition duration-300 transform hover:scale-105 cursor-pointer"
            >
              <div onClick={() => dataRef?.current?.focus()}>
                <HomeRoomCard room={room} />
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default RoomsForRental;
