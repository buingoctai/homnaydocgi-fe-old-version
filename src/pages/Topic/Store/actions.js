import { sagaMiddleware } from "../../../store/actions";
import { SAVE_ALL_POST } from "./constants";
import { getAllPostEffect } from "./sagas";

const getAllPost = (payload, resolve, reject) => {
  sagaMiddleware.run(getAllPostEffect, payload, resolve, reject);
};

export const asyncGetAllPost = (payload) => {
  return new Promise((resolve, reject) => {
    getAllPost(payload, resolve, reject);
  });
};

export const saveAllPost = (payload) => {
  return {
    type: SAVE_ALL_POST,
    payload,
  };
};
