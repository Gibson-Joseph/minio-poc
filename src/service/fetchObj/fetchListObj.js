import {
  currentBucket,
  getBucketObjList,
} from "../../redux/actions/getBucketObjList.action";
import { useDispatch } from "react-redux";
// import store from "../../redux/store";
// const dispatch = useDispatch()
// import store from "../../redux/store";

import mc from "../../mc";
const listObjectsOfBucket = async (bucketName) => {
  // console.log("bicket Name", bucketName);
  // console.log("---------------------------------list obj initial statge");
  // store.dispatch(currentBucket(bucketName))
  // store.dispatch(getBucketObjList([]))
  // let minioBuckets = []
  // let stream = mc.listObjects(bucketName, '', true)
  // stream.on('data', function (obj) {
  //     minioBuckets.push(obj)
  //     if (minioBuckets) {
  //         store.dispatch(getBucketObjList(minioBuckets))
  //     }
  // })
  // stream.on('error', function (err) { console.log(err) })
};

export default listObjectsOfBucket;
