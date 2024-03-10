import React, { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCalendar,
  faLocationDot,
  faUser,
} from "@fortawesome/free-solid-svg-icons";
import useGoogleMapApi from "../../coustomHook/useGoogleMapApi";
import { Link, useNavigate } from "react-router-dom";
import { filterDateLoacionRooms } from "../../../api/userApi";
import { useFormik } from "formik";
import { roomFilter } from "../../../validations/user/roomFilterValidation";
import { Autocomplete } from "@react-google-maps/api";
import "./UserHero.css";

const UserHero = ({ dataRef }) => {
  const { isLoaded } = useGoogleMapApi();
  const [chooseLocation, setChooseLocation] = useState("");
  const [loactionError, setLocationError] = useState("");
  const navigate = useNavigate();

  const onSubmit = async () => {
    try {
      if (!chooseLocation.trim()) {
        setLocationError("Location is required");
        return;
      }

      const res = await filterDateLoacionRooms({
        ...values,
        chooseLocation,
      });
      console.log(res);
      if (res?.status === 200) {
        navigate("/allRooms", {
          state: {
            filterRooms: res?.data?.rooms,
            values: { ...values, chooseLocation },
          },
        });
      }
      setChooseLocation("");
    } catch (error) {
      console.log(error.message);
    }
  };

  const { getFieldProps, values, errors, touched, handleSubmit,handleChange,handleBlur } = useFormik({
    initialValues: {
      CheckInDate: "",
      CheckOutDate: "",
      Persons:"",
    },
    validationSchema: roomFilter,
    onSubmit,
  });

  const handleAutoComplete = (id, setValues) => {
    if (isLoaded) {
      const autocomplete = new window.google.maps.places.Autocomplete(
        document.getElementById(id),
        {
          componentRestrictions: { country: "IN" },
          types: ["(cities)"],
        }
      );

      autocomplete.addListener("place_changed", () => {
        const place = autocomplete.getPlace();
        setValues(place.name);
        setLocationError("");
      });
    }
  };

  useEffect(() => {
    handleAutoComplete("chooseLocation", setChooseLocation);
  }, [isLoaded]);
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
          <form onSubmit={handleSubmit}>
            <div className="relative flex flex-col md:flex-row justify-between items-center">
              <div className="md:mb-0 md:mr-2 w-full mb-4 md:w-1/4">
                <label
                  htmlFor="destination"
                  className="text-xs md:text-xl font-bold font-serif text-black"
                >
                  <FontAwesomeIcon
                    icon={faLocationDot}
                    className="mr-2 text-gray-700"
                  />
                  <span>Destination</span>
                </label>
                {isLoaded && (
                  <Autocomplete>
                    <input
                      type="text"
                      ref={dataRef}
                      id="chooseLocation"
                      className="text-xs md:text-sm lg:text-md font-bold text-gray-700 font-serif bg-gray-200 border-double border-gray-100 px-4 py-2 rounded-full w-full"
                      placeholder="Select place"
                      value={chooseLocation}
                      onChange={(e) => setChooseLocation(e.target.value)}
                    />
                  </Autocomplete>
                )}
                {loactionError && (
                  <p className="text-red-600">{loactionError}</p>
                )}
              </div>
              <div className="md:mb-0 md:mr-2 w-full mb-4 md:w-1/4">
                <label
                  htmlFor="check-in"
                  className="text-xs md:text-xl font-bold font-serif text-black"
                >
                  <FontAwesomeIcon
                    icon={faCalendar}
                    className="mr-2 text-gray-700"
                  />
                  <span>Check in</span>
                </label>
                <input
                  type="date"
                  id="CheckInDate"
                  min={new Date().toISOString().split("T")[0]}
                  {...getFieldProps("CheckInDate")}
                  className="text-xs md:text-sm lg:text-md text-gray-700 font-bold font-serif bg-gray-200 border-solid border-gray-300 px-4 py-2 rounded-full w-full"
                />
                {errors.CheckInDate && touched.CheckInDate && (
                  <p className="text-red-600">{errors.CheckInDate}</p>
                )}
              </div>
              <div className="md:mb-0 md:mr-2 w-full mb-4 md:w-1/4">
                <label
                  htmlFor="check-out"
                  className="text-xs md:text-xl font-bold font-serif text-black"
                >
                  <FontAwesomeIcon
                    icon={faCalendar}
                    className="mx-2 text-gray-700"
                  />
                  <span>Check out</span>
                </label>
                <input
                  type="date"
                  id="CheckOutDate"
                  min={values.CheckInDate}
                  {...getFieldProps("CheckOutDate")}
                  className="text-xs md:text-sm lg:text-md text-gray-700 font-bold font-serif bg-gray-200 border-solid border-gray-300 px-4 py-2 rounded-full w-full"
                />
                {errors.CheckOutDate && touched.CheckOutDate && (
                  <p className="text-red-600">{errors.CheckOutDate}</p>
                )}
              </div>
              <div className="md:mb-0 md:mr-2 w-full mb-4 md:w-1/4">
                <label
                  htmlFor="person"
                  className="flex items-center text-xs md:text-xl font-bold font-serif text-black"
                >
                  <FontAwesomeIcon
                    icon={faUser}
                    className="mr-2 text-gray-700"
                  />
                  <span className="ml-2">Person</span>
                </label>
                <input
                  type="number"
                  id="Persons"
                  name="Persons"
                  placeholder="Number of Persons"
                  value={values.Persons}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  className="text-xs md:text-sm lg:text-md text-gray-700 font-bold font-serif bg-gray-200 border-solid border-gray-300 px-4 py-2 rounded-full w-full"
                />
                
              </div>
              <div className="w-full md:w-auto">
                <button
                  type="submit"
                  className="text-xs mt-7 md:text-sm lg:text-lg font-bold font-serif bg-red-600 w-full md:w-auto border-solid rounded-full text-white px-4 py-2 hover:bg-red-700 focus:outline-none focus:bg-red-700"
                >
                  Search
                </button>
              </div>
            </div>
          </form>
        </div>

        <div className="flex flex-col md:flex-row w-full h-full">
          <div className="md:flex-1 rounded-lg overflow-hidden text-center relative ">
            <img
              className="img rounded-full w-full md:w-[35rem] h-[35rem] mx-auto md:mx-24 mt-4 md:mt-28 shadow-lg"
              src="/images/visualsofdana-T5pL6ciEn-I-unsplash.jpg"
              alt="image description"
            />
          </div>
          <div className="main md:flex-1 mt-4 md:mt-16 py-4 md:py-32">
            <h3 className="heading text-2xl md:text-3xl font-bold mb-4 md:mb-14">
              About Us
            </h3>
            <p className="para text-lg md:text-xl font-italic leading-relaxed mb-4 md:mb-8">
              "Welcome to our hotel! We are located in the heart of the city,
              close to all the major attractions. We offer a variety of rooms
              and amenities to suit your needs, and our staff is always happy to
              help you make your stay as comfortable as possible. Our hotel is
              the perfect place to relax and unwind after a long day of travel.
              We offer spacious rooms with all the amenities you need to feel at
              home, including a comfortable bed, a private bathroom, and a TV.
              Book your room today and start your vacation off right!"
            </p>
            <Link to="/about">
              <button className="btn bg-red-600 hover:bg-black text-white font-bold py-2 md:py-3 px-4 md:px-8 rounded-xl focus:outline-none focus:shadow-outline-blue mt-4 md:mt-16">
                Read more
              </button>
            </Link>
          </div>
        </div>
      </div>
    </>
  );
};

export default UserHero;
