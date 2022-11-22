import React, { useState } from "react";
import "../App.css";

const HeaderComponent = ({ setPopup, setInputType }) => {
  const [order, setOrder] = useState(false);
  const createBucket = () => {
    setInputType("text");
    setPopup(true);
  };
  const uploadFile = () => {
    setInputType("file");
    setPopup(true);
  };

  // const handleOrder=()=>{
  //   setOrder(!order)
  //   if(order){

  //   }
  // }

  return (
    <header className="h-full p-2 border w-full border-gray-400 lg:py-5 sm:px-3 sm:m-2">
      <div className="w-full md:flex md:justify-between overflow-x-scroll sm:overflow-x-clip ">
        <div className="w-full md:w-3/4 lg:2/3  gap-1 sm:gap-0 flex">
          <button
            className="border border-gray-200 px-1 sm:px-3 mx-1 sm:py-1 bg-slate-200 font-serif rounded-sm whitespace-nowrap"
            onClick={() => createBucket()}
          >
            New Folder
          </button>
          <button
            className="border border-gray-200 px-1 sm:px-3 mx-1 sm:py-1 bg-slate-200 font-serif rounded-sm"
            onClick={() => uploadFile()}
          >
            Upload
          </button>
          <span className="flex justify-between sm:flex-row">
            <button className="border border-gray-200 px-1 sm:px-4 sm:py-1 mx-1 bg-red-500 rounded-sm">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24">
                <path d="m3.293 11.293 1.414 1.414L11 6.414V20h2V6.414l6.293 6.293 1.414-1.414L12 2.586l-8.707 8.707z" />
              </svg>
            </button>
            <button className="border border-gray-200 px-1 sm:px-4 sm:py-1 mx-1 bg-slate-200  rounded-sm">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24">
                <path d="M13 17.586V4h-2v13.586l-6.293-6.293-1.414 1.414L12 21.414l8.707-8.707-1.414-1.414L13 17.586z" />
              </svg>
            </button>
          </span>
          <label
            htmlFor=""
            className="border mx-1 border-gray-200 px-1 sm:px-3 py-1 bg-slate-200 font-serif rounded-sm whitespace-nowrap"
          >
            Sort By
            <select name="" id="">
              <option value="">Name</option>
              <option value="">Size</option>
            </select>
          </label>
          <span className="flex justify-between sm:flex-row">
            <button className="border border-gray-200 sm:py-1 px-1 sm:px-4 mx-1 bg-red-500 rounded-sm">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24">
                <path d="M10 10H3V4a1 1 0 0 1 1-1h6zm11-6a1 1 0 0 0-1-1h-6v7h7zM4 21h6v-7H3v6a1 1 0 0 0 1 1zm17-1v-6h-7v7h6a1 1 0 0 0 1-1z" />
              </svg>
            </button>
            <button className="border border-gray-200 sm:py-1 px-1 sm:px-4 mx-1 bg-slate-200 text-red-600 font-serif font-bold rounded-sm">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24">
                <g data-name="46-List">
                  <path d="M25 0H7a7 7 0 0 0-7 7v18a7 7 0 0 0 7 7h18a7 7 0 0 0 7-7V7a7 7 0 0 0-7-7zm5 25a5 5 0 0 1-5 5H7a5 5 0 0 1-5-5V7a5 5 0 0 1 5-5h18a5 5 0 0 1 5 5z" />
                  <rect x="7" y="7" width="4" height="4" rx="1" ry="1" />
                  <rect x="7" y="14" width="4" height="4" rx="1" ry="1" />
                  <rect x="7" y="21" width="4" height="4" rx="1" ry="1" />
                  <path d="M13 8h12v2H13zM13 15h12v2H13zM13 22h12v2H13z" />
                </g>
              </svg>
            </button>
          </span>
        </div>
      </div>
      <div className="w-full mt-2 flex mx-1">
        <div className="border border-gray-200 w-full sm:w-1/4 flex">
          <input
            type="text"
            placeholder="search file..."
            className=" indent-3 w-full py-1"
          />
        </div>
        <div className="border border-gray-200 cursor-pointer px-1 flex items-center">
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24">
            <path
              d="M21.15 19.74a12 12 0 1 0-1.41 1.41l10.55 10.56 1.41-1.41zM12 22a10 10 0 1 1 10-10 10 10 0 0 1-10 10z"
              data-name="49-Search"
            />
          </svg>
        </div>
      </div>
    </header>
  );
};

export default HeaderComponent;
