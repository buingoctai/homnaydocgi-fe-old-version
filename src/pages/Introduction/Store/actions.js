import { sagaMiddleware } from "../../../store/actions";
import { submitUserDataEffect } from "./sagas";

const submitUserData = (payload, resolve, reject) => {
  sagaMiddleware.run(submitUserDataEffect, payload, resolve, reject);
};

export const asyncSubmitUserData = (payload) => {
  return new Promise((resolve, reject) => {
    submitUserData(payload, resolve, reject);
  });
};
