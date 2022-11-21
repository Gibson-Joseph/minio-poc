import { combineReducers } from "redux";

import getBucketObjectList from "./GetBucketObjList.reducer";

const rootReducer = combineReducers({
  bucketObj: getBucketObjectList,
});

export default rootReducer;
