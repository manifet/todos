import React from 'react';
import ReactDOM from 'react-dom/client';
import {Provider as ReduxProvider} from "react-redux";

import {createStore} from "./model/store"
import App from './App';

import './index.css';

const store = createStore()

const root = ReactDOM.createRoot(
    document.getElementById('root') as HTMLElement
);

root.render(
    <ReduxProvider store={store}>
        <App/>
    </ReduxProvider>
);

