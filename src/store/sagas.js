import { call, put } from "redux-saga/effects";
import { COOKIE_NAMES } from "../utils/constants";
import { setCookie } from "../utils/utils";

import { authencationUser, getProfile } from "../services/User";
import { saveToken, saveCurrentUser } from "./actions";

function* saveTokenToCookieEffect(payload) {
  setCookie(COOKIE_NAMES.ACCESS_TOKEN, payload, 1);
  yield put(saveToken(payload));
}

function* authencationEffect(payload, resolve, reject) {
  const response = yield call(authencationUser, payload);

  if (response) {
    resolve(response);
  } else {
    reject("Error calling api");
  }
}

function* getProfileEffect(payload, resolve, reject) {
  const response = yield call(getProfile, payload);

  if (response) {
    const { UserName } = response;
    yield put(saveCurrentUser(UserName));
    resolve(response);
  } else {
    reject("Error calling api");
  }
}
export { saveTokenToCookieEffect, authencationEffect, getProfileEffect };
