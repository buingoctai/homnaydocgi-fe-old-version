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
  imageWrap: {
    width: (props) => (props.is_maxWidth_500px ? "100%" : "50%"),
    position: "relative",
    transition: "transform 0.3s",
    "&:hover": {
      transform: "scale(1.05)",
    },
  },
  titleWrap: {
    position: "absolute",
    bottom: "8px",
    left: "16px",
    width: "50%",
  },
  title: {
    fontSize: "20px",
    color: "#ffff",
  },
}));

export default function MainFeaturedPost(props) {
  const { post, responsiveObj, onHandleOpenDetailContainer } = props;
  const classes = useStyles({ ...responsiveObj });

  return (
    <div className={classes.mainPostContainer}>
      <span style={{ fontSize: "20px", fontWeight: "bold" }}>Tin mới nhất</span>
      <div className={classes.imageWrap}>
        <img src={post.ImageUrl} width="100%" alt="" />
      </div>
      <div className={classes.titleWrap}>
        <Typography
          component="h6"
          variant="h3"
          color="inherit"
          gutterBottom
          className={classes.title}
        >
          <Link
            underline="none"
            onClick={() => onHandleOpenDetailContainer(post.Id)}
            style={{ color: "#ffff" }}
          >
            {" "}
            {`${post.Title && post.Title}`}
          </Link>
        </Typography>
      </div>
    </div>
  );
}

MainFeaturedPost.propTypes = {
  post: PropTypes.object,
};
