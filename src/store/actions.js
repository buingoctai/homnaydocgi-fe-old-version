import createSagaMiddleware from "redux-saga";
import { submitDataSuccess } from "./sagas";

export const sagaMiddleware = createSagaMiddleware();

export const saveToken = payload => {
  sagaMiddleware.run(submitDataSuccess, payload);
};
