import React, { useState } from "react";
import Pagination from "../../common/Pagination";

const WalletHistoryList = ({ user }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const dataPerPage = 6;
  const lastIndex = currentPage * dataPerPage;
  const firstIndex = lastIndex - dataPerPage;
  const dataInSinglePage = user?.walletHistory.slice(firstIndex, lastIndex);
  const totalPages = Math.ceil(user?.walletHistory?.length / dataPerPage);
  const numbers = [...Array(totalPages + 1).keys()].slice(1);
  return (
    <>
      <div className="md:mx-10 mx-auto mb-40 mt-10">
        <div className="flex justify-between my-5">
          <h1 className="text-3xl pt-2 mb-5 font-serif">Wallet History</h1>
          <button
            type="button"
            className="text-white bg-gradient-to-r from-red-500 via-red-600 to-red-700 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-red-300 dark:focus:ring-red-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2"
          >
            Balance : {user?.wallet}
          </button>
        </div>
        <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
          <table className="w-full text-sm text-left text-gray-900 dark:text-gray-800">
            <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-400 dark:text-gray-900">
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
                    className="bg-white border-b dark:bg-gray-900 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600"
                  >
                    <td className="px-6 py-4 text-sm  text-white ">
                      {new Date(item?.date).toLocaleDateString("en-US", {
                        year: "numeric",
                        month: "long",
                        day: "numeric",
                      })}
                    </td>
                    {item?.amount > 0 ? (
                      <td className="px-6 py-4 font-bold text-sm text-green-500 ">
                        + {item?.amount}
                      </td>
                    ) : (
                      <td className="px-6 py-4 font-bold text-sm text-red-600 ">
                        {item?.amount}
                      </td>
                    )}
                    <td className="px-6 py-4 text-sm text-white ">
                      {item?.description}
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td
                    colSpan="4"
                    className="px-6 py-4 text-center text-white dark:text-dark"
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
