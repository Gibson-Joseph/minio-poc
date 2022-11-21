import React from "react";
import mc from "../mc";
import { useDispatch, useSelector } from "react-redux";
import {
  getBucketObjList,
  deleteBucket,
} from "../redux/actions/getBucketObjList.action";
import toastMsg from "../service/toastMsg/toast";

const Model = ({ warn, setWarn, setPopup, whatIDelete }) => {
  const getCurrentBucket = useSelector((state) => {
    return state.bucketObj.currentBucket;
  });

  const getInfoData = useSelector((state) => {
    return state.bucketObj.infoMetaData;
  });

  const state = useSelector((state) => {
    return state.bucketObj.data;
  });

  const dispatch = useDispatch();
  let stream;

  const removeObj = (objName) => {
    if (state.length === 1) {
      console.log("calling state.length", state.length);
      dispatch(getBucketObjList([]));
      setPopup(false);
      setWarn(false);
    }
    if (whatIDelete === "deleteObject") {
      mc.removeObject(getCurrentBucket, objName, function (err) {
        if (err) {
          return console.log("Unable to remove object", err);
        }
        let minioBuckets = [];
        stream = mc.listObjects(getCurrentBucket, "", true);
        stream.on("data", function (obj) {
          minioBuckets.push(obj);
          console.log("minioBuckets [] --->", minioBuckets);
          if (minioBuckets.length > 0) {
            console.log("call first if block", minioBuckets.length);
            dispatch(getBucketObjList(minioBuckets));
            setPopup(false);
            setWarn(false);
          } else {
            console.log("call second if block", minioBuckets.length);
            dispatch(getBucketObjList([""]));
            setWarn(false);
          }
        });
        stream.on("error", function (err) {
          console.log(err);
        });
      });
      toastMsg("success");
    } else {
      dispatch(deleteBucket(getCurrentBucket));
      setWarn(false);
      toastMsg("success");
    }
  };

  const warnPopup = () => {
    setWarn(!warn);
  };
  return (
    <div
      id="popup-modal"
      tabIndex="-1"
      className={`${
        warn ? "visible" : "hidden"
      } overflow-y-auto overflow-x-hidden fixed sm:right-28 z-50 p-4 md:inset-0 h-modal md:h-full`}
    >
      <div className="relative w-full max-w-md h-full md:h-auto">
        <div className="relative bg-white rounded-lg shadow dark:bg-gray-700 lg:left-[80%]">
          <button
            type="button"
            onClick={() => warnPopup()}
            className="absolute top-3 right-2.5 text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center dark:hover:bg-gray-800 dark:hover:text-white"
            data-modal-toggle="popup-modal"
          >
            <svg
              aria-hidden="true"
              className="w-5 h-5"
              fill="currentColor"
              viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fillRule="evenodd"
                d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                clipRule="evenodd"
              ></path>
            </svg>
            <span className="sr-only">Close modal</span>
          </button>
          <div className="p-6 text-center">
            <svg
              aria-hidden="true"
              className="mx-auto mb-4 w-14 h-14 text-gray-400 dark:text-gray-200"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
              ></path>
            </svg>
            <h3 className="mb-5 text-lg font-normal text-gray-500 dark:text-gray-400">
              Are you sure you want to delete this{" "}
              {whatIDelete === "deleteObject" ? "file" : "folder"} ?
            </h3>
            <button
              onClick={() => removeObj(getInfoData[0].name)}
              data-modal-toggle="popup-modal"
              type="button"
              className="text-white bg-red-600 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300 dark:focus:ring-red-800 font-medium rounded-lg text-sm inline-flex items-center px-5 py-2.5 text-center mr-2"
            >
              Yes, I'm sure
            </button>
            <button
              onClick={() => warnPopup()}
              data-modal-toggle="popup-modal"
              type="button"
              className="text-gray-500 bg-white hover:bg-gray-100 focus:ring-4 focus:outline-none focus:ring-gray-200 rounded-lg border border-gray-200 text-sm font-medium px-5 py-2.5 hover:text-gray-900 focus:z-10 dark:bg-gray-700 dark:text-gray-300 dark:border-gray-500 dark:hover:text-white dark:hover:bg-gray-600 dark:focus:ring-gray-600"
            >
              No, cancel
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Model;
