import React, { useState, useEffect } from "react";
import mc from "../mc";
import MainComponent from "./MainComponent";
import { useDispatch, useSelector } from "react-redux";
import {
  bucket,
  currentBucket,
  getBucketObjList,
} from "../redux/actions/getBucketObjList.action";
import { Transition } from "react-transition-group";
import "../App.css";

const MenuItem = ({ createBkt }) => {
  const [buckets, setBuckets] = useState([]);
  const [rotatSvg, setRotateSvg] = useState("");
  const [popup, setPopup] = useState(false);
  console.log("popup in MenuItem componenet (popup) ------", popup);
  const [menuBar, setMenuBar] = useState(true);

  const dispatch = useDispatch();
  const getBuckets = async () => {
    const res = await mc.listBuckets();
    dispatch(bucket(res));
  };

  const getCurrentBucket = useSelector((state) => {
    return state.bucketObj.currentBucket;
  });
  const state = useSelector((state) => {
    return state;
  });

  const listObjectsOfBucket = async (bucketName) => {
    setPopup(false);
    dispatch(currentBucket(bucketName));
    setBuckets(bucketName);
    dispatch(getBucketObjList([]));
    let minioBuckets = [];
    setRotateSvg(bucketName);
    let stream = mc.listObjects(bucketName, "", true);
    stream.on("data", function (obj) {
      minioBuckets.push(obj);

      if (minioBuckets.length !== 0) {
        dispatch(getBucketObjList(minioBuckets));
        // console.log("state------", state);
        console.log();
      }
    });
    stream.on("error", function (err) {
      console.log("err ---------", err);
    });
  };

  const trssClick = () => {};

  const toggalMenuBar = () => {
    setMenuBar(!menuBar);
  };

  useEffect(() => {
    getBuckets();
  }, [createBkt]);

  return (
    <div className="w-full flex">
      <Transition in={menuBar} timeout={400}>
        <div
          className={`${
            menuBar ? "w-72 shadow-lg absolute sm:relative" : "w-0"
          } bg-slate-200 flex flex-col transition-all overflow-hidden`}
        >
          <div
            className={`flex justify-between px-3 py-3 border border-b-slate-300 border-b-2 ${
              menuBar && "sticky"
            }`}
          >
            <h3 className="text-center font-serif font-bold">Folders </h3>
            <button
              onClick={() => toggalMenuBar()}
              className={`${
                !menuBar && "hidden"
              } px-3 border border-dotted border-red-400`}
            >
              <svg
                className={`${menuBar && "rotate-180"} float-right`}
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
              >
                <path d="M7.293 4.707 14.586 12l-7.293 7.293 1.414 1.414L17.414 12 8.707 3.293 7.293 4.707z" />
              </svg>
            </button>
          </div>
          <div className="w-full overflow-y-scroll container">
            {state?.bucketObj?.bucketName?.map((bucket, index) => {
              return (
                <span className="" key={index}>
                  <button
                    key={bucket.name}
                    onClick={() => listObjectsOfBucket(bucket.name)}
                    className={`${
                      getCurrentBucket === bucket.name
                        ? "bg-red-600 hover:bg-red-500 text-white"
                        : "bg-slate-200 hover:bg-slate-100"
                    } w-full buttonst-none py-2 px-3 flex `}
                  >
                    <span>
                      <svg
                        className={
                          rotatSvg === bucket.name
                            ? "rotate-90 duration-75"
                            : undefined
                        }
                        xmlns="http://www.w3.org/2000/svg"
                        width="24"
                        height="24"
                      >
                        <path d="M7.293 4.707 14.586 12l-7.293 7.293 1.414 1.414L17.414 12 8.707 3.293 7.293 4.707z" />
                      </svg>
                    </span>
                    <span className="font-mono font-medium">{bucket.name}</span>
                  </button>
                </span>
              );
            })}
            <span className="">
              <button
                onClick={() => trssClick(bucket.name)}
                className={`bg-indigo-300 hover:bg-red-500 text-white" w-full buttonst-none py-2 px-3 flex `}
              >
                <span></span>{" "}
                <span className="font-mono font-medium"> Trash</span>
              </button>
            </span>
          </div>
        </div>
      </Transition>
      <div className="w-full h-full">
        <MainComponent
          menuBar={menuBar}
          setMenuBar={setMenuBar}
          popup={popup}
          setPopup={setPopup}
        />
      </div>
    </div>
  );
};

export default MenuItem;
