import React from "react";
import { RouterProvider as Router } from "react-router-dom";

import ReactDOM from "react-dom/client";
import { router } from "./routers";

import { Provider } from "react-redux";
import store from "./redux/store";

import "./index.css";

import Hotjar from '@hotjar/browser';

const siteId = 4949105;
const hotjarVersion = 6;

Hotjar.init(siteId, hotjarVersion);

ReactDOM.createRoot(document.getElementById("root")!).render(
    <React.StrictMode>
        <Provider store={store}>
            <Router router={router}></Router>
        </Provider>
    </React.StrictMode>
);
