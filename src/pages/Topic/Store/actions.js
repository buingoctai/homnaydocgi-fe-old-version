import { sagaMiddleware } from "../../../store/actions";
import { SAVE_ALL_POST } from "./constants";
import {
  getAllPostEffect,
  searchArticlesEffect,
  getSavedPostsEffect,
} from "./sagas";

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

const searchArticles = (payload, resolve, reject) => {
  sagaMiddleware.run(searchArticlesEffect, payload, resolve, reject);
};

export const asyncSearchArticles = (payload) => {
  return new Promise((resolve, reject) => {
    searchArticles(payload, resolve, reject);
  });
};

const getSavedPosts = (payload, resolve, reject) => {
  sagaMiddleware.run(getSavedPostsEffect, payload, resolve, reject);
};

export const asyncGetSavedPosts = (payload) => {
  return new Promise((resolve, reject) => {
    getSavedPosts(payload, resolve, reject);
  });
};
