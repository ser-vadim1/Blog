import axios from "axios";
export const Server = "http://localhost:3001/api/v1";
export const DOM_NAME = 'http://localhost:3001'

export const generalRouter = axios.create({
  baseURL: Server,
  responseType: "json",
  headers: { "Content-Type": "application/json" },
});
export const protectRouter = axios.create({
  baseURL: Server,
  responseType: "json",
  headers: { "Content-Type": "application/json" },
});

  protectRouter.interceptors.request.use(
  async (config) => {
    let token = localStorage.getItem("AccessToken");
    if (token) {
      config.headers["authorization"] = "Bearer " + token;
    }

    
    // Do something before request is sent
    return config;
  },
  function (error) {
    console.log("error inteseptor", error);

    // Do something with request error
    return Promise.reject(error);
  }
);

export const SIGN_IN = `/auth`;
export const CREATE_USER = `/users`;
export const GET_USER = `/auth/user`;
export const ENDPOINT_USER = `/users`;
export const UPDATE_USER_AVATAR = `users/upload`;
export const ENDPOINT_POSTS = `/posts`;
export const UPDATE_POSTS_BY_ID = `/posts/upload`;
