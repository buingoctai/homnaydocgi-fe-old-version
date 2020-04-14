import React from "react";
import ReactDOM from "react-dom";
import { composeWithDevTools } from "redux-devtools-extension/developmentOnly";
import * as serviceWorker from "./serviceWorker";
import {
  createStore,
  applyMiddleware,
  combineReducers,
  CombinedState,
  compose,
} from "redux";
import createSagaMiddleware from "redux-saga";
import { Provider } from "react-redux";
import reducers from "./Store/reducers";
import blogReducers from "./pages/Blog/Store/reducers";
import { submitDataSuccess } from "./Store/sagas";
import { sagaMiddleware } from "./Store/actions";
import initialState from "./Store/state";
import blogState from "./pages/Blog/Store/state";
import App from "./pages/App";
import "./index.css";

//const sagaMiddleware = createSagaMiddleware();
const store = createStore(
  combineReducers({ reducers, blogReducers }),
  initialState,
  //compose(applyMiddleware(sagaMiddleware), composeWithDevTools())
  composeWithDevTools(applyMiddleware(sagaMiddleware))
);
// sagaMiddleware.run(submitDataSuccess);
ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById("root")
);
serviceWorker.unregister();
