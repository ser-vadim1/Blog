import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import store from './app/store';
import { Provider } from 'react-redux';
import * as serviceWorker from './serviceWorker';
import {GetUser,signOut} from "../src/Redux/Auth"
let AccessToken = localStorage.getItem("AccessToken");

if(AccessToken){
  store.dispatch(GetUser())
}
ReactDOM.render(
    <Provider store={store}>
      <App />
    </Provider>
,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
