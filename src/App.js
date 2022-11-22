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

  //Create Folder
  const createBkt = () => {
    mc.makeBucket(bucketName, "us-east-1", function (err) {
      if (err) return console.log("Error creating bucket.", err);
      console.log('Bucket created successfully in "us-east-1".');
      setPopup(false);
      dispatch(currentBucket(bucketName));
    });
  };

  //Upload File
  const uploadObj = () => {
    console.log("fileData", fileData);
    const fileBuffer = new FileReader();
    // fileBuffer.readAsDataURL(fileData);
    fileBuffer.readAsArrayBuffer(fileData);
    fileBuffer.onload = function () {
      console.log(fileBuffer.result);

      let buf = Buffer.from(fileBuffer.result, "base64");
      // console.log("buf ----- ----- -----", buf);

      mc.putObject(getCurrentBucket, fileData.name, buf, function (err, etag) {
        setPopup(false);
        return console.log(err, etag); // err should be null
      });
    };
    fileBuffer.onerror = function (error) {
      console.log("Error: ", error);
    };
  };

  return (
    <div className="">
      <div className="">
        <HeaderComponent setPopup={setPopup} setInputType={setInputType} />
        <div className="">
          <MenuItem createBkt={createBkt} uploadObj={uploadObj} />
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
                className={`border border-gray-500 px-4 py-1 bg-slate-700 text-white hover:bg-red-600 hover:text-white float-right rounded`}
                onClick={() => uploadObj()}
                disabled={fileData === undefined}
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
