import { call, put } from "redux-saga/effects";
import { getMainPosts, getFeaturedPosts } from "../../../services/Blog";
import { saveMainPosts, saveFeaturedPosts } from "./actions";

function* getMainPostsEffect(payload, resolve, reject) {
  const response = yield call(getMainPosts, payload);

  if (response) {
    yield put(saveMainPosts({ ...response }));
    resolve();
  } else {
    reject("Error calling api");
  }
}

function* getFeaturedPostsEffect(payload, resolve, reject) {
  const response = yield call(getFeaturedPosts, payload);

  if (response) {
    yield put(saveFeaturedPosts({ ...response }));
    resolve();
  } else {
    reject("Error calling api");
  }
}

export { getMainPostsEffect, getFeaturedPostsEffect };
