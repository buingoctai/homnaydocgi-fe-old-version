import { sagaMiddleware } from "../../../store/actions";
import { SAVE_ALL_ARTICLE, SAVE_AUDIO_LIST } from "./constants";
import {
  getAllArticleEffect,
  getAudioArticleEffect,
  createAudioArticleEffect,
} from "./sagas";

const getAllArticle = (payload, resolve, reject) => {
  sagaMiddleware.run(getAllArticleEffect, payload, resolve, reject);
};

export const asyncGetAllArticle = (payload) => {
  return new Promise((resolve, reject) => {
    getAllArticle(payload, resolve, reject);
  });
};

const getAudioArticle = (payload, resolve, reject) => {
  sagaMiddleware.run(getAudioArticleEffect, payload, resolve, reject);
};

export const asynGetAudioArticle = (payload) => {
  return new Promise((resolve, reject) => {
    getAudioArticle(payload, resolve, reject);
  });
};

const createAudioArticle = (payload, resolve, reject) => {
  sagaMiddleware.run(createAudioArticleEffect, payload, resolve, reject);
};

export const asynCreateAudioArticle = (payload) => {
  return new Promise((resolve, reject) => {
    createAudioArticle(payload, resolve, reject);
  });
};

export const saveAllArticle = (payload) => {
  return {
    type: SAVE_ALL_ARTICLE,
    payload,
  };
};

export const saveAudioList = (payload) => {
  return {
    type: SAVE_AUDIO_LIST,
    payload,
  };
};
