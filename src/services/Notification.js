import request from "../utils/request";

export const subscribePage = (params) => {
  return request(`${process.env.REACT_APP_API}/notification/saveSubscription`, {
    method: "POST",
    data: params,
  });
};

export const unSubscribePage = (params) => {
  return request(
    `${process.env.REACT_APP_API}/notification/deleteSubscription`,
    {
      method: "POST",
      data: params,
    }
  );
};

export const sendNotification = (params) => {
  return request(
    `${process.env.REACT_APP_API}/notification/sendNotificationToAll`,
    {
      method: "POST",
      data: params,
    }
  );
};
