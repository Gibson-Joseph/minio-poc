import React, { useState } from "react";
import mc from "../mc";
import pdfImg from "../assets/folder.png";
import { useDispatch, useSelector } from "react-redux";
import { metaData } from "../redux/actions/getBucketObjList.action";

import { Transition } from "react-transition-group";

import "../App.css";
import Model from "./Model";

const MainComponent = ({ popup, setPopup, setMenuBar, menuBar }) => {
  const [warn, setWarn] = useState(false);
  const [whatIDelete, setWhatIdelete] = useState(null);
  const [dropDown, setDropDown] = useState(false);
  const state = useSelector((state) => {
    return state.bucketObj.data;
  });

  const dispatch = useDispatch();

  const getCurrentBucket = useSelector((state) => {
    return state.bucketObj.currentBucket;
  });

  const getInfoData = useSelector((state) => {
    return state.bucketObj.infoMetaData;
  });

  const viewMetaData = (i) => {
    dispatch(metaData([state[i]]));
    setPopup(true);
  };

  const download = (objName) => {
    mc.presignedGetObject(
      getCurrentBucket,
      objName,
      24 * 60 * 60,
      function (err, presignedUrl) {
        if (err) return console.log(err);
        let alink = document.createElement("a");
        alink = presignedUrl;
        // alink.download = objName;
        alink.click();
      }
    );
  };

  const handleTogale = () => {
    setMenuBar(!menuBar);
  };

  const warnPopup = (deleteItem) => {
    setWhatIdelete(deleteItem);
    setWarn(!warn);
  };

  const closePopup = () => {
    setPopup(false);
  };

  // const handleMore=()=>{

  // }
  return (
    <div className={`w-full sm:px-2 bg-gray-50 flex`}>
      <div className={`${popup ? "w-2/3" : "w-full"}`}>
        <header className="flex justify-between sm:mb-2 sm:py-2 border-b-2 bg-slate-200 border-slate-300 px-1 sm:px-5 lg:sticky">
          <div className="flex items-center">
            <button
              className={`${
                menuBar && "hidden"
              } border h-8 rotate-180 sm:px-3 border-dotted border-red-500 mr-3`}
              onClick={() => handleTogale()}
            >
              <svg
                data-name="Layer 3"
                height={24}
                width={24}
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 128 128"
              >
                <path d="M97.092 36.078H30.908a2.111 2.111 0 0 0 0 4.222h66.184a2.111 2.111 0 0 0 0-4.222zM97.092 61.889H30.908a2.111 2.111 0 0 0 0 4.222h66.184a2.111 2.111 0 0 0 0-4.222zM97.092 87.7H30.908a2.111 2.111 0 0 0 0 4.222h66.184a2.111 2.111 0 0 0 0-4.222z" />
              </svg>
            </button>
            <span className="flex items-center">
              <svg
                width={35}
                height={35}
                dataname="Layer 3"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 128 128"
              >
                <path d="M28.781 104.122h70.438a2.111 2.111 0 0 0 2.111-2.111V52.188a2.11 2.11 0 0 0-.851-1.694L65.26 24.3a2.109 2.109 0 0 0-2.519 0L27.522 50.5a2.11 2.11 0 0 0-.851 1.694v49.822a2.111 2.111 0 0 0 2.11 2.106zM72.195 99.9H55.8V75.344h16.395zm-41.3-46.651L64 28.62l33.108 24.629V99.9H76.417V73.233a2.111 2.111 0 0 0-2.111-2.111H53.69a2.111 2.111 0 0 0-2.111 2.111V99.9H30.892z" />
              </svg>
              <span className="text-red-500 cursor-pointer hover:bg-slate-300">
                Home
              </span>
              <span className="px-2">
                <span className="text-lg text-gray-500"> / </span>
                <span className="text-red-600"> {getCurrentBucket}</span>
              </span>
            </span>
          </div>
          <div className="flex no-scrollbar overflow-x-scroll">
            <button
              onClick={() => setDropDown(!dropDown)}
              className={`bg-white hover:text-red-500 mr-3 px-3 shadow-inner font-bold font-serif border border-dotted border-red-500`}
            >
              more
            </button>
            {/* drop down */}
            <div
              className={`${
                !dropDown && "hidden"
              } bg-indigo-50 top-40 absolute w-40 lg:top-12 shadow-2xl rounded flex flex-col p-1`}
            >
              <span className="px-1 cursor-pointer hover:text-red-500 border-red-400 border hover:bg-slate-100 hover:border-dotted py-1 rounded hover:border hover:border-red-500 font-medium font-mono ">
                Add New Folder
              </span>
              <span className="px-1 cursor-pointer hover:text-red-500 border-red-400 border hover:bg-slate-100 hover:border-dotted py-1 mt-1 rounded hover:border hover:border-red-500 font-medium font-mono ">
                Upload Files
              </span>
            </div>
            <button
              onClick={() => warnPopup("deleteBicket")}
              className="shadow-inner border-2 bg-red-600 text-white px-4 sm:px-8 font-serif font-bold hover:bg-white hover:text-red-600 hover:border-red-600"
            >
              Delete
            </button>
          </div>
        </header>
        <main className="w-full">
          <div
            className={`${
              state.length === 0
                ? "w-full h-full"
                : `grid grid-cols-4 mt-3 ${
                    popup ? "lg:sm:grid-cols-3" : "lg:grid-cols-6"
                  } gap-1`
            }`}
          >
            {state.length !== 0 &&
              state?.map((val, i) => {
                return (
                  <div
                    key={i}
                    className="w-[100px] px-3 py-1 flex justify-center items-center cursor-pointer hover:bg-slate-200 h-full"
                    onClick={() => viewMetaData(i)}
                  >
                    <div className="">
                      <img
                        className="hover:bg-slate-200 h-10 w-14 sm:h-24 sm:w-40"
                        src={pdfImg}
                        alt="pdfImage"
                      />
                      <li
                        key={i}
                        className="list-none mt-2 text-center w-full text-sm font-serif"
                      >
                        {val?.name.length > 8
                          ? `${val?.name?.slice(0, 11)}...`
                          : val?.name}
                      </li>
                    </div>
                  </div>
                );
              })}
            {state.length === 0 && (
              <div className="w-full h-full flex justify-center items-center">
                <span>
                  No Files in
                  <span className="text-red-500 font-serif">
                    {getCurrentBucket}
                  </span>
                  Folder
                </span>
              </div>
            )}
          </div>
        </main>
      </div>
      {/* <SwitchTransition mode='in-out'> */}
      <Transition timeout={400}>
        <div
          className={`${
            popup
              ? "w-full sm:w-96 h-full -translate-x-1 absolute sm:relative"
              : "w-0 translate-x-96 "
          } overflow-y-scroll container bg-white dark:bg-gray-700 shadow-2xl ease-in-out h-full lg:h-[100%] transition-all`}
        >
          <header className="flex justify-between border-2 border-b-red-300 px-2 py-1 w-full">
            <h1>File Info</h1>
            <button
              className="hover:bg-red-500 px-2"
              onClick={() => closePopup()}
            >
              X
            </button>
          </header>
          <main>
            <div className="flex justify-center my-2">
              <img src={pdfImg} alt="image" height={80} width={80} />
            </div>
            <div className="flex flex-col ">
              <span className="py-1 px-3 m-1">
                <span className="text-lg font-normal"> Type :</span>
                <span className="font-serif"> file </span>
              </span>
              <span className="py-1 px-3 m-1">
                <span className="text-lg font-normal"> Name : </span>
                <span className="font-serif">{getInfoData[0].name}</span>
              </span>
              <span className="py-1 px-3 m-1">
                <span className="text-lg font-normal"> Size : </span>
                <span className="font-serif"> {getInfoData[0].size}</span>
              </span>
              <span className="py-1 px-3 m-1">
                <span className="text-lg font-normal"> Last Modified : </span>
                <span className="font-serif">
                  {getInfoData[0].lastModified.toString()}
                </span>
              </span>
            </div>
            <div className="mt-3 px-3">
              <h2 className="text-center text-lg font-normal text-gray-500">
                Action
              </h2>
              <div className="flex">
                <button
                  className="w-[90%] border border-red-500 hover:bg-green-600 py-1 hover:text-white rounded-lg  font-medium"
                  onClick={() => download(getInfoData[0].name)}
                >
                  Download
                </button>
                <button
                  className="w-[90%] border border-yellow-500 hover:bg-red-600 py-1 hover:text-white rounded-lg font-medium"
                  onClick={() => warnPopup("deleteObject")}
                >
                  Delete
                </button>
              </div>
            </div>
          </main>
        </div>
      </Transition>

      {/* model*/}
      <Model
        warn={warn}
        setWarn={setWarn}
        setPopup={setPopup}
        whatIDelete={whatIDelete}
      />
    </div>
  );
};

export default MainComponent;
