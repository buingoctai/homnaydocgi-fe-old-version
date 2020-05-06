import { sagaMiddleware } from "../../../store/actions";
import { SAVE_ALL_POST, SAVE_DETAIL_POST } from "./constants";
import {
  submitPosteEffect,
  getAllPostEffect,
  deletePostsEffect,
  updatePostsEffect,
  getDetailPostEffect,
} from "./sagas";

const submitPost = (payload, resolve, reject) => {
  sagaMiddleware.run(submitPosteEffect, payload, resolve, reject);
};

export const asyncSubmitPost = (payload) => {
  return new Promise((resolve, reject) => {
    submitPost(payload, resolve, reject);
  });
};

const getAllPost = (payload, resolve, reject) => {
  sagaMiddleware.run(getAllPostEffect, payload, resolve, reject);
};

export const asyncGetAllPost = (payload) => {
  return new Promise((resolve, reject) => {
    getAllPost(payload, resolve, reject);
  });
};

const deletePosts = (payload, resolve, reject) => {
  sagaMiddleware.run(deletePostsEffect, payload, resolve, reject);
};

export const asyncDeletePosts = (payload) => {
  return new Promise((resolve, reject) => {
    deletePosts(payload, resolve, reject);
  });
};

const updatePosts = (payload, resolve, reject) => {
  sagaMiddleware.run(updatePostsEffect, payload, resolve, reject);
};

export const asyncUpdatePosts = (payload) => {
  return new Promise((resolve, reject) => {
    updatePosts(payload, resolve, reject);
  });
};

const getDetailPost = (payload, resolve, reject) => {
  sagaMiddleware.run(getDetailPostEffect, payload, resolve, reject);
};
export const asyncGetDetailPost = (payload) => {
  return new Promise((resolve, reject) => {
    getDetailPost(payload, resolve, reject);
  });
};

export const saveAllPost = (payload) => {
  return {
    type: SAVE_ALL_POST,
    payload,
  };
};

export const saveDetailPost = (payload) => {
  return {
    type: SAVE_DETAIL_POST,
    payload,
  };
};
