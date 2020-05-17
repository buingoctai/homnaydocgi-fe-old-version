import request from "../utils/request";

export const getAllArticle = (param) => {
  return request(`${process.env.REACT_APP_API}/readNew/getAllArticle`, {
    method: "POST",
    data: { ...param },
  });
};

export const getMp3 = ({ text }) => {
  console.log("text=", text);
  return request("https://api.fpt.ai/hmi/tts/v5", {
    method: "POST",
    data: text,
  });
};
