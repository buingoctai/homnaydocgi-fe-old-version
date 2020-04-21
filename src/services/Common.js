import request from "../utils/request";

export const sendMsgViaBot = (param) => {
  return request(`${process.env.REACT_APP_API}/webhook/sendMsg`, {
    method: "POST",
    data: { ...param },
  });
};
