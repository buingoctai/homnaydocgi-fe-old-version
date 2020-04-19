import React from "react";
import PropTypes from "prop-types";
import { makeStyles } from "@material-ui/core/styles";
import Link from "@material-ui/core/Link";
import Typography from "@material-ui/core/Typography";

const useStyles = makeStyles((theme) => ({
  mainPostContainer: {
    flexFlow: 1,
    position: "relative",
    display: "flex",
    flexDirection: "column",
  },
  contenWrap: {
    position: "absolute",
    bottom: "8px",
    left: "16px",
    width: "50%",
  },
}));

export default function MainFeaturedPost(props) {
  const classes = useStyles();
  const { onHandleOpenDetailContainer, post } = props;

  return (
    <div className={classes.mainPostContainer}>
      <span style={{ fontSize: "20px", fontWeight: "bold" }}>Tin mới nhất</span>
      <img src={post.ImageUrl} width="300px" alt="" />
      <div className={classes.contenWrap}>
        <Typography
          component="h6"
          variant="h3"
          color="inherit"
          gutterBottom
          style={{ fontSize: "20px", color: "azure" }}
        >
          <Link
            underline="none"
            onClick={() => onHandleOpenDetailContainer(post.Id)}
            style={{ color: "azure" }}
          >
            {" "}
            {post.Title && post.Title}
          </Link>
        </Typography>
      </div>
    </div>
  );
}

MainFeaturedPost.propTypes = {
  post: PropTypes.object,
};
