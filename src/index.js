import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import { Toaster } from "react-hot-toast";

import "./index.css";
import App from "./App";

import store from "./redux/store";

ReactDOM.render(
    <div className="GFont bg-gray-50 min-h-screen">
        <Provider store={store}>
            <App />
            <Toaster
                toastOptions={{
                    duration: 2000,
                }}
            />
        </Provider>
    </div>,
    document.getElementById("root")
);
