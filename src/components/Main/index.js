import React from "react";
import PropTypes from "prop-types";
import { makeStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import Divider from "@material-ui/core/Divider";
// import Markdown from "./Markdown";

const useStyles = makeStyles({
  title: {
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
  const { title } = props;

  return (
    <Grid item xs={12} md={8} className={classes.title}>
      <Typography variant="h6" gutterBottom>
        {title}
      </Typography>
      <Divider light={true} style={{ height: "5px" }} />
    </Grid>
  );
}

Main.propTypes = {
  posts: PropTypes.array,
  title: PropTypes.string,
};
