import React from "react";

const AddOffer = () => {
  // Sample rooms data
  const rooms = ["Room 1", "Room 2", "Room 3", "Room 4"];

  return (
    <div className="mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
      <form className="space-y-4">
        <div className="sm:flex sm:space-x-6">
          <div className="w-full sm:w-1/2">
            <label
              htmlFor="rooms"
              className="block text-sm font-medium text-gray-700"
            >
              Rooms:
            </label>
            <select
              id="rooms"
              required
              className="mt-1 p-2 block w-full border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
            >
              <option value="">Select a room</option>
              {rooms.map((room, index) => (
                <option key={index} value={room}>
                  {room}
                </option>
              ))}
            </select>
          </div>

          <div className="w-full sm:w-1/2">
            <label
              htmlFor="percentage"
              className="block text-sm font-medium text-gray-700"
            >
              Percentage:
            </label>
            <input
              type="number"
              id="percentage"
              required
              className="mt-1 p-2 block w-full border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
            />
          </div>
        </div>

        <div className="sm:flex sm:space-x-4">
          <div className="w-full sm:w-1/2">
            <label
              htmlFor="startDate"
              className="block text-sm font-medium text-gray-700"
            >
              Start Date:
            </label>
            <input
              type="date"
              id="startDate"
              required
              className="mt-1 p-2 block w-full border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
            />
          </div>

          <div className="w-full sm:w-1/2">
            <label
              htmlFor="expiryDate"
              className="block text-sm font-medium text-gray-700"
            >
              Expiry Date:
            </label>
            <input
              type="date"
              id="expiryDate"
              required
              className="mt-1 p-2 block w-full border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
            />
          </div>
        </div>

        <button
          type="submit"
          className="w-full bg-red-600 text-white py-2 px-4 rounded-md hover:bg-red-700 focus:outline-none focus:bg-red-700"
        >
          Add Offer
        </button>
      </form>
    </div>
  );
};

export default AddOffer;
