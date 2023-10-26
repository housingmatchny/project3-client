import { API_URL } from "./API_URL";

import axios from "axios";

//appends the token to the header when making a GET request to the API/route (example, API/listings)
export const get = (route) => {
  let token = localStorage.getItem("authToken");

  return axios.get(API_URL + route, {
    headers: { Authorization: `Bearer ${token}` },
  })
};

export const post = (route, body) => {
  let token = localStorage.getItem("authToken");

  return axios.post(API_URL + route, body, {
    headers: { Authorization: `Bearer ${token}` },
  })
};

export const put = (route, body) => {
  let token = localStorage.getItem("authToken");

  return axios.put(API_URL + route, body, {
    headers: { Authorization: `Bearer ${token}` },
  })
};

export const axiosDelete = (route) => {
  let token = localStorage.getItem("authToken");

  return axios.delete(API_URL + route, {
    headers: { Authorization: `Bearer ${token}` },
  })
};
