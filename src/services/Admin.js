import request from "../utils/request";

export const submitPost = (param) => {
  return request(`${process.env.REACT_APP_API}/admin/submitPost`, {
    method: "POST",
    data: { ...param },
  });
};

export const deletePosts = (param) => {
  return request(`${process.env.REACT_APP_API}/admin/deletePosts`, {
    method: "POST",
    data: { ...param },
  });
};

export const updatePosts = (param) => {
  return request(`${process.env.REACT_APP_API}/admin/updatePosts`, {
    method: "POST",
    data: { ...param },
  });
};
