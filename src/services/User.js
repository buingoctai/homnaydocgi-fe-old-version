import request from "../utils/request";

export const authencationUser = (params) => {
  return request(`${process.env.REACT_APP_API}/user/authencation`, {
    method: "POST",
    data: { ...params },
  });
};

export const getProfile = (params) => {
  return request(`${process.env.REACT_APP_API}/user/getProfile`, {
    method: "POST",
    data: { ...params },
  });
};
