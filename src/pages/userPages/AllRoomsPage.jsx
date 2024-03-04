import React, { Suspense, lazy, useEffect, useState } from "react";
import UserNavbar from "../../components/userComponents/userCommon/UserNavbar";
import UserFooter from "../../components/userComponents/userCommon/UserFooter";
import Loading from "../../components/loading/Loading";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBed } from "@fortawesome/free-solid-svg-icons";
import Pagination from "../../components/common/Pagination";
import { allRoomList } from "../../api/userApi";
import { useLocation } from "react-router-dom";
import LocationDateFilter from "../../components/userComponents/FilterRoom/LocationDateFilter";

const RoomCardList = lazy(() =>
  import("../../components/userComponents/Rooms/RoomCardList")
);

const AllRoomsPage = () => {
  const [rooms, setRooms] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const location = useLocation();
  const values = location.state;

  useEffect(() => {
    setLoading(true);
    allRoomList()
      .then((res) => {
        setRooms(res?.data?.rooms);
        setLoading(false);
      })
      .catch((err) => {
        console.log(err.message);
        setLoading(false);
      });
  }, []);

  const roomPerPage = 6;
  const lastIndex = currentPage * roomPerPage;
  const firstIndex = lastIndex - roomPerPage;
  const roomsInSinglePage = rooms.slice(firstIndex, lastIndex);
  const totalPages = Math.ceil(rooms.length / roomPerPage);
  const numbers = [...Array(totalPages + 1).keys()].slice(1);

  return (
    <>
      <UserNavbar />
      {/* <LocationDateFilter selectedData={values} setLoading={setLoading} /> */}

      <Suspense
        fallback={
          <div className="flex justify-center items-center h-screen">
            <Loading />
          </div>
        }
      >
        {loading ? (
          <div className="flex h-[300px] sm:h-[600px] items-center justify-center">
            <div className="spinnerouter">
              <Loading />
            </div>
          </div>
        ) : rooms.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-[364px]">
            <FontAwesomeIcon
              icon={faBed}
              beatFade
              size="2xl"
              className="h-32 w-32"
              style={{ color: "red" }}
            />
            <p className="text-center text-2xl mt-5 font-bold text-gray-600">
              No rooms available
            </p>
          </div>
        ) : (
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(400px, 1fr))",
              gap: "1rem",
            }}
          >
            {roomsInSinglePage &&
              roomsInSinglePage.map((room) => (
                <RoomCardList key={room._id} room={room} values={values} />
              ))}
          </div>
        )}
      </Suspense>

      {totalPages > 1 && (
        <Pagination
          currentPage={currentPage}
          setCurrentPage={setCurrentPage}
          numbers={numbers}
          totalPages={totalPages}
        />
      )}
      <div className="mt-20">
        <UserFooter />
      </div>
    </>
  );
};

export default AllRoomsPage;
