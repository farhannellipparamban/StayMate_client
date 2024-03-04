import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import {
  allRequestCancel,
  cancelRequestApproval,
} from "../../../../api/ownerApi";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import Pagination from "../../../common/Pagination";

const CancelRequest = () => {
  const [requests, setRequests] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const { owner } = useSelector((state) => state.ownerReducer);
  const dataPerPage = 5;
  const lastIndex = currentPage * dataPerPage;
  const firstIndex = lastIndex - dataPerPage;
  const reqInSinglePage = requests.slice(firstIndex, lastIndex);
  const totalPages = Math.ceil(requests.length / dataPerPage);
  const numbers = [...Array(totalPages + 1).keys()].slice(1);
  useEffect(() => {
    allRequestCancel(owner._id)
      .then((res) => {
        setRequests(res?.data?.totalRequests);
      })
      .catch((err) => {
        console.log(err.message);
      });
  }, []);
  const navigate = useNavigate();
  const handleNavigate = (data) => {
    navigate("/owner/bookingDetails", { state: { data } });
  };
  const handleApprove = async (bookingId, status) => {
    try {
      const res = await cancelRequestApproval(bookingId, status);
      if (res?.status === 200) {
        setRequests(res?.data?.totalRequests);
        toast.success(res?.data?.message);
      }
    } catch (error) {
      console.log(error.message);
    }
  };
  return (
    <>
      <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
        <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
          <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-600 dark:text-gray-900">
            <tr>
              <th scope="col" className="px-6 py-3">
                BookingID
              </th>
              <th scope="col" className="px-6 py-3">
                Room
              </th>
              <th scope="col" className="px-6 py-3">
                Cancel reason
              </th>
              <th scope="col" className="px-6 py-3">
                Details
              </th>
              <th scope="col" className="px-6 py-3">
                Action
              </th>
            </tr>
          </thead>
          <tbody>
            {reqInSinglePage && reqInSinglePage.length > 0 ? (
              reqInSinglePage.map((req) => (
                <>
                  <tr
                    key={req?._id}
                    className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600"
                  >
                    <td className="px-6 py-4">{req?._id}</td>
                    <th
                      scope="row"
                      className="flex items-center px-6 py-4 text-gray-900 whitespace-nowrap dark:text-white"
                    >
                      <img
                        className="w-10 h-10 rounded-full"
                        src={req?.room.roomImages[0]}
                        alt="Room image"
                      />
                      <div className="pl-3">
                        <div className="text-base font-semibold">
                          {req?.room.roomName}
                        </div>
                      </div>
                    </th>
                    <td className="px-6 py-4 text-black font-bold">
                      {req?.cancelReason}
                    </td>
                    <td className="px-6 py-4">
                      <button
                        type="button"
                        onClick={() => handleNavigate(req)}
                        className="text-white bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2"
                      >
                        Details
                      </button>
                    </td>

                    <td className="px-6 py-4 flex">
                      <button
                        type="button"
                        onClick={() => handleApprove(req?._id, "Approved")}
                        className="text-white bg-gradient-to-r from-green-500 via-green-600 to-green-700 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-green-300 dark:focus:ring-green-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2"
                      >
                        Approve
                      </button>
                      <button
                        type="button"
                        onClick={() => handleApprove(req?._id, "Rejected")}
                        className="text-white bg-gradient-to-r from-red-500 via-red-600 to-red-700 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-red-300 dark:focus:ring-red-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2"
                      >
                        Reject
                      </button>
                    </td>
                  </tr>
                </>
              ))
            ) : (
              <tr className="bg-white dark:bg-gray-800">
                <td
                  colSpan="5"
                  className="py-8 text-center text-gray-500 dark:text-white"
                >
                  No Requests
                </td>
              </tr>
            )}
            <Pagination
              currentPage={currentPage}
              numbers={numbers}
              setCurrentPage={setCurrentPage}
              totalPages={totalPages}
            />
          </tbody>
        </table>
      </div>
    </>
  );
};

export default CancelRequest;
