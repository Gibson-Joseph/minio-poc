import React, { useState } from "react";
import HeaderComponent from "./fileManager/HeaderComponent";
import MenuItem from "./fileManager/MenuItem";
import mc from "./mc";
import { useDispatch, useSelector } from "react-redux";
import {
  currentBucket,
  getBucketObjList,
} from "./redux/actions/getBucketObjList.action";
import { Buffer } from "buffer";
// import fs from "fs";

function App() {
  const dispatch = useDispatch();
  const [popup, setPopup] = useState(false);
  const [inputType, setInputType] = useState("text");
  const [fileData, setFileData] = useState();
  const [bucketName, setBucketName] = useState();
  console.log("popup", popup);
  const cancelBucket = () => {
    setPopup(false);
  };

  const getCurrentBucket = useSelector((state) => {
    return state.bucketObj.currentBucket;
  });

  const createBkt = () => {
    mc.makeBucket(bucketName, "us-east-1", function (err) {
      if (err) return console.log("Error creating bucket.", err);
      console.log('Bucket created successfully in "us-east-1".');
      setPopup(false);
      dispatch(currentBucket(bucketName));
    });
  };
  // let FS = require("fs");

  const uploadObj = () => {
    console.log("fileData", fileData);
    // const fileBuffer = new FileReader();
    // fileBuffer.readAsDataURL(fileData);
    // fileBuffer.onload = function () {
    //   console.log(fileBuffer.result);
    // };
    // fileBuffer.onerror = function (error) {
    //   console.log("Error: ", error);
    // };
    ///////////////
    let reader = new FileReader();
    reader.readAsDataURL(fileData);
    console.log("reader", reader);
    const url = window.webkitURL.createObjectURL(fileData);
    console.log("url", url);
    //////////////
    // setPopup(false);
    // mc.putObject(
    //   getCurrentBucket,
    //   fileData.name,
    //   fileBuffer.result,
    //   function (err, etag) {
    //     let minioBuckets = [];
    //     let stream = mc.listObjects(getCurrentBucket, "", true);
    //     stream.on("data", function (obj) {
    //       minioBuckets.push(obj);
    //       if (minioBuckets) {
    //         console.log("minioBuckets array", minioBuckets);
    //         dispatch(getBucketObjList(minioBuckets));
    //         setPopup(false);
    //       } else {
    //         console.log("else block called");
    //         dispatch(getBucketObjList("No Data"));
    //       }
    //     });
    //     return console.log(err, etag); // err should be null
    //   }
    // );
  };

  return (
    <div className=" h-screen">
      <div className="w-full">
        <HeaderComponent setPopup={setPopup} setInputType={setInputType} />
        <div className="w-full">
          <MenuItem createBkt={createBkt} />
        </div>
      </div>
      {popup && (
        <div className="absolute bg-slate-300 top-[50%] right-[0%] sm:right-[25%] w-full mx-1 sm:w-2/6 h-[160px] duration-75 ease-in-out transition-all transform flex flex-col justify-center px-6 shadow-2xl rounded">
          <h1 className="text-center text-red-600 font-bold font-serif p-2">
            Create a New Folder
          </h1>
          {inputType === "text" ? (
            <input
              type="text"
              className="border border-gray-500 indent-3"
              placeholder="Enter Your FolderName ..."
              onChange={(e) => setBucketName(e.target.value)}
            />
          ) : (
            <input
              type="file"
              className="border border-gray-500 indent-3"
              placeholder="Enter Your FolderName ..."
              onChange={(e) => setFileData(e.target.files[0])}
            />
          )}
          <div className="sm:w-1/2 w-full mt-3">
            <button
              className="border border-gray-500 px-4 py-1 bg-slate-700 text-white hover:bg-green-600 hover:text-white rounded"
              onClick={() => cancelBucket()}
            >
              Cancel
            </button>
            {inputType === "text" ? (
              <button
                className="border border-gray-500 px-4 py-1 bg-slate-700 text-white hover:bg-red-600 hover:text-white float-right rounded"
                onClick={() => createBkt()}
              >
                Create
              </button>
            ) : (
              <button
                className="border border-gray-500 px-4 py-1 bg-slate-700 text-white hover:bg-red-600 hover:text-white float-right rounded"
                onClick={() => uploadObj()}
              >
                Upload
              </button>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

export default App;
