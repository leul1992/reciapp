import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App/App';
import { configureStore } from '@reduxjs/toolkit';
import allReducers from './reducers';
import { Provider } from 'react-redux';

const store = configureStore({
  reducer: allReducers,
});

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  
  <Provider store={store}>
  <App />
</Provider>
  
);
