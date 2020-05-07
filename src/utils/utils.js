import { TOPIC_TRANSLATE_CONTENT } from "./constants";

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
  if (!param) {
    return;
  }
  const [topicLanguage] = TOPIC_TRANSLATE_CONTENT.filter(
    (item) => item.eng === param
  );
  const { vn } = topicLanguage;
  return vn;
};
