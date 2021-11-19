import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { Route, Redirect } from "react-router-dom";
import toast from "react-hot-toast";

function PrivateRoute(props) {
    const { isAuth } = useSelector((state) => state.user);
    useEffect(() => {
        if (!isAuth) toast("로그인해야 이용가능합니다", { icon: "🚀" });
    }, []);
    return isAuth ? (
        <Route {...props} />
    ) : (
        <Redirect to={{ pathname: "/auth", state: { referer: props.location } }} />
    );
}

export default PrivateRoute;
