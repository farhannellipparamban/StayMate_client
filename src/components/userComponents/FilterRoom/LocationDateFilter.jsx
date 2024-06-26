import React, { useState, useEffect } from "react";
import useGoogleMapApi from "../../coustomHook/useGoogleMapApi";
import { useNavigate } from "react-router-dom";
import { filterDateLoacionRooms } from "../../../api/userApi";
import { useFormik } from "formik";
import { roomFilter } from "../../../validations/user/roomFilterValidation";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCalendar,
  faLocationDot,
  faUser,
} from "@fortawesome/free-solid-svg-icons";
import { Autocomplete } from "@react-google-maps/api";

const LocationDateFilter = ({ selectedData, setLoading }) => {
  const { isLoaded } = useGoogleMapApi();
  const [chooseLocation, setChooseLocation] = useState(
    selectedData?.chooseLocation || ""
  );
  const [locationError, setLocationError] = useState("");
  const navigate = useNavigate();

  const onSubmit = async () => {
    try {
      if (!chooseLocation.trim()) {
        setLocationError("Location is required");
        return;
      }
      setLoading(true);
      const res = await filterDateLoacionRooms({
        ...values,
        chooseLocation,
      });

      if (res?.status === 200) {
        navigate("/allRooms", {
          state: {
            filterRooms: res?.data?.rooms,
            values: { ...values, chooseLocation },
          },
        });
        console.log("hguyg");
      }
      setLoading(false);
    } catch (error) {
      setLoading(false);
      console.log(error.message);
    }
  };

  const { getFieldProps, handleSubmit,handleChange,handleBlur, values, touched, errors } = useFormik({
    initialValues: {
      CheckInDate: selectedData?.CheckInDate||"" ,
      CheckOutDate: selectedData?.CheckOutDate ||"",
      Persons:selectedData?.Persons,
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

  const minNextDay = values.CheckInDate
    ? new Date(values.CheckInDate)
    : new Date();
  minNextDay.setDate(minNextDay.getDate() + 1);
  const nextDay = minNextDay.toISOString().split("T")[0];

  return (
    <>
      <div className="bg-white shadow-lg bg-opacity-70 backdrop-filter backdrop-blur-0 border border-gray-500 border-opacity-50 rounded-lg mx-auto w-full md:p-10 mb-5 md:mb-0 mt-2">
        <form onSubmit={handleSubmit}>
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <div className="mb-4 md:mb-0 md:mr-2 w-full md:w-1/4">
              <label
                htmlFor="destination"
                className="flex items-center text-xs md:text-xl font-bold font-serif text-black"
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
                    id="chooseLocation"
                    className="text-xs md:text-sm lg:text-md font-bold text-gray-700 font-serif bg-gray-200 border-double border-gray-100 px-4 py-2 rounded-full w-full"
                    placeholder="Select place"
                    value={chooseLocation}
                    onChange={(e) => setChooseLocation(e.target.value)}
                  />
                </Autocomplete>
              )}
              {locationError && <p className="text-red-600">{locationError}</p>}
            </div>
            <div className="mb-4 md:mb-0 md:mr-4 w-full md:w-auto">
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
            <div className="mb-4 md:mb-0 md:mr-4 w-full md:w-auto">
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
                min={nextDay}
                {...getFieldProps("CheckOutDate")}
                className="text-xs md:text-sm lg:text-md text-gray-700 font-bold font-serif bg-gray-200 border-solid border-gray-300 px-4 py-2 rounded-full w-full"
              />
              {errors.CheckOutDate && touched.CheckOutDate && (
                <p className="text-red-600">{errors.CheckOutDate}</p>
              )}
            </div>
            <div className="mb-4 md:mb-0 md:mr-4 w-full md:w-auto">
              <label
                htmlFor="person"
                className="flex items-center text-xs md:text-xl font-bold font-serif text-black"
              >
                <FontAwesomeIcon icon={faUser} className="mr-2 text-gray-700" />
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
              {errors.Persons && touched.Persons && (
                <p className="text-red-600">{errors.Persons}</p>
              )}
            </div>
            <div className="w-full md:w-auto">
              <button
                type="submit"
                className="text-xs md:text-sm lg:text-lg font-bold font-serif bg-red-600 w-full md:w-auto border-solid rounded-full text-white px-4 py-2 mt-5 ml-4 hover:bg-red-700 focus:outline-none focus:bg-red-700"
              >
                Search
              </button>
            </div>
          </div>
        </form>
      </div>
    </>
  );
};

export default LocationDateFilter;
