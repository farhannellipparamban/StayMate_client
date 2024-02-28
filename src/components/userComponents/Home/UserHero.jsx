import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faUser,
  faCalendar,
  faLocationDot,
} from "@fortawesome/free-solid-svg-icons";

const UserHero = () => {
  return (
    <>
      <div className="h-full">
        <div className="z-[1]">
          <img
            className="w-full h-screen"
            src="/images/beautiful-luxury-outdoor-swimming-pool-hotel-resort.jpg"
            alt=""
          />
        </div>

        <div className="bg-slate-100 bg-opacity-70 backdrop-filter backdrop-blur-0 border border-gray-500 border-opacity-50 rounded-lg m-auto w-full md:w-4/5 p-6 md:p-12 lg:p-20 mb-5 md:mb-0 -mt-16 z-50 relative">
          <div className="relative flex flex-col md:flex-row justify-between items-center">
            <div className="mb-2 md:mb-0 md:mr-2 w-full md:w-auto">
              <label
                htmlFor="destination"
                className="text-xs md:text-xl font-bold font-serif text-black"
              >
                <FontAwesomeIcon icon={faLocationDot} className="mr-2 text-gray-700" />
                <span>Destination</span>
              </label>
              <input
                type="text"
                id="destination"
                className="text-xs md:text-sm lg:text-lg font-bold font-serif bg-gray-200 border-double border-gray-100 px-4 py-2 rounded-full w-full"
                placeholder="Select place"
              />
            </div>
            <div className="mb-2 md:mb-0 md:mr-2 w-full md:w-auto">
              <label
                htmlFor="check-in"
                className="text-xs md:text-xl font-bold font-serif text-black"
              >
                <FontAwesomeIcon icon={faCalendar} className="mr-2 text-gray-700" />
                <span>Check in</span>
              </label>
              <input
                type="date"
                id="check-in"
                className="text-xs md:text-sm lg:text-lg text-gray-700 font-bold font-serif bg-gray-200 border-solid border-gray-300 px-4 py-2 rounded-full w-full"
              />
            </div>
            <div className="mb-2 md:mb-0 md:mr-2 w-full md:w-auto">
              <label
                htmlFor="check-out"
                className="text-xs md:text-xl font-bold font-serif text-black"
              >
                <FontAwesomeIcon icon={faCalendar} className="mx-2 text-gray-700" />
                <span>Check out</span>
              </label>
              <input
                type="date"
                id="check-out"
                className="text-xs md:text-sm lg:text-lg text-gray-700 font-bold font-serif bg-gray-200 border-solid border-gray-300 px-4 py-2 rounded-full w-full"
              />
            </div>
            <div className="w-full md:w-auto">
              <label
                htmlFor="person"
                className="flex items-center text-xs md:text-xl font-bold font-serif text-black"
              >
                <FontAwesomeIcon icon={faUser} className="mr-2 text-gray-700" />
                <span className="ml-2">Person</span>
              </label>
              <button className="text-xs md:text-sm lg:text-lg font-bold font-serif bg-red-600 w-full md:w-auto border-solid rounded-full text-white px-4 py-2 hover:bg-red-700 focus:outline-none focus:bg-red-700">
                Search
              </button>
            </div>
          </div>
        </div>

        <div className="flex flex-col md:flex-row w-full h-full">
          <div className="md:flex-1 rounded-lg overflow-hidden text-center relative">
            <img
              className="rounded-full w-full md:w-[35rem] h-[35rem] mx-auto md:mx-24 mt-4 md:mt-28 shadow-lg"
              src="/images/visualsofdana-T5pL6ciEn-I-unsplash.jpg"
              alt="image description"
            />
          </div>
          <div className="md:flex-1 mt-4 md:mt-16 py-4 md:py-32">
            <h3 className="text-2xl md:text-3xl font-bold mb-4 md:mb-14">
              About Us
            </h3>
            <p className="text-lg md:text-xl font-italic leading-relaxed mb-4 md:mb-8">
              "Welcome to our hotel! We are located in the heart of the city,
              close to all the major attractions. We offer a variety of rooms
              and amenities to suit your needs, and our staff is always happy to
              help you make your stay as comfortable as possible. Our hotel is
              the perfect place to relax and unwind after a long day of travel.
              We offer spacious rooms with all the amenities you need to feel at
              home, including a comfortable bed, a private bathroom, and a TV.
              Book your room today and start your vacation off right!"
            </p>
            <button className="bg-red-600 hover:bg-black text-white font-bold py-2 md:py-3 px-4 md:px-8 rounded-xl focus:outline-none focus:shadow-outline-blue mt-4 md:mt-16">
              Read more
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default UserHero;
