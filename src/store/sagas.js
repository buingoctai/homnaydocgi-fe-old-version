import { call, put } from "redux-saga/effects";
import { COOKIE_NAMES } from "../utils/constants";
import { setCookie } from "../utils/utils";

import { authencationUser, getProfile } from "../services/User";
import { saveToken, saveCurrentUser } from "./actions";

import { fnSaveSubcription, fnGetAllSubcriptions } from "../services/Notification";
import { saveSubcription, getAllSubcriptions } from "./actions";

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

function* saveSubcriptionEffect(payload, resolve, reject) {
  const response = yield call(fnSaveSubcription, payload);

  if (!response) {
    const { subcription } = response;
    yield put(saveSubcription(subcription));
    resolve(response);
  } else {
    reject("Error calling api");
  }
}

function* getAllSubcriptionsEffect(resolve, reject) {
  const response = yield call(fnGetAllSubcriptions);

  if (!response) {
    const { subcriptions } = response;
    yield put(getAllSubcriptions(subcriptions));
    resolve(response);
  } else {
    reject("Error calling api");
  }
}

export { saveTokenToCookieEffect, authencationEffect, getProfileEffect, saveSubcriptionEffect, getAllSubcriptionsEffect };
