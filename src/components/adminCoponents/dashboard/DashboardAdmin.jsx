import React, { useEffect, useState } from "react";
import Loading from "../../loading/Loading";
import { faIndianRupeeSign, faUser } from "@fortawesome/free-solid-svg-icons";
import { dashboardReport, ownerList, userList } from "../../../api/adminApi";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import LineChart from "./LineChart";
import Trending from "./Trending";

const DashboardAdmin = () => {
  const [loading, setLoading] = useState(false);
  const [users, setUsers] = useState([]);
  const [owners, setOwners] = useState([]);
  const [reportData, setReportData] = useState({});

  useEffect(() => {
    setLoading(true);
    userList().then((res) => {
      setUsers(res?.data?.users);
    });
    ownerList().then((res) => {
      setOwners(res?.data?.owners);
    });
    dashboardReport().then((res) => {
      setLoading(false);
      setReportData(res?.data);
    });
  }, []);

  return (
    <>
      <div className="w-full md:w-3/4 px-4 mb-5 mt-5">
        <div className="p-4 border-2 border-gray-200 border-solid rounded-lg dark:border-gray-400">
          {loading ? (
            <div className="inset-0 flex w-full aspect-[2] items-center justify-center">
              <div className="spinnerouter">
                <Loading />
              </div>
            </div>
          ) : (
            <div>
              <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                <div className="col-span-1 grid">
                  <div className="bg-white shadow-md  p-6 mb-4 rounded-lg transition-transform transform hover:scale-105">
                    <article className="icontext flex items-center">
                      <div className="ml-4 ">
                        <div className="flex gap-3">
                          <FontAwesomeIcon
                            icon={faIndianRupeeSign}
                            className="text-2xl text-red-500"
                          />
                          <h6 className="mb-2 text-lg font-semibold text-gray-800">
                            Total Earnings
                          </h6>
                        </div>
                        <span className="text-2xl font-bold text-red-600">
                          ₹ {reportData?.totalRevenue?.totalEarnings || 0}
                        </span>
                        <span className="font-normal pl-1 text-gray-500">
                          from {reportData?.totalRevenue?.totalBookings || 0}{" "}
                          bookings
                        </span>
                        <p className="text-sm text-gray-600 mt-1">
                          earnings represent 20% of each booking
                        </p>
                      </div>
                    </article>
                  </div>
                </div>
                <div className="col-span-1 grid">
                  <div className="bg-white shadow-md  p-6 mb-4 rounded-lg transition-transform transform hover:scale-105">
                    <article className="icontext flex items-center">
                      <div className="ml-4 ">
                        <div className="flex gap-3">
                          <FontAwesomeIcon
                            icon={faIndianRupeeSign}
                            className="text-2xl text-red-500"
                          />
                          <h6 className="mb-2 text-lg font-semibold text-gray-800">
                            Currnet month
                          </h6>
                        </div>
                        <span className="text-2xl font-bold text-red-600">
                          ₹{" "}
                          {reportData?.currentMonthEarnings?.monthlyEarnings ||
                            0}
                        </span>
                        <span className="font-normal pl-1 text-gray-500">
                          {`in ${reportData?.currentMonthName}`}
                        </span>
                        <p className="text-sm text-gray-600 mt-1">
                          earnings represent 20% of each booking
                        </p>
                      </div>
                    </article>
                  </div>
                </div>
                <div className="col-span-1 grid">
                  <div className="bg-white shadow-md  p-6 mb-4 rounded-lg transition-transform transform hover:scale-105">
                    <article className="icontext flex items-center">
                      <div className="ml-4">
                        <div className="flex gap-3">
                          <FontAwesomeIcon
                            icon={faUser}
                            className="text-2xl text-red-500"
                          />
                          <h6 className="mb-2 text-lg font-semibold text-gray-800">
                            Total Users
                          </h6>
                        </div>
                        <span className="text-2xl font-bold text-red-600">
                          0{users?.length}
                        </span>
                        <p className="text-sm text-gray-600 mt-1">
                          Join our community and connect with users!
                        </p>
                      </div>
                    </article>
                  </div>
                </div>
                <div className="col-span-1 grid">
                  <div className="bg-white shadow-md  p-6 mb-4 rounded-lg transition-transform transform hover:scale-105">
                    <article className="icontext flex items-center">
                      <div className="ml-4">
                        <div className="flex gap-3">
                          <FontAwesomeIcon
                            icon={faUser}
                            className="text-2xl text-red-500"
                          />
                          <h6 className="mb-2 text-lg font-semibold text-gray-800">
                            Total Owners
                          </h6>
                        </div>
                        <span className="text-2xl font-bold text-red-600">
                          0{owners?.length}
                        </span>
                        <p className="text-sm text-gray-600 mt-1">
                          Join our community and connect with owners!
                        </p>
                      </div>
                    </article>
                  </div>
                </div>
              </div>
              <div className="flex flex-wrap">
                <div className="md:w-2/3 mt-4 md:h-96 w-full">
                  <LineChart
                    usersByYear={reportData?.usersData}
                    ownersByYear={reportData?.ownersData}
                  />
                </div>
                <div className="md:w-1/3 h-96 w-full mt-6">
                  <div className="w-full max-w-md p-4 bg-white border border-gray-200 rounded-lg shadow sm:p-8 dark:bg-gray-200 dark:border-gray-200">
                    <div className="flex items-center justify-between mb-4">
                      <h5 className="text-xl font-bold leading-none text-gray-900 dark:text-black">
                        Most Booked Rooms
                      </h5>
                    </div>
                    {reportData?.trendingRoomDetails &&
                    reportData?.trendingRoomDetails.length > 0 ? (
                      reportData?.trendingRoomDetails.map((data) => (
                        <div key={data?._id}>
                          <Trending trendings={data} />
                        </div>
                      ))
                    ) : (
                      <div className="bg-white p-4 rounded-md shadow-md">
                        <p className="text-gray-500">No trending cars found.</p>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default DashboardAdmin;
