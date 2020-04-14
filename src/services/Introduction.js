import request from "../utils/request";

export const submitUserData = (param) => {
  return request(`${process.env.REACT_APP_API}/user/submitData`, {
    method: "POST",
    data: { ...param },
  });
};
