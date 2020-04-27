import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";

import Profile from "./components/Profile";
import Login from "./components/Login";
import Application from "./components/Application";
import enhance from "./enhance";

const useStyles = makeStyles((theme) => ({
  introContainer: {
    height: "100%",
    padding: "50px 20px",
    backgroundColor: "#F1F1F1",

    display: "flex",
    flexDirection: "row",
    flexGrow: 1,
    alignItems: "center",
  },
  paper: {
    height: "100%",
    padding: theme.spacing(2),
    color: theme.palette.text.secondary,
    backgroundColor: "#C0C0C0",
    borderRadius: "10px",
    textAlign: "center",

    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
}));
const Introduction = (props) => {
  const classes = useStyles();
  return (
    <React.Fragment>
      <div className={classes.introContainer}>
        <Grid container spacing={3}>
          <Grid item xs={12} xl={4} md={4} sm={4}>
            <Paper className={classes.paper}>
              <Profile />
            </Paper>
          </Grid>
          <Grid item xs={12} xl={4} md={4} sm={4}>
            <Paper className={classes.paper}>
              <Login {...props} />
            </Paper>
          </Grid>
          <Grid item xs={12} xl={4} md={4} sm={4}>
            <Paper className={classes.paper}>
              <Application />
            </Paper>
          </Grid>
        </Grid>
      </div>
    </React.Fragment>
  );
};

export default enhance(Introduction);
