import { TOPIC_TRANSLATE_CONTENT, URL, NUMBER_COLUMN_SCREEN_SIZE } from "./constants";

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

// screen size - column number
/*
mobile  -  1
medium  -  6
*/
const determinateNumberColumn = (len, numberCol) => {
  if (numberCol == 1) return { numberCol, numberColData: len, redundancy: 0 };
  const numberColData = Math.floor(len / numberCol);
  const redundancy = len % numberCol;
  if (numberColData > 0) return { numberCol, numberColData, redundancy };
  determinateNumberColumn(len, numberCol - 1);
}
export default determinateNumberColumn;

export const determinateColumnData = ({ screenSize = 'medium', posts = [] }) => {
  if (posts.length === 0) return { columnDataList: [], screenSize };
  if (posts.length < 6) return { columnDataList: [posts], screenSize };
  let columnDataList = [];

  switch (screenSize) {
    case 'mobile':
      return { columnDataList: [posts], screenSize };
    case 'medium':
      const numberPosts = posts.length;
      const { numberCol, numberColData, redundancy } = determinateNumberColumn(numberPosts, NUMBER_COLUMN_SCREEN_SIZE['medium']);

      for (let i = 0; i < numberCol; i++) {
        let columnData = [];
        let step = i;

        for (let j = 0; j < numberColData; j++) {
          columnData.push(posts[step]);
          step += NUMBER_COLUMN_SCREEN_SIZE['medium']; // Thêm case cho trường hợp numberCol<6
        }
        columnDataList.push(columnData);
      }
      for (let k = 0; k < redundancy; k++) {
        columnDataList[k].push(posts[numberPosts - redundancy + k]);
      }

      return { columnDataList, screenSize };
  }

}
