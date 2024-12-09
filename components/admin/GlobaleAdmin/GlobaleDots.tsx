import React from "react";

const GlobaleDots = ({
  totalPages,
  currentPage,
  paginationHandleClick,
}: {
  totalPages: number;
  currentPage: number;
  paginationHandleClick: any;
}) => {
  return (
    <div className="pagination-dots mt-4 px-3 flex justify-center flex-wrap items-center gap-1">
      {Array.from({ length: totalPages }).map((ele, i) => (
        <small
          onClick={() => paginationHandleClick(i + 1)}
          key={i}
          className={`px-2 py-[1px] rounded-sm ${
            i == currentPage - 1 && "bg-green-900 text-white"
          } border border-green-900 text-black cursor-pointer`}
        >
          {i + 1}
        </small>
      ))}
    </div>
  );
};

export default GlobaleDots;
