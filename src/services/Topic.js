import request from "../utils/request";

export const getAllPost = (param) => {
  return request(`${process.env.REACT_APP_API}/blog/getFollowTopic`, {
    method: "POST",
    data: { ...param },
  });
};

export const searchArticles = (param) => {
  return request(`${process.env.REACT_APP_API}/blog/searchArticles`, {
    method: "POST",
    data: { ...param },
  });
};

export const getSavedPosts = (param) => {
  return request(`${process.env.REACT_APP_API}/blog/getSavedPosts`, {
    method: "POST",
    data: { ...param },
  });
};
