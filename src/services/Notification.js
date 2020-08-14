import request from "../utils/request";

export const fnSaveSubcription = (data) => {
    // ${process.env.REACT_APP_API}/notifi/subscription
    return request(`http://localhost:8080/notifi/subscription`, {
      method: "POST",
      data: { data },
    });
};

export const fnGetAllSubcriptions = () => {
    return request(`http://localhost:8080/notifi/subscription`, {
      method: "GET",
    });
};
