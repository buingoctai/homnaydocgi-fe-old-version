import { call, put } from "redux-saga/effects";
import { getAllArticle, getMp3 } from "../../../services/ReadNew";

import { saveAllArticle, saveMp3 } from "./actions";

function* getAllArticleEffect(payload, resolve, reject) {
  const response = yield call(getAllArticle, payload);

  if (response) {
    yield put(saveAllArticle(response));
    resolve("");
  } else {
    reject("Error calling api");
  }
}

function* getMp3Effect(payload, resolve, reject) {
  const response = yield call(getMp3, payload);

  if (response) {
    yield put(saveMp3(response));
    resolve("");
  } else {
    reject("Error calling api");
  }
}

export { getAllArticleEffect, getMp3Effect };
