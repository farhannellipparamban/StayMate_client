import React, { useEffect, useState } from "react";

const FilterSidebar = ({ setRooms, filterRooms, setCurrentPage }) => {
  const [searchRooms, setSearchRooms] = useState("");
  const [filterOption, setFilterOption] = useState({
    Categories: { Luxury: false, Medium: false, Normal: false },
    Amenities: { Ac: false, NonAc: false },
  });

  useEffect(() => {
    if (filterRooms) {
      const filteredRooms = filterRooms.filter((room) => {
        const { Categories, Amenities } = filterOption;
        const selectedCategories = Object.keys(Categories).filter(
          (item) => Categories[item]
        );
        const selectedAmenities = Object.keys(Amenities).filter(
          (item) => Amenities[item]
        );

        const categoryMatch =
          selectedCategories.length === 0 ||
          selectedCategories.includes(room.Categories);
        const amenitiesMatch =
          selectedAmenities.length === 0 ||
          selectedAmenities.includes(room.Amenities);

        return categoryMatch && amenitiesMatch;
      });

      setRooms(filteredRooms);
    }
    console.log(filterRooms, "jfirhwefisuh");
  }, [filterOption, filterRooms]);

  const handleCheckBoxChange = (option, item) => {
    setFilterOption((prevOption) => ({
      ...prevOption,
      [item]: {
        ...prevOption[item],
        [option]: !prevOption[item][option],
      },
    }));
  };

  const handleSearch = () => {
    const filtered = filterRooms.filter((room) =>
      room.roomName.toLowerCase().includes(searchRooms.toLowerCase())
    );
    setRooms(filtered);
    setCurrentPage(1);
  };

  const resetFilter = () => {
    setFilterOption({
      Categories: { Luxury: false, Medium: false, Normal: false },
      Amenities: { Ac: false, NonAc: false },
    });
    setSearchRooms("");
    setRooms(filterRooms);
    setCurrentPage(1);
  };

  return (
    <>
      <div className="relative mb-6 hidden md:block">
        <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
          <svg
            className="w-3 h-3 text-gray-400 dark:text-gray-400"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 20 20"
          >
            <path
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={3}
              d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
            />
          </svg>
        </div>

        <input
          type="search"
          id="search"
          value={searchRooms}
          onChange={(e) => setSearchRooms(e.target.value)}
          className="block w-full p-3 pl-8 text-sm text-black border border-gray-300 rounded-lg bg-gray-50 focus:ring-red-500 focus:border-red-500 dark:bg-gray-200 dark:border-gray-400 dark:placeholder-gray-400 dark:text-black dark:focus:ring-red-500 dark:focus:border-red-500"
          placeholder="Search Rooms"
          required=""
        />
        <button
          onClick={handleSearch}
          className="text-white absolute right-1.5 bottom-2.5 bg-red-600 hover:bg-red-700 focus:ring-4 focus:outline-none focus:ring-red-300 font-medium rounded-lg text-sm px-4 py-1 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-800"
        >
          Search
        </button>
      </div>
      <div className="flex flex-col md:flex-row justify-between mb-6">
        <h1 className="text-xl md:text-xl font-bold my-2 ">Filter</h1>
        <div className="flex flex-col md:flex-row justify-between">
          {/* Hide this button on mobile view and show the icon instead */}
          <button
            onClick={resetFilter}
            className="hidden md:block text-sm bg-red-600 px-4 font-serif font-semibold hover:bg-red-700 focus:outline-none focus:bg-red-700 border-solid rounded-full text-white"
          >
            Clear Filter
          </button>

          {/* Show this icon on mobile view */}
          <button
            onClick={resetFilter}
            className="block md:hidden text-red-600 hover:text-red-700 font-semibold focus:outline-none ml-auto -mt-8"
          >
            clear
          </button>
        </div>
      </div>
      <div className="grid gap-2 my-5">
        <h1 className="px-4 py-2 bg-black text-white font-bold rounded-md shadow-md">
          Room Categories
        </h1>
        {Object.keys(filterOption.Categories).map((option) => (
          <div
            key={option}
            className="flex items-center pl-4 border border-gray-300 rounded dark:border-gray-500 hover:bg-gray-200 dark:hover:bg-gray-200"
          >
            <input
              type="checkbox"
              checked={filterOption.Categories[option]}
              onChange={() => handleCheckBoxChange(option, "Categories")}
              className="w-5 h-5 text-blue-600 bg-gray-200 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-600 dark:border-gray-600"
            />
            <label className="w-full py-4 ml-2 text-sm font-medium text-gray-900 dark:text-gray-700">
              {option}
            </label>
          </div>
        ))}
      </div>
      <div className="grid gap-2 my-5">
        <h1 className="px-4 py-2 bg-black text-white font-bold rounded-md shadow-md">
          Amenities
        </h1>
        {Object.keys(filterOption.Amenities).map((option) => (
          <div
            key={option}
            className="flex items-center pl-4 border border-gray-300 rounded dark:border-gray-500 hover:bg-gray-200 dark:hover:bg-gray-200"
          >
            <input
              type="checkbox"
              checked={filterOption.Amenities[option]}
              onChange={() => handleCheckBoxChange(option, "Amenities")}
              className="w-5 h-5 text-blue-600 bg-gray-200 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-600 dark:border-gray-600"
            />
            <label className="w-full py-4 ml-2 text-sm font-medium text-gray-900 dark:text-gray-700">
              {option}
            </label>
          </div>
        ))}
      </div>
    </>
  );
};

export default FilterSidebar;
