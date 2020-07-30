import { TOPIC_TRANSLATE_CONTENT, URL } from "./constants";

export const setCookie = (cookieName, cookieValue, expiresHour) => {
  const d = new Date();
  d.setTime(d.getTime() + expiresHour * 60 * 60 * 1000);
  const expires = `expires=${d.toUTCString()}`;
  document.cookie = `${cookieName}=${cookieValue};${expires};path=/`;
};

export const getCookie = (cookieName) => {
  const match = document.cookie.match(new RegExp(`(^| )${cookieName}=([^;]+)`));
  if (match) return match[2];
  return "";
};

export const translatePostGroupTitle = (param) => {
  if (!param) return;

  const [topicLanguage] = TOPIC_TRANSLATE_CONTENT.filter(
    (item) => item.eng === param
  );
  if (!topicLanguage) return param;
  const { vn } = topicLanguage;
  return vn;
};

export const translateUrl = (param) => {
  if (!param) return;
  const [url] = URL.filter((item) => item.subMenu === param);
  const { uRL } = url;
  return uRL;
};

export const userDataCRUD = ({ action, data }) => {
  if (!action) return;

  switch (action) {
    case "GET":
      return JSON.parse(localStorage.getItem("userData"));
    case "EDIT":
      const currentData = JSON.parse(localStorage.getItem("userData"));

      if (currentData) {
        const updateData = { ...currentData, ...data };
        localStorage.setItem("userData", JSON.stringify(updateData));
        break;
      }
      localStorage.setItem("userData", JSON.stringify({ ...data }));
      break;
    case "DELETE":
      localStorage.removeItem("userData");
      break;
    default:
      return;
  }
};

export const isBookMarkedPost = (postId) => {
  const { postList = [] } = JSON.parse(localStorage.getItem("userData"));
  if (postList.length === 0) return false;

  return postList.includes(postId);
};
