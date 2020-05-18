import request from "../utils/request";

export const getAllArticle = (param) => {
  return request(`${process.env.REACT_APP_API}/readNew/getAllArticle`, {
    method: "POST",
    data: { ...param },
  });
};

export const getAudioArticle = (params) => {
  return request(`${process.env.REACT_APP_API}/readNew/getAudioArticle`, {
    method: "POST",
    data: { ...params },
  });
};

export const createAudioArticle = (params) => {
  return request(`${process.env.REACT_APP_API}/readNew/createAudioArticle`, {
    method: "POST",
    data: { ...params },
  });
};
