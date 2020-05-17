import { sagaMiddleware } from "../../../store/actions";
import { SAVE_ALL_POST, SAVE_MP3 } from "./constants";
import { getAllPostEffect, getMp3Effect } from "./sagas";

const getAllPost = (payload, resolve, reject) => {
  sagaMiddleware.run(getAllPostEffect, payload, resolve, reject);
};

export const asyncGetAllPost = (payload) => {
  return new Promise((resolve, reject) => {
    getAllPost(payload, resolve, reject);
  });
};

const getMp3 = (payload, resolve, reject) => {
  sagaMiddleware.run(getMp3Effect, payload, resolve, reject);
};

export const asyncGetMp3 = (payload) => {
  return new Promise((resolve, reject) => {
    getMp3(payload, resolve, reject);
  });
};

export const saveAllPost = (payload) => {
  return {
    type: SAVE_ALL_POST,
    payload,
  };
};

export const saveMp3 = (payload) => {
  return {
    type: SAVE_MP3,
    payload,
  };
};
