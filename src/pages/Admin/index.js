import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import CssBaseline from "@material-ui/core/CssBaseline";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";

import AddingForm from "./components/AddingForm";
import DataTable from "./components/DataTable";
import CopyRight from "../../components/CoppyRight";
import enhance from "./enhance";

const useStyles = makeStyles((theme) => ({
  appBar: {
    position: "relative",
  },
  addingFormWrap: {
    width: "auto",
    marginLeft: theme.spacing(2),
    marginRight: theme.spacing(2),
    [theme.breakpoints.up(600 + theme.spacing(2) * 2)]: {
      width: 600,
      marginLeft: "auto",
      marginRight: "auto",
    },
  },
  dataTableWrap: {
    width: "auto",
    marginLeft: theme.spacing(2),
    marginRight: theme.spacing(2),
    [theme.breakpoints.up(600 + theme.spacing(2) * 2)]: {
      width: 800,
      marginLeft: "auto",
      marginRight: "auto",
    },
  },
  linearLoadingNavigatePage: {
    width: "100%",
    marginTop: "250px",
  },
}));
const Admin = (props) => {
  const classes = useStyles();
  const {
    currentUser,
    allPost,
    selected,
    getAllPostDispatch,
    onEditArticle,
    onDeleteArticle,
    setSelected,
  } = props;

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
      <main className={classes.addingFormWrap}>
        <AddingForm {...props} />
        <DataTable
          allPost={allPost}
          selected={selected}
          getAllPostDispatch={getAllPostDispatch}
          onEditArticle={onEditArticle}
          onDeleteArticle={onDeleteArticle}
          setSelected={setSelected}
        />
      </main>
      <CopyRight />
    </React.Fragment>
  );
};

export default enhance(Admin);
