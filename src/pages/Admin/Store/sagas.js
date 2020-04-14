import { call } from "redux-saga/effects";
import { submitPost } from "../../../services/Admin";

function* submitPosteEffect(payload, resolve, reject) {
  const response = yield call(submitPost, payload);

  if (response) {
    resolve("GỬI BÀI VIẾT THÀNH CÔNG");
  } else {
    reject("Error calling api");
  }
}

export { submitPosteEffect };
