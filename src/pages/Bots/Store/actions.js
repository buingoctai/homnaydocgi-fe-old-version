import { sagaMiddleware } from "../../../store/actions";
import { SAVE_ALL_ARTICLE, SAVE_MP3 } from "./constants";
import { getAllArticleEffect, getMp3Effect } from "./sagas";


const getAllArticle = (payload, resolve, reject) => {
  sagaMiddleware.run(getAllArticleEffect, payload, resolve, reject);
};

export const asyncGetAllArticle = (payload) => {
  return new Promise((resolve, reject) => {
    getAllArticle(payload, resolve, reject);
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

export const saveAllArticle = (payload) => {
  return {
    type: SAVE_ALL_ARTICLE,
    payload,
  };
};

export const saveMp3 = (payload) => {
  return {
    type: SAVE_MP3,
    payload,
  };
};
