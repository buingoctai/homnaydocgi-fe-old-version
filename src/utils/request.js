import { useHistory } from "react-router-dom";
import axios from "axios";
import { getCookie } from "./utils";
import { COOKIE_NAMES, REQUEST_TIMEOUT } from "./constants";

const request = (url, options) => {
  return axios({
    url,
    ...options,
  });
};

const HandleStatus = (response) => {
  const { status, data } = response;

  if (status === 200) {
    return data;
  } else {
    window.location.href = `${process.env.REACT_APP_URL}/exception?codeMessage=${status}`;
    return;
  }
};
axios.interceptors.request.use((config) => {
  const token = getCookie(COOKIE_NAMES.ACCESS_TOKEN);
  const newConfig = config;
  const { url } = config;
  newConfig.timeout = REQUEST_TIMEOUT;
  newConfig.url = `${url}?key=${process.env.REACT_APP_API_KEY}`;

  if (token) {
    newConfig.headers = { ...config.headers, Authorization: `Bearer ${token}` };
  }
  return newConfig;
});

axios.interceptors.response.use((response) => {
  return HandleStatus(response);
});

export default request;
