import { sagaMiddleware } from "../../../store/actions";
import {
  SAVE_MAIN_POSTS,
  SAVE_FEATURED_POSTS,
  SAVE_ALL_POST,
  SAVE_DETAIL_POST,
  SAVE_ALL_TOPIC,
} from "./constants";
import {
  getMainPostsEffect,
  getFeaturedPostsEffect,
  getAllPostEffect,
  suggestSubscribeNotifiByBotEffect,
  getDetailPostEffect,
  getAllTopicEffect,
  subscribePageEffect,
  unSubscribePageEffect,
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

const getDetailPost = (payload, resolve, reject) => {
  sagaMiddleware.run(getDetailPostEffect, payload, resolve, reject);
};

export const asyncGetDetailPost = (payload) => {
  return new Promise((resolve, reject) => {
    getDetailPost(payload, resolve, reject);
  });
};

const getAllTopic = (payload, resolve, reject) => {
  sagaMiddleware.run(getAllTopicEffect, payload, resolve, reject);
};

export const asyncGetAllTopic = (payload) => {
  return new Promise((resolve, reject) => {
    getAllTopic(payload, resolve, reject);
  });
};

const subscribePage = (payload, resolve, reject) => {
  sagaMiddleware.run(subscribePageEffect, payload, resolve, reject);
};
export const asyncSubscribePage = (payload) => {
  return new Promise((resolve, reject) => {
    subscribePage(payload, resolve, reject);
  });
};

const unSubscribePage = (payload, resolve, reject) => {
  sagaMiddleware.run(unSubscribePageEffect, payload, resolve, reject);
};
export const asyncUnSubscribePage = (payload) => {
  return new Promise((resolve, reject) => {
    unSubscribePage(payload, resolve, reject);
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

export const saveDetailPost = (payload) => {
  return {
    type: SAVE_DETAIL_POST,
    payload,
  };
};

export const saveAllTopic = (payload) => {
  return {
    type: SAVE_ALL_TOPIC,
    payload,
  };
};
