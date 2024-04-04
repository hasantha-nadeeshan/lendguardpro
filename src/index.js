import React from 'react';
import ReactDOM from 'react-dom/client';
import { createRoot } from 'react-dom/client';
import { Provider } from 'react-redux';
import rootReducer from './reducers/rootReducer';
import rootSaga from "./store";
import createSagaMiddleware from "redux-saga";
import { configureStore } from "@reduxjs/toolkit";
import App from './App';
import "bootstrap/dist/css/bootstrap.min.css";
const sagaMiddleware = createSagaMiddleware();
const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) => [
    ...getDefaultMiddleware(),
    sagaMiddleware,
  ],
});

sagaMiddleware.run(rootSaga);

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <Provider store={store}>
    <App />
  </Provider>
);