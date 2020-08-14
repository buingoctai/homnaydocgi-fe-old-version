import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";
import ClearIcon from "@material-ui/icons/Clear";
import BookmarkBorderIcon from "@material-ui/icons/BookmarkBorder";
import BookmarkIcon from "@material-ui/icons/Bookmark";
import Button from "@material-ui/core/Button";
import LinearProgress from "@material-ui/core/LinearProgress";

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
    width: "50%",
  },
  smallGridWrap: {
    width: (props) => (props.is_maxWidth_500px ? "130%" : "60%"),
    padding: (props) =>
      props.is_maxWidth_500px ? "60px 72px 10px 72px" : "none",
  },
  itemGridWrap: {
    height: "100%",
    overflow: "hidden",
    position: "relative",
    width: (props) => (props.is_maxWidth_500px ? "500px" : "none"),
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
  paperWrap: {
    width: (props) => (props.is_maxWidth_1000px ? "100%" : "none"),
    height: "100%",
    top: "0",
    left: "0",
    bottom: "-20px",
    right: "-20px",
    padding: theme.spacing(2),
    color: theme.palette.text.secondary,
    backgroundColor: "#FFFFED",
    textAlign: "center",
    position: "absolute",
    overflowY: "scroll",
    overflowX: "hidden",
  },
  titleBookMarkWrap: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
}));

export default function DetailPost(props) {
  const {
    post,
    showingPost,
    isOpenDetaiContainer,
    responsiveObj,
    loading,
    isBookMarkedPost,
    onHandleOpenDetailContainer,
    onSaveListPost,
    onUnSaveListPost,
  } = props;
  const newContent = post.Content ? post.Content.split("\n") : [];
  const classes = useStyles({
    ...responsiveObj,
  });

  return (
    <div className={classes.detailContainer} id="detailContainer">
      <Grid
        container
        className={
          responsiveObj.is_minWidth_2000px
            ? `${classes.girdWrap} ${classes.largeGridWrap}`
            : `${classes.girdWrap} ${classes.smallGridWrap}`
        }
        onBlur={() => {}}
      >
        <Grid item xs={12} className={classes.itemGridWrap} key="itemGridWrap">
          {isOpenDetaiContainer && (
            <Paper className={classes.titleWrap}>
              <Typography variant="body2" style={{ cursor: "pointer" }}>
                <Button onClick={onHandleOpenDetailContainer}>
                  <ClearIcon />
                </Button>
              </Typography>
            </Paper>
          )}

          <Paper className={classes.paperWrap} key="itemGridWrap">
            <div className={classes.titleBookMarkWrap}>
              <Typography
                variant="h6"
                color="primary"
                key="title"
                style={{ flexGrow: "1" }}
              >
                {showingPost.Title}
              </Typography>

              {isBookMarkedPost ? (
                <Button onClick={() => onUnSaveListPost(showingPost.Id)}>
                  <BookmarkIcon />
                </Button>
              ) : (
                <Button onClick={() => onSaveListPost(showingPost.Id)}>
                  <BookmarkBorderIcon />
                </Button>
              )}
            </div>
            <br />
            {loading ? (
              <div style={{ display: "flex", justifyContent: "center" }}>
                <LinearProgress
                  color="primary"
                  style={{ height: "3px", width: "10%" }}
                />
              </div>
            ) : (
              <>
                <Typography
                  paragraph={true}
                  align="justify"
                  color="textPrimary"
                  key="subContent"
                >
                  {newContent.length > 0 &&
                    newContent.map((item) => (
                      <>
                        {item}
                        <br />
                      </>
                    ))}
                </Typography>
                <div>
                  <img
                    src={showingPost.ImageUrl}
                    alt="Ảnh"
                    style={
                      responsiveObj.is_maxWidth_500px
                        ? { width: "70%" }
                        : { width: "30%" }
                    }
                  />
                </div>
              </>
            )}
            <br />
            <br />
            <Typography
              variant="h6"
              color="textSecondary"
              align="left"
              key="author"
            >
              {`Nguồn: ${showingPost.Author}`}
            </Typography>
          </Paper>
        </Grid>
      </Grid>
    </div>
  );
}
