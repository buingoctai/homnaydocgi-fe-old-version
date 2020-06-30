import { call } from "redux-saga/effects";
import { submitUserData } from "../../../services/Introduction";

function* submitUserDataEffect(payload, resolve, reject) {
  const response = yield call(submitUserData, { ...payload });

  if (response) {
    resolve(response);
  } else {
    reject("Error calling api");
  }
}

export { submitUserDataEffect };
