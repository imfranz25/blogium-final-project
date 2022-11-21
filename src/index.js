/* 3rd Party Modules */
import React from 'react';
import reportWebVitals from './reportWebVitals';
import { createRoot } from 'react-dom/client';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import { RouterProvider } from 'react-router-dom';

/* Module Imports */
import router from './router';
import rootReducer from './reducers';
import './index.css';

/* React & Strore Set-up */
const container = document.getElementById('root');
const root = createRoot(container);
const store = configureStore({ reducer: rootReducer });

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
