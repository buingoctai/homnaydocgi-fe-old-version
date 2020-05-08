import { call, put } from "redux-saga/effects";

import { getAllPost, searchArticles } from "../../../services/Topic";

import { saveAllPost } from "./actions";

function* getAllPostEffect(payload, resolve, reject) {
  const response = yield call(getAllPost, payload);

  if (response) {
    console.log(response);
    yield put(saveAllPost({ data: response.data }));
    resolve(response);
  } else {
    reject("Error calling api");
  }
}

function* searchArticlesEffect(payload, resolve, reject) {
  const response = yield call(searchArticles, payload);

  if (response) {
    console.log(response);
    yield put(saveAllPost({ data: response.data }));
    resolve(response);
  } else {
    reject("Error calling api");
  }
}

export { getAllPostEffect, searchArticlesEffect };
