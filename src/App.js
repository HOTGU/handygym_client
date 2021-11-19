import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { refresh } from "./redux/userSlice";
import axios from "axios";
import Cookie from "js-cookie";
import { BrowserRouter, Switch, Route } from "react-router-dom";

import Navbar from "./components/Navbar";
import Home from "./components/Home";
import Page404 from "./components/Page404";
import Auth from "./components/Auth";
import Preview from "./components/Learner/Preview";
import Create from "./components/Learner/Posts/Create";
import PrivateRoute from "./components/PrivateRoute";
import ProPreview from "./components/Pro/Preview";
import Register from "./components/Pro/Register";

axios.defaults.baseURL = "http://localhost:5000";
axios.defaults.withCredentials = true;

const App = () => {
    const dispatch = useDispatch();

    useEffect(() => {
        if (Cookie.get("refreshToken")) {
            dispatch(refresh());
        }
    }, [dispatch]);

    return (
        <BrowserRouter>
            <Navbar />
            <Switch>
                <Route path="/" exact component={Home} />
                <Route path="/auth" component={Auth} />
                <Route path="/learner" exact component={Preview} />
                <PrivateRoute path="/learner/post/create" component={Create} />
                <Route path="/pro" exact component={ProPreview} />
                <PrivateRoute path="/pro/register" exact component={Register} />
                <Route component={Page404} />
            </Switch>
        </BrowserRouter>
    );
};

export default App;
