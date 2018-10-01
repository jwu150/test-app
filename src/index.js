import React from 'react';
import ReactDOM from 'react-dom';
import thunk from 'redux-thunk';
import { createStore, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import tweetReducer from './tweetReducer'
import App from './App';
import 'bootstrap/dist/css/bootstrap.min.css';
import './index.css';

const store = createStore(
  tweetReducer,
  applyMiddleware(thunk)
);

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root'));
