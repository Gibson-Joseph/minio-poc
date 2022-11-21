import {
  GET_BUCKET_OBJ_LIST,
  BUCKET,
  CURRENT_BUCKET,
  DELETE_BUCKET,
  DELETE_OBJ,
  TRASH_DATA,
  META_DATA,
} from "../action-types/getBucketObjList.types";

export const bucket = (data) => ({
  payload: data,
  type: BUCKET,
});

export const getBucketObjList = (data) => ({
  payload: data,
  type: GET_BUCKET_OBJ_LIST,
});
export const currentBucket = (data) => ({
  payload: data,
  type: CURRENT_BUCKET,
});

export const deleteBucket = (data) => ({
  payload: data,
  type: DELETE_BUCKET,
});

export const deleteobj = (data) => ({
  payload: data,
  type: DELETE_OBJ,
});

export const trashData = (data) => ({
  payload: data,
  type: TRASH_DATA,
});

export const metaData = (data) => ({
  payload: data,
  type: META_DATA,
});
