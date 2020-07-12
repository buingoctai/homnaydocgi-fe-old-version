import axios from "axios";
import { getCookie } from "./utils";
import { COOKIE_NAMES, REQUEST_TIMEOUT, FACEBOOK_DEV } from "./constants";

const request = (url, options) => {
  return axios({
    url,
    ...options,
  });
};

const HandleStatus = (response) => {
  const { status, data } = response;
  if (status === 200 || status === 201 || status === 201) {
    return data;
  } else {
    axios({
      method: "post",
      url: `https://graph.facebook.com/v6.0/me/messages?access_token=${FACEBOOK_DEV.PAGE_ACCESS_TOKEN}`,
      data: {
        recipient: { id: FACEBOOK_DEV.ADMIN_MESSENGER_ID },
        message: { text: `Thông báo lỗi Nodejs Server: ${data}` },
      },
    });
    // .then(() => {
    //   window.location.href = `${process.env.REACT_APP_URL}/exception?codeMessage=${status}`;
    //   return;
    // })
    // .catch(() => {
    //   window.location.href = `${process.env.REACT_APP_URL}/exception?codeMessage=${status}`;
    //   return;
    // });
  }
};
axios.interceptors.request.use((config) => {
  const token = getCookie(COOKIE_NAMES.ACCESS_TOKEN);
  const newConfig = config;
  newConfig.timeout = REQUEST_TIMEOUT;

  if (token) {
    newConfig.headers = { ...config.headers, Authorization: `Bearer ${token}` };
  }
  return newConfig;
});

axios.interceptors.response.use(
  (response) => {
    return HandleStatus(response);
  },
  (error) => {
    const {
      response: { status, data },
    } = error;
    return HandleStatus({ status: status, data: JSON.stringify(data) });
  }
);

export default request;
