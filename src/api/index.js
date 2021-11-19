import axios from "axios";

const url = "http://localhost:5000";

// Learner post 파트

export const getLearnerPosts = () => axios.get(`${url}/post/fetch`);

export const createLearnerPost = (postData) => axios.post(`/post/create`, postData);

// Address 파트

export const getAddressByTerm = (term) => axios.get(`/address/search?term=${term}`);

// User 파트

export const signupApi = (formData) => axios.post(`/user/signup`, formData);

export const signinApi = (formData) => axios.post(`/user/signin`, formData);

export const refreshApi = () => axios.get(`/user/refresh`);

export const logoutApi = () => axios.post(`/user/logout`);
