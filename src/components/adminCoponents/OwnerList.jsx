import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import Pagination from "../common/Pagination";
import { ownerBlock, ownerList } from "../../api/adminApi";
import Loading from "../loading/Loading";

const OwnerList = () => {
  const [owners, setOwners] = useState([]);
  const [loading, setLoading] = useState(false);
  const [searchInput, setSearchInput] = useState("");
  const [activeModal, setActiveModal] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);

  const dataPerPage = 5;

  useEffect(() => {
    setLoading(true);
    ownerList()
      .then((res) => {
        setLoading(false);
        setOwners(res?.data?.owners);
      })
      .catch((err) => {
        setLoading(false);
        console.log(err.message);
      });
  }, []);

  const blockUnblockOwner = async (ownerId, status) => {
    try {
      const res = await ownerBlock(ownerId, status);
      if (res.status === 200) {
        let updatedData = owners.map((owner) => {
          let ownerData = { ...owner };
          if (ownerData._id === ownerId) {
            ownerData.isBlocked = !status;
          }
          return ownerData;
        });
        setOwners(updatedData);
        setActiveModal(null);
        toast.success(res?.data?.message);
      }
    } catch (error) {
      toast.error(error.response?.data?.message);
      console.log(error.message);
    }
  };

  const openModal = (ownerId) => {
    setActiveModal(ownerId);
  };

  const closeModal = () => {
    setActiveModal(null);
  };

  const handleInputChange = (e) => {
    setSearchInput(e.target.value);
    setCurrentPage(1);
  };

  const filteredData = !searchInput
    ? owners
    : owners.filter((person) =>
        person.name.toLowerCase().includes(searchInput.toLowerCase())
      );
  const lastIndex = currentPage * dataPerPage;
  const firstIndex = lastIndex - dataPerPage;
  const ownerInSinglePage = filteredData.slice(firstIndex, lastIndex);
  const totalPages = Math.ceil(filteredData.length / dataPerPage);
  const numbers = [...Array(totalPages + 1).keys()].slice(1);
  return (
    <>
      {loading ? (
        <div className="fixed inset-0 flex items-center justify-center">
          <div className="spinnerouter">
            <Loading />
          </div>
        </div>
      ) : (
        <div className="mx-auto w-full px-4 py-8 sm:px-8">
          <div className="flex items-center justify-between pb-6">
            <div className="pb-6 font-serif">
              <h2 className="font-bold text-gray-700">Owner List</h2>
              <span className="text-xs text-gray-500">
                View accounts of registered owners
              </span>
            </div>
            <div className="max-w-screen-md mx-auto justify-end me-0">
              <form className="relative mx-auto flex w-full max-w-2xl items-center justify-between rounded-md border shadow-lg">
                <svg
                  className="absolute left-2 block h-5 w-5 text-gray-400"
                  xmlns="http://www.w3.org/2000/svg"
                  width={24}
                  height={24}
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth={2}
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <circle cx={11} cy={11} r={8} className="" />
                  <line x1={21} y1={21} x2="16.65" y2="16.65" className="" />
                </svg>
                <input
                  className="h-14 w-full rounded-md py-4 pr-80 pl-12 outline-none focus:ring-2"
                  type="name"
                  name="search"
                  value={searchInput}
                  onChange={handleInputChange}
                  placeholder="Search"
                />
                {/* <button
                  type="submit"
                  className="absolute right-0 mr-1 inline-flex h-12 items-center justify-center rounded-lg bg-gray-900 px-10 font-medium text-white focus:ring-4 hover:bg-gray-700"
                >
                  Search
                </button> */}
              </form>
            </div>
          </div>
          <div className="overflow-y-hidden rounded-lg border">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="bg-black text-left text-xs font-semibold uppercase tracking-widest text-white">
                    <th className="px-5 py-3">ID</th>
                    <th className="px-5 py-3">Full Name</th>
                    <th className="px-5 py-3">Mobile </th>
                    <th className="px-5 py-3">Status</th>
                    <th className="px-5 py-3">Actions</th>
                  </tr>
                </thead>
                <tbody className="text-black">
                  {ownerInSinglePage.length > 0 ? (
                    ownerInSinglePage.map((data) => (
                      <tr key={data?._id}>
                        <td className="border-b border-gray-200 bg-gray-300 px-5 py-5 text-sm">
                          <p className="whitespace-no-wrap">{data?._id}</p>
                        </td>
                        <td className="border-b border-gray-200 bg-gray-300 px-5 py-5 text-sm">
                          <div className="flex items-center">
                            <div className="h-10 w-10 flex-shrink-0">
                              <img
                                src="https://images.unsplash.com/photo-1544005313-94ddf0286df2?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=100&h=100&q=80"
                                alt="Profile"
                                className="h-full w-full rounded-full"
                              />
                            </div>
                            <div className="pl-3">
                              <div className="text-base font-semibold">
                                {data?.name}
                              </div>
                              <div className="font-normal">
                                {data?.email}
                              </div>
                            </div>
                          </div>
                        </td>
                        <td className="bg-gray-300 border-gray-200 border-b">{data?.mobile}</td>
                        <td className="px-4 py-4 bg-gray-300 border-gray-200 border-b">
                          {data?.isVerified ? (
                            <span className="rounded-full bg-green-200 px-3 py-1 text-xs font-semibold text-green-900">
                              Verified
                            </span>
                          ) : (
                            <span className="rounded-full bg-red-200 px-3 py-1 text-xs font-semibold text-red-900">
                              Not Verified
                            </span>
                          )}
                        </td>
                        <td className="bg-gray-300 border-gray-200 border-b">
                          {data?.isBlocked ? (
                            <button
                              type="button"
                              onClick={() => openModal(data?._id)}
                              className="focus:outline-none w-24 text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800"
                            >
                              Unblock
                            </button>
                          ) : (
                            <button
                              type="button"
                              onClick={() => openModal(data?._id)}
                              className="focus:outline-none w-24 text-white bg-red-700 hover-bg-red-800  focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-900"
                            >
                              Block
                            </button>
                          )}
                        </td>
                        <div
                          id={`popup-modal-${data?._id}`}
                          tabIndex={-1}
                          className={`fixed top-0 left-0 right-0 bottom-0 z-50 flex items-center justify-center p-4 overflow-x-hidden overflow-y-auto md:inset-0 max-h-full ${
                            activeModal === data?._id ? "" : "hidden"
                          }`}
                        >
                          <div className="relative w-full max-w-md max-h-full">
                            <div className="relative bg-black rounded-lg shadow dark:bg-gray-100">
                              <button
                                type="button"
                                className="absolute top-3 right-2.5 text-gray-400 bg-transparent hover:bg-gray-200 hover:text-black rounded-lg text-sm w-8 h-8 ml-auto inline-flex justify-center items-center dark:hover-bg-gray-600 dark:hover-text-white"
                                data-modal-hide={`popup-modal-${data?._id}`}
                                onClick={() => closeModal()}
                              >
                                <svg
                                  className="w-3 h-3"
                                  aria-hidden="true"
                                  xmlns="http://www.w3.org/2000/svg"
                                  fill="none"
                                  viewBox="0 0 14 14"
                                >
                                  <path
                                    stroke="currentColor"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
                                  />
                                </svg>
                                <span className="sr-only">Close modal</span>
                              </button>
                              <div className="p-6 text-center">
                                <svg
                                  className="mx-auto mb-4 text-gray-900 w-12 h-12 dark:text-gray-600"
                                  aria-hidden="true"
                                  xmlns="http://www.w3.org/2000/svg"
                                  fill="none"
                                  viewBox="0 0 20 20"
                                >
                                  <path
                                    stroke="currentColor"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M10 11V6m0 8h.01M19 10a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
                                  />
                                </svg>
                                {data?.isBlocked ? (
                                  <h3 className="mb-5 text-lg font-normal text-gray-900 dark:text-gray-900">
                                  Are you sure you want to Unblock this{" "}
                                    {data?.name}?
                                  </h3>
                                ) : (
                                  <h3 className="mb-5 text-lg font-normal text-gray-900 dark:text-gray-900">
                                    Are you sure you want to Block this{" "}
                                    {data?.name}?
                                  </h3>
                                )}
                                <button
                                  data-modal-hide={`popup-modal-${data?._id}`}
                                  type="button"
                                  onClick={() =>
                                    blockUnblockOwner(
                                      data?._id,
                                      data?.isBlocked
                                    )
                                  }
                                  className="text-white bg-red-600 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300 dark:focus:ring-red-800 font-medium rounded-lg text-sm inline-flex items-center px-5 py-2.5 text-center mr-2"
                                >
                                  Yes, I'm sure
                                </button>
                                <button
                                  data-modal-hide={`popup-modal-${data?._id}`}
                                  type="button"
                                  onClick={() => closeModal()}
                                  className="text-gray-500 bg-white hover:bg-gray-100 focus:ring-4 focus:outline-none focus:ring-gray-200 rounded-lg border border-gray-200 text-sm font-medium px-5 py-2.5 hover:text-gray-900 focus:z-10 dark:bg-gray-700 dark:text-gray-300 dark:border-gray-500 dark:hover-text-white dark:hover-bg-gray-600 dark:focus:ring-gray-600"
                                >
                                  No, cancel
                                </button>
                              </div>
                            </div>
                          </div>
                        </div>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td
                        colSpan="4"
                        className="px-6 py-4 text-center text-gray-900 dark:text-white"
                      >
                        No users
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
            <Pagination
              numbers={numbers}
              currentPage={currentPage}
              setCurrentPage={setCurrentPage}
              totalPages={totalPages}
            />
            {/* <div className="flex flex-col items-center border-t bg-white px-5 py-5 sm:flex-row sm:justify-between">
              <span className="text-xs text-gray-600 sm:text-sm">
                Showing 1 to 5 of 12 Entries
              </span>
              <div className="mt-2 inline-flex sm:mt-0">
                <button className="mr-2 h-12 w-12 rounded-full border text-sm font-semibold text-gray-600 transition duration-150 hover:bg-gray-100">
                  Prev
                </button>
                <button className="h-12 w-12 rounded-full border text-sm font-semibold text-gray-600 transition duration-150 hover:bg-gray-100">
                  Next
                </button>
              </div>
            </div> */}
          </div>
        </div>
      )}
    </>
  );
};

export default OwnerList;
