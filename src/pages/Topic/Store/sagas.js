import { call, put } from "redux-saga/effects";

import {
  getAllPost,
  searchArticles,
  getSavedPosts,
} from "../../../services/Topic";

import { saveAllPost } from "./actions";

function* getAllPostEffect(payload, resolve, reject) {
  const response = yield call(getAllPost, payload);

  if (response) {
    yield put(saveAllPost({ data: response.data }));
    resolve(response);
  } else {
    reject("Error calling api");
  }
}

function* searchArticlesEffect(payload, resolve, reject) {
  const response = yield call(searchArticles, payload);

  if (response) {
    yield put(saveAllPost({ data: response.data }));
    resolve(response);
  } else {
    reject("Error calling api");
  }
}

function* getSavedPostsEffect(payload, resolve, reject) {
  const response = yield call(getSavedPosts, payload);

  if (response) {
    yield put(saveAllPost({ data: response.data }));
    resolve(response);
  } else {
    reject("Error calling api");
  }
}

export { getAllPostEffect, searchArticlesEffect, getSavedPostsEffect };
