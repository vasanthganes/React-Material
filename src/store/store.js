import thunk from "redux-thunk";
import { createStore, applyMiddleware, compose } from "redux";
import createHistory from "history/createBrowserHistory";
import { routerMiddleware } from "react-router-redux";


import reducer from "./reducers/index";

const initalState = {};

export const history = createHistory();

const middleware = [thunk, routerMiddleware(history)];

const store = createStore(
  reducer,
  initalState,
  compose(
    /* logger must be the last middleware in chain to log actions */
    applyMiddleware(...middleware)
  )
);

export default store;
