export const setCookie = (cookieName, cookieValue, expiresHour) => {
  console.log(
    "cookieName, cookieValue, expiresHour",
    cookieName,
    cookieValue,
    expiresHour
  );
  const d = new Date();
  d.setTime(d.getTime() + expiresHour * 60 * 60 * 1000);
  const expires = `expires=${d.toUTCString()}`;
  document.cookie = `${cookieName}=${cookieValue};${expires};path=/`;
};

export const getCookie = cookieName => {
  const match = document.cookie.match(new RegExp(`(^| )${cookieName}=([^;]+)`));
  if (match) return match[2];
  return "";
};
