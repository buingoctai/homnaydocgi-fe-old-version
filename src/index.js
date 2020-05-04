import React from "react";
import { TrackerProvider, Tracker } from 'react-tracker';
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
import reducers from "./store/reducers";
import blogReducers from "./pages/Blog/Store/reducers";
import { trackProductClick } from './pages/Blog/Tracking/eventListener/trackProductClick';
import adminReducers from "./pages/Admin/Store/reducers";
import { submitDataSuccess } from "./store/sagas";
import { sagaMiddleware } from "./store/actions";
import initialState from "./store/state";
import blogState from "./pages/Blog/Store/state";
import App from "./pages/App";
import "./index.css";

//const sagaMiddleware = createSagaMiddleware();
const store = createStore(
  combineReducers({ reducers, blogReducers, adminReducers }),
  initialState,
  //compose(applyMiddleware(sagaMiddleware), composeWithDevTools())
  composeWithDevTools(applyMiddleware(sagaMiddleware))
);
// sagaMiddleware.run(submitDataSuccess);

const tracker = new Tracker([trackProductClick])
ReactDOM.render(
  <Provider store={store}>
    <TrackerProvider tracker={tracker}>
      <App /></TrackerProvider>
  </Provider>,
  document.getElementById("root")
);
serviceWorker.unregister();
