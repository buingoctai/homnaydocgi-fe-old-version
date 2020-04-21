import React from "react";
import useMediaQuery from "@material-ui/core/useMediaQuery";
import { makeStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";
import ClearIcon from "@material-ui/icons/Clear";
import Button from "@material-ui/core/Button";

const useStyles = makeStyles((theme) => ({
  detailContainer: {
    width: "100%",
    height: "100%",
    top: "0",
    left: "0",
    right: "0",
    bottom: "0",
    backgroundColor: "rgba(0,0,0,0.5)",
    flexGrow: 1,
    position: "fixed",
    zIndex: "2",
    cursor: "pointer",
    display: "flex",
    justifyContent: "center",
    animationName: "$detailAmination",
    animationDuration: "1s",
  },
  "@keyframes detailAmination": {
    from: { opacity: 0 },
    to: { opacity: 1 },
  },
  girdWrap: {
    height: "100%",
    padding: theme.spacing(9),
  },
  largeGridWrap: {
    width: "60%",
  },
  smallGridWrap: {
    width: "85%",
  },
  itemGridWrap: {
    height: "100%",
    overflow: "hidden",
    position: "relative",
  },
  titleWrap: {
    width: "10px",
    top: "20px",
    height: "5px",
    padding: theme.spacing(2),
    marginTop: "10px",
    position: "fixed",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#7C7C7C",
  },
  paper: {
    height: "100%",
    top: "0",
    left: "0",
    bottom: "-20px",
    right: "-20px",
    padding: theme.spacing(2),
    color: theme.palette.text.secondary,
    textAlign: "center",
    position: "absolute",
    overflowY: "scroll",
  },
}));

export default function DetailPost(props) {
  const classes = useStyles();
  const { onHandleOpenDetailContainer, isOpenDetaiContainer, post } = props;
  const newContent = post.Content.split("\n");
  const matches = useMediaQuery("(max-width:1600px)");

  return (
    <div className={classes.detailContainer} id="detailContainer">
      <Grid
        container
        className={
          matches
            ? `${classes.girdWrap} ${classes.smallGridWrap}`
            : `${classes.girdWrap} ${classes.largeGridWrap}`
        }
        onBlur={() => console.log("on blur")}
      >
        <Grid item xs={12} className={classes.itemGridWrap}>
          {isOpenDetaiContainer && (
            <Paper className={classes.titleWrap}>
              <Typography variant="body2" style={{ cursor: "pointer" }}>
                <Button onClick={onHandleOpenDetailContainer}>
                  <ClearIcon />
                </Button>
              </Typography>
            </Paper>
          )}

          <Paper className={classes.paper}>
            <Typography variant="h6" color="primary">
              {post.Title}
            </Typography>
            <br />
            <Typography
              variant="p"
              paragraph={true}
              align="justify"
              color="textPrimary"
            >
              {newContent.map((item) => (
                <>
                  {item}
                  <br />
                </>
              ))}
            </Typography>
            <img
              src={post && post.ImageUrl}
              alt={"title"}
              style={{ width: "500px", height: "500px" }}
            />
            <br />
            <br />
            <Typography variant="h6" color="textSecondary" align="left">
              {`Tác giả: ${post.Author}`}
            </Typography>
          </Paper>
        </Grid>
      </Grid>
    </div>
  );
}
