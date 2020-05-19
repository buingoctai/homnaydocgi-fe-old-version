import React from "react";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  container: {
    height: (props) => (props.is_maxWidth_500px ? "10px" : "80px"),
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  obb: {
    width: (props) => (props.is_maxWidth_500px ? "5px" : "15px"),
    height: (props) => (props.is_maxWidth_500px ? "5px" : "15px"),
    backgroundColor: "red",
    position: "relative",
    animation: "$obbAmi 0.5s linear 0s infinite alternate",
    margin: (props) => (props.is_maxWidth_500px ? "0px 2px" : "0px 4px"),
    borderRadius: "50%",
  },
  "@keyframes obbAmi": {
    "0%": { backgroundColor: "red", top: "10px" },
    "50%": { backgroundColor: "blue", top: "5px" },
    "100%": { backgroundColor: "red", top: "0px" },
  },
  even: {
    width: (props) => (props.is_maxWidth_500px ? "5px" : "15px"),
    height: (props) => (props.is_maxWidth_500px ? "5px" : "15px"),
    backgroundColor: "red",
    position: "relative",
    animation: "$evenAmi 0.5s linear 0s infinite alternate",
    margin: (props) => (props.is_maxWidth_500px ? "0px 2px" : "0px 4px"),
    borderRadius: "50%",
  },
  "@keyframes evenAmi": {
    "0%": { backgroundColor: "red", top: "0px" },
    "50%": { backgroundColor: "blue", top: "5px" },
    "100%": { backgroundColor: "red", top: "10px" },
  },
}));

const Loading = (props) => {
  const { responsiveObj } = props;
  const classes = useStyles({ ...responsiveObj });

  return (
    <div className={classes.container}>
      <div className={classes.obb} />
      <div className={classes.even} />
      <div className={classes.obb} />
      <div className={classes.even} />
    </div>
  );
};

export default Loading;
