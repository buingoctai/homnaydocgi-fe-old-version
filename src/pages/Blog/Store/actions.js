import { sagaMiddleware } from "../../../Store/actions";
import { SAVE_MAIN_POSTS, SAVE_FEATURED_POSTS } from "./constants";
import { getMainPostsEffect, getFeaturedPostsEffect } from "./sagas";

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
