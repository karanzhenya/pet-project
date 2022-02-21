import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './app/App';
import {Provider} from "react-redux";
import {HashRouter} from "react-router-dom";
import store from "./BLL/store";

ReactDOM.render(
        <Provider store={store}>
                <App/>
        </Provider>
    ,
    document.getElementById('root')
);

