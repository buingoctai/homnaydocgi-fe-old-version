import { call, put } from "redux-saga/effects";

import { sendMsgViaBot } from "../../../services/Common";
import {
  getMainPosts,
  getFeaturedPosts,
  getAllPost,
  getDetailPost,
  getAllTopic,
} from "../../../services/Blog";

import {
  saveMainPosts,
  saveFeaturedPosts,
  saveDetailPost,
  saveAllTopic,
} from "./actions";

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

function* getDetailPostEffect(payload, resolve, reject) {
  const response = yield call(getDetailPost, payload);
  yield put(saveDetailPost({ ...response }));

  if (response) {
    console.log("response=", response);
    resolve(response);
  } else {
    reject("Error calling api");
  }
}

function* getAllTopicEffect(payload, resolve, reject) {
  const response = yield call(getAllTopic, payload);
  yield put(saveAllTopic([...response]));

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
  getDetailPostEffect,
  getAllTopicEffect,
};
