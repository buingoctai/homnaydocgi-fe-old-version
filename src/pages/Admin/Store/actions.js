import { sagaMiddleware } from "../../../Store/actions";
import { submitPosteEffect } from "./sagas";

const submitPost = (payload, resolve, reject) => {
  sagaMiddleware.run(submitPosteEffect, payload, resolve, reject);
};

export const asyncSubmitPost = (payload) => {
  return new Promise((resolve, reject) => {
    submitPost(payload, resolve, reject);
  });
};
