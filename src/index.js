import React from "react";
import ReactDOM from "react-dom";
import { composeWithDevTools } from "redux-devtools-extension";
import * as serviceWorker from "./serviceWorker";
import { createStore, applyMiddleware, compose } from "redux";
import createSagaMiddleware from "redux-saga";
import { Provider } from "react-redux";
import reducer from "./store/reducer";
import { submitDataSuccess } from "./store/sagas";
import { sagaMiddleware } from "./store/actions";
import "./index.css";
import App from "./pages/App";

//const sagaMiddleware = createSagaMiddleware();
const store = createStore(
  reducer,
  compose(applyMiddleware(sagaMiddleware), composeWithDevTools())
);
// sagaMiddleware.run(submitDataSuccess);
ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById("root")
);
serviceWorker.unregister();
