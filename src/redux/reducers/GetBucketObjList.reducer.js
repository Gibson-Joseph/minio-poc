import {
  GET_BUCKET_OBJ_LIST,
  BUCKET,
  CURRENT_BUCKET,
  DELETE_BUCKET,
  DELETE_OBJ,
  TRASH_DATA,
  META_DATA,
} from "../action-types/getBucketObjList.types";
import mc from "../../mc";

const INTIAL_STATE = {
  data: [],
  bucketName: [],
  currentBucket: "",
  trash: [],
  infoMetaData: [],
};

function getBucketObjectList(state = INTIAL_STATE, action) {
  let myPayload = action.payload;

  switch (action.type) {
    case BUCKET: {
      return {
        ...state,
        trash: state.data.filter((item, index) => item !== myPayload),
        bucketName: myPayload,
      };
    }

    case GET_BUCKET_OBJ_LIST: {
      console.log("myPayload--------------", myPayload);
      console.log("state.data--------------", state.data);
      return {
        ...state,
        data: myPayload,
      };
    }

    case CURRENT_BUCKET: {
      return {
        ...state,
        currentBucket: action.payload,
      };
    }
    case META_DATA: {
      return {
        ...state,
        infoMetaData: myPayload,
      };
    }
    // case DELETE_OBJ: {
    //     let stream;
    //     console.log("state.currentBucket", state.currentBucket);
    //     console.log("myPayload", myPayload);
    //     mc.removeObject(state.currentBucket, myPayload, function (err) {
    //         if (err) {
    //             return console.log('Unable to remove object', err)
    //         }
    //         let minioBuckets = []
    //         console.log("state.currentBucket-----", state.currentBucket);
    //         stream = mc.listObjects(state.currentBucket, '', true)
    //         stream.on('data', function (obj) {
    //             // console.log("obj", obj);
    //             minioBuckets.push(obj)
    //             if (minioBuckets.length !== 0) {
    //                 console.log("minioBuckets []", minioBuckets);
    //                 console.log('Removed the object')
    //                 // console.log("minioBuckets array", minioBuckets);
    //                 // dispatch(getBucketObjList(minioBuckets))
    //                 return {
    //                     ...state, data: minioBuckets
    //                 }
    //                 // setPopup(false)
    //             } else {
    //                 console.log("else block called");
    //                 return {
    //                     ...state, data: "No Data"
    //                 }
    //                 // dispatch(getBucketObjList("No Data"))
    //             }

    //         })
    //         stream.on('error', function (err) { console.log("err----", err) })

    //     })
    // }
    case TRASH_DATA: {
      return {
        ...state,
        trash: state.data.filter((item, index) => item.name === myPayload.name),
      };
    }

    case DELETE_BUCKET: {
      if (state.data) {
        mc.removeObjects(myPayload, state.data, function (e) {
          if (e) {
            return console.log("Unable to remove Objects ", e);
          }
          console.log("Removed the objects successfully");
          mc.removeBucket(myPayload, function (err) {
            if (err) return console.log("unable to remove bucket.");
            console.log("Bucket removed successfully.");
          });
        });
        return {
          ...state,
          bucketName: state.bucketName.filter(
            (item, index) => item.name !== myPayload
          ),
          data: [],
        };
      } else {
        mc.removeBucket(myPayload, function (err) {
          if (err) return console.log("unable to remove bucket.");
          console.log("Bucket removed successfully.");
        });
        return {
          ...state,
          bucketName: state.bucketName.filter(
            (item, index) => item.name !== myPayload
          ),
        };
      }
    }
    default:
      return state;
  }
}

export default getBucketObjectList;
