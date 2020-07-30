import { call, put } from "redux-saga/effects";
import { submitPost, deletePosts, updatePosts } from "../../../services/Admin";
import { getAllPost, getDetailPost } from "../../../services/Blog";
import { saveAllPost, saveDetailPost } from "./actions";

function* submitPosteEffect(payload, resolve, reject) {
  const response = yield call(submitPost, payload);

  if (response) {
    reject("Error calling api");
  } else {
    resolve({ message: "Thành công" });
  }
}

function* getAllPostEffect(payload, resolve, reject) {
  const response = yield call(getAllPost, payload);
  if (response) {
    yield put(saveAllPost({ ...response }));
    resolve("");
  } else {
    reject("Error calling api");
  }
}

function* deletePostsEffect(payload, resolve) {
  yield call(deletePosts, payload);
  resolve("");
}

function* updatePostsEffect(payload, resolve) {
  yield call(updatePosts, payload);
  resolve();
}

function* getDetailPostEffect(payload, resolve, reject) {
  const response = yield call(getDetailPost, payload);
  yield put(saveDetailPost({ ...response }));

  if (response) {
    resolve(response);
  } else {
    reject("Error calling api");
  }
}

export {
  submitPosteEffect,
  getAllPostEffect,
  deletePostsEffect,
  updatePostsEffect,
  getDetailPostEffect,
};
