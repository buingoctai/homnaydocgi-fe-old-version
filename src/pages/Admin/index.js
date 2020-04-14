import React from "react";
import { connect } from "react-redux";
import { makeStyles } from "@material-ui/core/styles";
import CssBaseline from "@material-ui/core/CssBaseline";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import LinearProgress from "@material-ui/core/LinearProgress";

import AddingForm from "./components/AddingForm";
import DataTable from "./components/DataTable";
import CopyRight from "../../components/CoppyRight";
import enhance from "./enhance";

const useStyles = makeStyles(theme => ({
  appBar: {
    position: "relative"
  },
  addingFormWrap: {
    width: "auto",
    marginLeft: theme.spacing(2),
    marginRight: theme.spacing(2),
    [theme.breakpoints.up(600 + theme.spacing(2) * 2)]: {
      width: 600,
      marginLeft: "auto",
      marginRight: "auto"
    }
  },
  dataTableWrap: {
    width: "auto",
    marginLeft: theme.spacing(2),
    marginRight: theme.spacing(2),
    [theme.breakpoints.up(600 + theme.spacing(2) * 2)]: {
      width: 800,
      marginLeft: "auto",
      marginRight: "auto"
    }
  },
  linearLoadingNavigatePage: {
    width: "100%",
    marginTop: "250px"
  }
}));
const AdminPage = props => {
  const classes = useStyles();
  const { isShowAddingForm, isLoadingTable, currentUser } = props;

  return (
    <React.Fragment>
      <CssBaseline />
      <AppBar position="absolute" color="default" className={classes.appBar}>
        <Toolbar>
          <Typography variant="h6" color="inherit" noWrap>
            {currentUser}
          </Typography>
        </Toolbar>
      </AppBar>
      <main
        className={
          isShowAddingForm ? classes.addingFormWrap : classes.dataTableWrap
        }
      >
        {isShowAddingForm && <AddingForm {...props} />}

        {isLoadingTable && !isShowAddingForm ? (
          <div className={classes.linearLoadingNavigatePage}>
            <LinearProgress color="primary" style={{ height: "3px" }} />
            <span style={{ fontWeight: "bold" }}>
              Đang chuyển sang trang mới
            </span>
          </div>
        ) : null}
        {!isLoadingTable && !isShowAddingForm ? <DataTable {...props} /> : null}
      </main>
      <CopyRight />
    </React.Fragment>
  );
};

const mapStateToProps = state => {
  return {
    currentUser: state.currentUser
  };
};
export default connect(mapStateToProps, null)(enhance(AdminPage));
