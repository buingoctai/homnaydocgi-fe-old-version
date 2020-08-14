import createSagaMiddleware from "redux-saga";
import {
  saveTokenToCookieEffect,
  authencationEffect,
  getProfileEffect,
} from "./sagas";

import {
  saveSubcriptionEffect,
  getAllSubcriptionsEffect
} from "./sagas";

import { SAVE_CURRENT_USER, SAVE_TOKEN, SAVE_CURRENT_SUBCRIPTION, GET_ALL_SUBCRIPTIONS } from "./constants";

export const sagaMiddleware = createSagaMiddleware();

export const saveTokenToCookie = (payload) => {
  sagaMiddleware.run(saveTokenToCookieEffect, payload);
};

export const saveToken = (payload) => {
  return {
    type: SAVE_TOKEN,
    payload,
  };
};

const authencation = (payload, resolve, reject) => {
  sagaMiddleware.run(authencationEffect, payload, resolve, reject);
};
export const asyncAuthencation = (payload) => {
  return new Promise((resolve, reject) => {
    authencation(payload, resolve, reject);
  });
};

const getProfile = (payload, resolve, reject) => {
  sagaMiddleware.run(getProfileEffect, payload, resolve, reject);
};
export const asyncGetProfile = (payload) => {
  return new Promise((resolve, reject) => {
    getProfile(payload, resolve, reject);
  });
};

export const saveCurrentUser = (payload) => {
  return {
    type: SAVE_CURRENT_USER,
    payload,
  };
};

export const saveSubcription = (payload) => {
  return {
    type: SAVE_CURRENT_SUBCRIPTION,
    payload
  }
};

const sagaSaveSubcription = (payload, resolve, reject) => {
  sagaMiddleware.run(saveSubcriptionEffect, payload, resolve, reject);
};

export const asyncSaveSubcription = (payload) => {
  return new Promise((resolve, reject) => {
    sagaSaveSubcription(payload, resolve, reject);
  });
};

export const getAllSubcriptions = () => {
  return {
    type: GET_ALL_SUBCRIPTIONS
  }
};

export const sagaGetAllSubcriptions = (resolve, reject) => {
  sagaMiddleware.run(getAllSubcriptionsEffect, resolve, reject);
};

export const asyncGetAllSubcriptions = () => {
  return new Promise((resolve, reject) => {
    sagaGetAllSubcriptions(resolve, reject);
  });
};