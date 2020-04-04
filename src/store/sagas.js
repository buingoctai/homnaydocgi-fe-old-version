import { put } from "redux-saga/effects";
import { COOKIE_NAMES } from "../utils/constants";
import { setCookie } from "../utils/utils";

function* submitDataSuccess(payload) {
  setCookie(COOKIE_NAMES.ACCESS_TOKEN, payload, 1);
  yield put({ type: "SAVE_TOKEN", payload });
}

export { submitDataSuccess };
