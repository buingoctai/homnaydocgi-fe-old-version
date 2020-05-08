import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Alert, AlertTitle } from "@material-ui/lab";

const useStyles = makeStyles((theme) => ({
  errorContainer: {
    width: "100%",
    "& > * + *": {
      marginTop: theme.spacing(2),
    },
    height: window.innerHeight,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
}));

const codeContent = {
  200: "Success.",
  201: "Success.",
  202: "Success.",
  204: "Delete Sucess.",
  400: "Request Error.",
  401: "UnAuthorized。",
  403: "Access Forbidden",
  404: "Not Found.",
  406: "Format unavaiable.",
  410: "Resource not exist.",
  422: "Validation error.",
  500: "Server error.",
  502: "Gateway error.",
  503: "Service unavaiable.",
  504: "Timeout.",
};

const Exception = (props) => {
  const {
    location: { search },
  } = props;
  const codeMessage = search.split("=");
  const classes = useStyles();

  return (
    <div className={classes.errorContainer}>
      <Alert severity="error">
        <AlertTitle>{`${codeMessage[1]} ${
          codeContent[codeMessage[1]]
          }`}</AlertTitle>
        Lỗi server —{" "}
        <strong>Hệ thống đã tự động liên hệ Bùi Ngọc Tài admin</strong>
      </Alert>
    </div>
  );
};

export default Exception;
