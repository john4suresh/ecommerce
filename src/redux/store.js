/* eslint-disable import/no-anonymous-default-export */
import { createStore, applyMiddleware } from "redux";
import { persistStore } from "redux-persist";
import logger from "redux-logger";
// import thunk from "redux-thunk";
import createSagaMiddleWare from "redux-saga";

import rootReducer from "./root-reducer";

import rootSaga from "./root-saga";

const sagaMiddleWare = createSagaMiddleWare();

const middlewares = [sagaMiddleWare];

if (process.env.NODE_ENV === "development") {
  middlewares.push(logger);
}

const store = createStore(rootReducer, applyMiddleware(...middlewares));

sagaMiddleWare.run(rootSaga);

export const persistor = persistStore(store);

export default store;
