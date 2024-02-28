import React from "react";

const Pagination = ({ currentPage, setCurrentPage, totalPages, numbers }) => {
  function nextPage() {
    if (currentPage !== totalPages) {
      setCurrentPage(currentPage + 1);
    }
  }
  function prevPage() {
    if (currentPage !== 1) {
      setCurrentPage(currentPage - 1);
    }
  }
  function changePage(num) {
    setCurrentPage(num);
  }
  return (
    <div>
      <nav aria-label="Page navigation example">
        <ul className="list-style-none flex space-x-2 items-center justify-center my-5">
          {currentPage !== 1 && (
            <li>
              <a
                onClick={prevPage}
                className="px-3 py-1.5 text-sm text-black transition-all duration-300 hover:bg-black dark:hover:bg-black dark:hover:text-white border rounded-full focus:outline-none focus:ring focus:border-primary-300"
              >
                Prev
              </a>
            </li>
          )}
          {numbers.map((item, i) => (
            <li key={i}>
              <a
                onClick={() => changePage(item)}
                className={`${
                  currentPage === item
                    ? "bg-primary-100 text-red-500 font-medium"
                    : "text-black hover:bg-black dark:hover:bg-black dark:hover:text-white"
                } px-3 py-1.5 text-sm border rounded-full transition-all duration-300 focus:outline-none focus:ring focus:border-primary-300`}
              >
                {item}
              </a>
            </li>
          ))}
          {currentPage !== totalPages && (
            <li>
              <a
                onClick={nextPage}
                className="px-3 py-1.5 text-sm text-black transition-all duration-300 hover:bg-black dark:hover:bg-black dark:hover:text-white border rounded-full focus:outline-none focus:ring focus:border-primary-300"
              >
                Next
              </a>
            </li>
          )}
        </ul>
      </nav>
    </div>
  );
};

export default Pagination;
