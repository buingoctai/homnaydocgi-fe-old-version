import { call, put } from "redux-saga/effects";
import { getAllArticle, getMp3 } from "../../../services/ReadNew";

import { saveAllPost, saveMp3 } from "./actions";

function* getAllPostEffect(payload, resolve, reject) {
  const response = yield call(getAllArticle, payload);

  if (response) {
    yield put(saveAllPost(response));
    resolve("");
  } else {
    reject("Error calling api");
  }
}

function* getMp3Effect(payload, resolve, reject) {
  const response = yield call(getMp3, payload);

  if (response) {
    console.log("response=", response);
    yield put(saveMp3(response));
    resolve("");
  } else {
    reject("Error calling api");
  }
}

export { getAllPostEffect, getMp3Effect };
