import request from "../utils/request";

export const submitPost = (param) => {
  return request(`${process.env.REACT_APP_API}/admin/submitPost`, {
    method: "POST",
    data: { ...param },
  });
};
