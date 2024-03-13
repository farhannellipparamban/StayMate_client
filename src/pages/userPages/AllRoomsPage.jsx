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
import FilterSidebar from "../../components/userComponents/FilterRoom/FilterSidebar";

const RoomCardList = lazy(() =>
  import("../../components/userComponents/Rooms/RoomCardList")
);

const AllRoomsPage = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const location = useLocation();
  const { filterRooms, values } = location.state || {};
  const [rooms, setRooms] = useState(filterRooms || []);

  const handleSelectChange = (e) => {
    const selectedValue = e.target.value;
    let sortedRooms = [...rooms];
    if (selectedValue === "Acend") {
      sortedRooms.sort((a, b) => a.rent - b.rent);
    } else if (selectedValue === "Decend") {
      sortedRooms.sort((a, b) => b.rent - a.rent);
    }

    setRooms(sortedRooms);
  };
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

  const roomPerPage = 4;
  const lastIndex = currentPage * roomPerPage;
  const firstIndex = lastIndex - roomPerPage;
  const roomsInSinglePage = rooms.slice(firstIndex, lastIndex);
  const totalPages = Math.ceil(rooms.length / roomPerPage);
  const numbers = [...Array(totalPages + 1).keys()].slice(1);

  return (
    <>
      <UserNavbar />
      <div className="mx-auto flex w-full mt-5">
        <div className=" w-1/5 hidden border-t-2 shadow-xl md:flex rounded-md mt-5">
          <div className="p-4 w-full">
            <FilterSidebar setRooms={setRooms} filterRooms={filterRooms} />
          </div>
        </div>
        <div className="w-full md:w-3/4 px-4 mb-5 mt-5 ">
          <div className="drawer flex md:hidden z-10">
            {/* <div className="drawer-content flex justify-end pb-6">
              <FontAwesomeIcon
                className="w-10 h-10"
                size="2xl"
                icon={faBars}
                style={{ color: "#3f85f8" }}
              />
            </div> */}
            <div className="drawer-side">
              <label
                htmlFor="my-drawer"
                aria-label="close sidebar"
                className="drawer-overlay"
              ></label>

              <div className="p-4 w-80 min-h-full bg-white text-base-content">
                <FilterSidebar
                  setRooms={setRooms}
                  filterRooms={filterRooms}
                  setCurrentPage={setCurrentPage}
                />
              </div>
            </div>
          </div>

          <LocationDateFilter selectedData={values} setLoading={setLoading} />
          <div className=" flex items-baseline justify-between pl-4 mb-4">
            <h4 className="text-3xl mt-5 font-bold text-gray-900">
              Available Rooms
            </h4>
            <select
              className="select select-bordered w-[100px]"
              onChange={handleSelectChange}
            >
              <option disabled selected>
                Rent
              </option>
              <option value="Acend">Low - High</option>
              <option value="Decend">High - low</option>
            </select>
          </div>

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
        </div>
      </div>
      <UserFooter />
    </>
  );
};

export default AllRoomsPage;
