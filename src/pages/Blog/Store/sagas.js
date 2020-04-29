import { call, put } from "redux-saga/effects";

import { sendMsgViaBot } from "../../../services/Common";
import {
  getMainPosts,
  getFeaturedPosts,
  getAllPost,
} from "../../../services/Blog";

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

function* getAllPostEffect(payload, resolve, reject) {
  const response = yield call(getAllPost, payload);

  if (response) {
    resolve(response);
  } else {
    reject("Error calling api");
  }
}

function* suggestSubscribeNotifiByBotEffect(payload, resolve, reject) {
  const response = yield call(sendMsgViaBot, payload);

  if (response) {
    resolve(response);
  } else {
    reject("Error calling api");
  }
}

export {
  getMainPostsEffect,
  getFeaturedPostsEffect,
  getAllPostEffect,
  suggestSubscribeNotifiByBotEffect,
};
