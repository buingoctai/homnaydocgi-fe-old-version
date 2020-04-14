import request from "../utils/request";

export const getMainPosts = (param) => {
  return request(`${process.env.REACT_APP_API}/blog/mainPosts`, {
    method: "POST",
    data: { ...param },
  });
};

export const getFeaturedPosts = (param) => {
  return request(`${process.env.REACT_APP_API}/blog/featuredPosts`, {
    method: "POST",
    data: { ...param },
  });
};
