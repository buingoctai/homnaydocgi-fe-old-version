import { sagaMiddleware } from "../../../store/actions";
import {
  SAVE_MAIN_POSTS,
  SAVE_FEATURED_POSTS,
  SAVE_ALL_POST,
} from "./constants";
import {
  getMainPostsEffect,
  getFeaturedPostsEffect,
  getAllPostEffect,
  suggestSubscribeNotifiByBotEffect,
} from "./sagas";

const getMainPosts = (payload, resolve, reject) => {
  sagaMiddleware.run(getMainPostsEffect, payload, resolve, reject);
};

export const asyncGetMainPosts = (payload) => {
  return new Promise((resolve, reject) => {
    getMainPosts(payload, resolve, reject);
  });
};

const getFeaturedPosts = (payload, resolve, reject) => {
  sagaMiddleware.run(getFeaturedPostsEffect, payload, resolve, reject);
};

export const asyncGetFeaturedPosts = (payload) => {
  return new Promise((resolve, reject) => {
    getFeaturedPosts(payload, resolve, reject);
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

const suggestSubscribeNotifiByBot = (payload, resolve, reject) => {
  sagaMiddleware.run(
    suggestSubscribeNotifiByBotEffect,
    payload,
    resolve,
    reject
  );
};
export const asyncSuggestSubscribeNotifiByBot = (payload) => {
  return new Promise((resolve, reject) => {
    suggestSubscribeNotifiByBot(payload, resolve, reject);
  });
};

export const saveMainPosts = (payload) => {
  return {
    type: SAVE_MAIN_POSTS,
    payload,
  };
};

export const saveFeaturedPosts = (payload) => {
  return {
    type: SAVE_FEATURED_POSTS,
    payload,
  };
};

export const saveAllPost = (payload) => {
  return {
    type: SAVE_ALL_POST,
    payload,
  };
};
