import request from "../utils/request";

export const getAllPost = (param) => {
  return request(`${process.env.REACT_APP_API}/blog/getFollowTopic`, {
    method: "POST",
    data: { ...param },
  });
};
