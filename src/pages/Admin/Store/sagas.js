import { call } from "redux-saga/effects";
import { submitPost } from "../../../services/Admin";

function* submitPosteEffect(payload, resolve, reject) {
  const response = yield call(submitPost, payload);

  if (response) {
    resolve(response);
  } else {
    reject("Error calling api");
  }
}

export { submitPosteEffect };
