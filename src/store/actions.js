import createSagaMiddleware from "redux-saga";
import {
  saveTokenToCookieEffect,
  authencationEffect,
  getProfileEffect,
} from "./sagas";
import { SAVE_CURRENT_USER, SAVE_TOKEN } from "./constants";

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
