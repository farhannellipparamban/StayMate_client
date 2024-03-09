import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { roomAddRequest,  verifyRoom } from "../../api/adminApi";
import Pagination from "../common/Pagination";
import Loading from "../loading/Loading";
const RoomAddRequest = () => {
  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const dataPerPage = 5;
  const lastIndex = currentPage * dataPerPage;
  const firstIndex = lastIndex - dataPerPage;
  const reqInSinglePage = requests.slice(firstIndex, lastIndex);
  const totalPages = Math.ceil(requests.length / dataPerPage);
  const numbers = [...Array(totalPages + 1).keys()].slice(1);
  useEffect(() => {
    roomAddRequest()
      .then((res) => {
        setRequests(res?.data?.totalRequests);
      })
      .catch((err) => {
        console.log(err.message);
      });
  
  }, [requests]);
 
  const navigate = useNavigate();
  const handleNavigate = (data) => {
    navigate(`/admin/roomDetails/${data?._id}`);
  };
  
  const handleApprove = async (roomId) => {
    try {
      setLoading(true);
      const res = await verifyRoom(roomId, "approve");
      if (res?.status === 200) {
        toast.success(res?.data?.succMessage);
        // setRequests((prevRequests) =>
        //   prevRequests.filter((req) => req._id !== roomId)
        // );
      }
      setLoading(false);
    } catch (error) {
      setLoading(false);
      console.log(error.message);
      toast.error(error.response?.data?.message);
    }
  };

  const handleReject = async (roomId) => {
    try {
      setLoading(true);
      const res = await verifyRoom(roomId, "reject");
      if (res?.status === 200) {
        toast.error(res?.data?.errMessage);
        // setRequests((prevRequests) =>
        //   prevRequests.filter((req) => req._id !== roomId)
        // );
      }
      setLoading(false);
    } catch (error) {
      setLoading(false);
      console.log(error.message);
      toast.error(error.response?.data?.message);
    }
  };
  return (
    <>
      {loading ? (
        <div className="fixed inset-0 flex items-center justify-center">
          <div className="spinnerouter">
            <Loading />
          </div>
        </div>
      ) : (
        <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
          <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
            <thead className="text-xs text-gray-900 uppercase bg-gray-50 dark:bg-gray-500 dark:text-gray-900">
              <tr>
                <th scope="col" className="px-9 py-3">
                  RoomID
                </th>
                <th scope="col" className="px-9 py-3">
                  Room
                </th>
            
                <th scope="col" className="px-9 py-3">
                  Details
                </th>
                <th scope="col" className="px-9 py-3">
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
                      className="bg-white text-black border-b dark:bg-gray-300 dark:border-gray-400 hover:bg-gray-50 dark:hover:bg-gray-200"
                    >
                      <td className="px-6 py-4">{req?._id}</td>
                      <th
                        scope="row"
                        className="flex items-center px-6 py-4 text-gray-900 whitespace-nowrap dark:text-black"
                      >
                        <img
                          className="w-10 h-10 rounded-full"
                          src={req?.roomImages[0]}
                          alt="Room image"
                        />
                        <div className="pl-3">
                          <div className="text-base font-semibold">
                            {req?.roomName}
                          </div>
                        </div>
                      </th>
                     
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
                        
                        {req?.verificationStatus === "Pending" && (
                          <>
                            <button
                              onClick={() => handleApprove(req?._id)} 
                              className="bg-green-500 text-white py-2 px-4 rounded-md hover:bg-green-600 mr-2"
                            >
                              Approve
                            </button>
                            <button
                              onClick={() => handleReject(req?._id)}
                              className="bg-red-500 text-white py-2 px-4 rounded-md hover:bg-red-600"
                            >
                              Reject
                            </button>
                          </>
                        )}
                      </td>
                    </tr>
                  </>
                ))
              ) : (
                <tr className="bg-white dark:bg-gray-400">
                  <td
                    colSpan="5"
                    className="py-8 text-center text-gray-500 dark:text-black"
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
      )}
    </>
  );
};

export default RoomAddRequest;
