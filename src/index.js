/* 3rd Party Modules */
import React from 'react';
import Parse from 'parse';
import reportWebVitals from './reportWebVitals';
import { createRoot } from 'react-dom/client';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import { RouterProvider } from 'react-router-dom';

/* Module Imports */
import router from './router';
import rootReducer from './reducers';
import './index.css';

/* React & Store Set-up */
const store = configureStore({ reducer: rootReducer });
const container = document.getElementById('root');
const root = createRoot(container);

/* Parse Server Config */
const PARSE_APPLICATION_ID = process.env.PARSE_APPLICATION_ID || 'myAppId';
const PARSE_SERVER_URL = process.env.PARSE_SERVER_URL || 'http://localhost:1337/parse/';
const PARSE_JAVASCRIPT_KEY = process.env.PARSE_JAVASCRIPT_KEY || 'myJSKey';

Parse.initialize(PARSE_APPLICATION_ID, PARSE_JAVASCRIPT_KEY);
Parse.serverURL = PARSE_SERVER_URL;

/* Render App */
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
