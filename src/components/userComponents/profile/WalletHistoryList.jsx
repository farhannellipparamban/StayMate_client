import React, { useState } from "react";
import Pagination from "../../common/Pagination";

const WalletHistoryList = ({ user }) => {
  console.log(user);
  const [currentPage, setCurrentPage] = useState(1);
  const dataPerPage = 5;
  const lastIndex = currentPage * dataPerPage;
  const firstIndex = lastIndex - dataPerPage;
  const dataInSinglePage = user?.walletHistory.slice(firstIndex, lastIndex);
  const totalPages = Math.ceil(user?.walletHistory?.length / dataPerPage);
  const numbers = [...Array(totalPages + 1).keys()].slice(1);
  return (
    <>
      <div className="container mx-auto mb-40 mt-10">
        <div className="flex justify-between my-5">
          <h1 className="text-3xl pt-2 mb-5">Wallet History</h1>
          <button
            type="button"
            className="text-white bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2"
          >
            Balance : {user?.wallet}
          </button>
        </div>
        <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
          <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
            <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
              <tr>
                <th scope="col" className="px-6 py-3">
                  Date
                </th>
                <th scope="col" className="px-6 py-3">
                  Amount
                </th>
                <th scope="col" className="px-6 py-3">
                  Description
                </th>
              </tr>
            </thead>
            <tbody>
              {user?.walletHistory && user?.walletHistory?.length > 0 ? (
                dataInSinglePage.map((item) => (
                  <tr
                    key={item._id}
                    className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600"
                  >
                    <td className="px-6 py-4 text-sm  text-black ">
                      {new Date(item?.date).toLocaleDateString("en-US", {
                        year: "numeric",
                        month: "long",
                        day: "numeric",
                      })}
                    </td>
                    {item?.amount > 0 ? (
                      <td className="px-6 py-4 text-sm text-green-500 ">
                        +{item?.amount}
                      </td>
                    ) : (
                      <td className="px-6 py-4 text-sm text-red-800 ">
                        {item?.amount}
                      </td>
                    )}
                    <td className="px-6 py-4 text-sm  text-black ">
                      {item?.description}
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td
                    colSpan="4"
                    className="px-6 py-4 text-center text-gray-900 dark:text-dark"
                  >
                    No History
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
        {totalPages > 1 && (
          <Pagination
            numbers={numbers}
            currentPage={currentPage}
            setCurrentPage={setCurrentPage}
            totalPages={totalPages}
          />
        )}
      </div>
    </>
  );
};

export default WalletHistoryList;
