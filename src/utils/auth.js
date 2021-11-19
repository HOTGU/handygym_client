import axios from "axios";

export const onLoginSuccess = (data) => {
    const { accessToken } = data;

    axios.defaults.headers.common["Authorization"] = `Bearer ${accessToken}`;
};

export const onLogoutSuccess = () => {
    axios.defaults.headers.common["Authorization"] = "";
};
