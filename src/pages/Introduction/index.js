import React from "react";

import { makeStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";

import BasicLayout from "../../layouts/BasicLayout";
import Profile from "./components/Profile";
import Login from "./components/Login";
import Application from "./components/Application";
import enhance from "./enhance";

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1,
    padding: "50px 20px",
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    height: "100%"
  },
  paper: {
    padding: theme.spacing(2),
    textAlign: "center",
    color: theme.palette.text.secondary,
    height: "100%",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    backgroundColor: "#ace3bb"
  }
}));
const Introduction = props => {
  const classes = useStyles();

  return (
    <BasicLayout>
      <div className={classes.root}>
        <Grid container spacing={3}>
          <Grid item xs={4}>
            <Paper className={classes.paper}>
              <Profile />
            </Paper>
          </Grid>
          <Grid item xs={4}>
            <Paper className={classes.paper}>
              <Application />
            </Paper>
          </Grid>
          <Grid item xs={4}>
            <Paper className={classes.paper}>
              <Login {...props} />
            </Paper>
          </Grid>
        </Grid>
      </div>
    </BasicLayout>
  );
};

export default enhance(Introduction);
