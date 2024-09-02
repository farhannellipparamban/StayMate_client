import React, { Suspense, lazy, useEffect, useState } from "react";
import UserNavbar from "../../components/userComponents/userCommon/UserNavbar";
import UserFooter from "../../components/userComponents/userCommon/UserFooter";
import Loading from "../../components/loading/Loading";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBed, faSlidersH } from "@fortawesome/free-solid-svg-icons";
import Pagination from "../../components/common/Pagination";
import { allRoomList, loadOffer } from "../../api/userApi";
import { useLocation } from "react-router-dom";
import LocationDateFilter from "../../components/userComponents/FilterRoom/LocationDateFilter";
import FilterSidebar from "../../components/userComponents/FilterRoom/FilterSidebar";

const RoomCardList = lazy(() =>
  import("../../components/userComponents/Rooms/RoomCardList")
);

const AllRoomsPage = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [showFilterSidebar, setShowFilterSidebar] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const location = useLocation();
  const { filterRooms, values } = location.state || {};
  const [rooms, setRooms] = useState(filterRooms || []);
  const [offer, setOffer] = useState([]);

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

  useEffect(() => {
    setLoading(true);
    loadOffer()
      .then((res) => {
        setOffer(res?.data);
        setLoading(false);
      })
      .catch((err) => {
        console.log(err.message);
        setLoading(false);
      });
  }, []);

  const handleSearch = () => {
    const filtered = rooms.filter((room) =>
      room.roomName.toLowerCase().includes(searchQuery.toLowerCase())
    );
    setRooms(filtered);
    setCurrentPage(1);
  };

  const roomPerPage = 4;
  const lastIndex = currentPage * roomPerPage;
  const firstIndex = lastIndex - roomPerPage;
  const roomsInSinglePage = rooms.slice(firstIndex, lastIndex);
  const totalPages = Math.ceil(rooms.length / roomPerPage);
  const numbers = [...Array(totalPages + 1).keys()].slice(1);

  return (
    <>
      <div className="relative">
        <UserNavbar />
      </div>
      <div className="mx-auto flex flex-col w-full mt-7">
        {/* Mobile Search Bar */}
        <div className="md:hidden px-4 mb-4 mt-6">
          <div className="relative">
            <input
              type="search"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full p-2 pl-5 text-sm text-gray-900 border border-gray-400 rounded-full bg-gray-50 focus:ring-red-500 focus:border-red-500"
              placeholder="Search Rooms"
            />
            <button
              onClick={handleSearch}
              className="absolute right-0 bottom-0 top-0 text-white bg-red-600 hover:bg-red-700 focus:ring-4 focus:outline-none focus:ring-red-300 font-medium rounded-full text-sm px-4 py-2"
            >
              search
            </button>
          </div>
        </div>

        {/* Mobile Menu Button */}
        <div className="md:hidden flex justify-between items-center px-4">
          <button
            onClick={() => setShowFilterSidebar(true)}
            className="text-black border border-gray-300 rounded-full px-3 py-0 font-semibold "
          >
            <FontAwesomeIcon icon={faSlidersH} size="1x" className="mr-1" />
            Filter
          </button>
          <select
            className="select select-bordered border border-gray-300 rounded-full px-2 py-1 bg-gray-50 text-black hover:bg-gray-100  transition duration-200 ease-in-out"
            onChange={handleSelectChange}
          >
            <option disabled selected>
              Rent
            </option>
            <option value="Acend">Low - High</option>
            <option value="Decend">High - Low</option>
          </select>
        </div>

        {/* Mobile Filter Sidebar Modal */}
        {showFilterSidebar && (
          <div className="fixed inset-0 bg-black bg-opacity-50 z-50 md:hidden">
            <div className="bg-white w-4/5 h-full overflow-y-auto p-4">
              <button
                onClick={() => setShowFilterSidebar(false)}
                className="mb-4 text-xl"
              >
                &times; Close
              </button>
              <FilterSidebar
                setRooms={setRooms}
                filterRooms={filterRooms}
                setCurrentPage={setCurrentPage}
              />
            </div>
          </div>
        )}

        {/* Desktop Layout */}
        <div className="flex flex-col md:flex-row">
          {/* Desktop Filter Sidebar */}
          <div className="hidden md:block w-1/4 border-t-2 shadow-xl rounded-md mt-5 p-4">
            <FilterSidebar
              setRooms={setRooms}
              filterRooms={filterRooms}
              setCurrentPage={setCurrentPage}
            />
          </div>

          {/* Main Content */}
          <div className="w-full md:w-3/4 px-4 mb-5 mt-5">
            <LocationDateFilter selectedData={values} setLoading={setLoading} />

            {/* Desktop Sort Dropdown */}
            <div className="hidden md:flex items-baseline justify-between pl-4">
              <h4 className="text-3xl mt-5 font-bold text-gray-900">
                Available Rooms
              </h4>
              <select
                className="select select-bordered border border-gray-300 rounded-full px-2 py-1 bg-gray-50 text-black hover:bg-gray-100  transition duration-200 ease-in-out"
                onChange={handleSelectChange}
              >
                <option disabled selected>
                  Rent
                </option>
                <option value="Acend">Low - High</option>
                <option value="Decend">High - Low</option>
              </select>
            </div>

            <Suspense fallback={<Loading />}>
              {rooms.length === 0 ? (
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
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-4">
                  {roomsInSinglePage.map((room) => (
                    <RoomCardList
                      key={room._id}
                      room={room}
                      values={values}
                      offers={offer}
                    />
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
      </div>
      <UserFooter />
    </>
  );
};

export default AllRoomsPage;
