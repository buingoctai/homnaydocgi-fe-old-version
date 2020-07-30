import React from "react";
import PropTypes from "prop-types";
import { makeStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import RefreshIcon from "@material-ui/icons/Refresh";
import Divider from "@material-ui/core/Divider";
import Button from "@material-ui/core/Button";

// import Markdown from "./Markdown";

const useStyles = makeStyles({
  title: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    "@global": {
      ".MuiTypography-h6": {
        color: "#551A99",
        fontWeight: "bold",
      },
    },
  },
});

export default function Main(props) {
  const classes = useStyles();
  const { title, isSavedPostsStatus } = props;

  return (
    <Grid item xs={12} md={8} className={classes.title}>
      <Typography variant="h6" gutterBottom>
        {title}
      </Typography>

      {isSavedPostsStatus && (
        <Button
          style={{ marginBottom: "7px" }}
          onClick={() =>
            (window.location.href = `${process.env.REACT_APP_URL}/home/topic`)
          }
        >
          <RefreshIcon color="primary" />
        </Button>
      )}

      <Divider light={true} style={{ height: "5px" }} />
    </Grid>
  );
}

Main.propTypes = {
  posts: PropTypes.array,
  title: PropTypes.string,
};
