import React from "react";
import { connect } from "react-redux";
import { makeStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";

import BasicLayout from "../../layouts/BasicLayout";
import Profile from "./components/Profile";
import Login from "./components/Login";
import Application from "./components/Application";
import enhance from "./enhance";

import { saveToken } from "../../store/actions";

const useStyles = makeStyles(theme => ({
  introContainer: {
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
      <div className={classes.introContainer}>
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
const mapStateToProps = state => {
  return {
    id_token: state.id_token
  };
};
const mapDispatchToProps = dispatch => {
  return {
    saveTokenDispatch: payload => saveToken(payload)
  };
};
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(enhance(Introduction));
