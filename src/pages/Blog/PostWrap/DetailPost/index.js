import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";
import ClearIcon from "@material-ui/icons/Clear";
import Button from "@material-ui/core/Button";

const useStyles = makeStyles((theme) => ({
  detailContainer: {
    flexGrow: 1,
    position: "fixed",
    display: "block",
    width: "100%",
    height: "100%",
    backgroundColor: "rgba(0,0,0,0.5)",
    zIndex: "2",
    cursor: "pointer",
    top: "0",
    left: "0",
    right: "0",
    bottom: "0",
  },
  girdWrap: {
    height: "100%",
    padding: theme.spacing(9),
  },
  itemGridWrap: {
    overflow: "hidden",
    position: "relative",
    // width: "100%",
    height: "100%",
  },
  titleWrap: {
    position: "fixed",
    padding: theme.spacing(2),
    top: "20px",
    marginTop: "10px",
    width: "10px",
    display: "flex",
    right: "72px",
    justifyContent: "center",
    height: "5px",
    alignItems: "center",
    backgroundColor: "#7C7C7C",
  },
  paper: {
    padding: theme.spacing(2),
    textAlign: "center",
    color: theme.palette.text.secondary,
    height: "100%",
    position: "absolute",
    overflowY: "scroll",
    top: "0",
    left: "0",
    bottom: "-20px",
    right: "-20px",
  },
  //   headerPaperWrap: {
  //     overflow: "hidden",
  //     backgroundColor: "#333",
  //     position: "fixed",
  //     width: "100%",
  //   },
}));

export default function DetailPost(props) {
  const classes = useStyles();
  const { onHandleOpenDetailContainer, isOpenDetaiContainer, post } = props;
  const newContent = post.Content.split("\n");

  return (
    <div className={classes.detailContainer} id="detailContainer">
      <Grid
        container
        className={classes.girdWrap}
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
