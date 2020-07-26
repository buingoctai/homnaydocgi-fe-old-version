import React from "react";
import ReactDOM from "react-dom";
import { composeWithDevTools } from "redux-devtools-extension/developmentOnly";
import * as serviceWorker from "./serviceWorker";
import {
  createStore,
  applyMiddleware,
  combineReducers,
} from "redux";
import createSagaMiddleware from "redux-saga";
import { Provider } from "react-redux";
import reducers from "./store/reducers";
import blogReducers from "./pages/Blog/Store/reducers";
import adminReducers from "./pages/Admin/Store/reducers";
import topicReducers from "./pages/Topic/Store/reducers";
import readNewReducers from "./pages/Bots/Store/reducers";
import { submitDataSuccess } from "./store/sagas";
import { sagaMiddleware } from "./store/actions";
import initialState from "./store/state";
import blogState from "./pages/Blog/Store/state";
import App from "./pages/App";
import "./index.css";

//const sagaMiddleware = createSagaMiddleware();
const store = createStore(
  combineReducers({
    reducers,
    blogReducers,
    adminReducers,
    topicReducers,
    readNewReducers,
  }),
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
serviceWorker.register();
console.log(serviceWorker.createNotificationSubscription())
