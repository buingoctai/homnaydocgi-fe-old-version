import { call, put } from "redux-saga/effects";
import {
  getAllArticle,
  getAudioArticle,
  createAudioArticle,
} from "../../../services/ReadNew";

import { saveAllArticle } from "./actions";

function* getAllArticleEffect(payload, resolve, reject) {
  const response = yield call(getAllArticle, payload);

  if (response) {
    yield put(saveAllArticle(response));
    resolve("");
  } else {
    reject("Error calling api");
  }
}

function* getAudioArticleEffect(payload, resolve, reject) {
  const response = yield call(getAudioArticle, payload);

  if (response) {
    resolve(response);
  } else {
    reject("Error calling api");
  }
}

function* createAudioArticleEffect(payload, resolve, reject) {
  const response = yield call(createAudioArticle, payload);

  if (response) {
    resolve(response);
  } else {
    reject("Error calling api");
  }
}

export { getAllArticleEffect, getAudioArticleEffect, createAudioArticleEffect };
