import React from "react";
import PropTypes from "prop-types";
import { makeStyles } from "@material-ui/core/styles";
import Link from "@material-ui/core/Link";
import Typography from "@material-ui/core/Typography";

const useStyles = makeStyles(() => ({
  container: {
    flexGrow: 1,
    position: "relative",
    display: "flex",
    flexDirection: "column",
    height: "fix-content",
  },
  image__wrap: {
    // width: (props) => (props.is_maxWidth_500px ? "100%" : "50%"),
    width: "100%",
    position: "relative",
    transition: "transform 0.3s",
    borderRadius: "5px",
    border: "2px solid #fff",
    "&:hover": {
      transform: "scale(1.05)",
    },
  },
  title__wrap: {
    position: "absolute",
    bottom: "8px",
    left: "16px",
    width: "50%",
  },
  title: {
    fontSize: "15px",
    fontWeight: "bold",
  },
}));

export default function MainFeaturedPost(props) {
  const { post, responsiveObj, onHandleOpenDetailContainer } = props;
  const classes = useStyles({ ...responsiveObj });

  return (
    <div className={classes.container}>
      <a onClick={() => onHandleOpenDetailContainer(post.Id)}>
        <span
          style={{ fontSize: "20px", fontWeight: "bold", color: "#551A99" }}
        >
          Nội dung mới nhất
        </span>
        <div className={classes.image__wrap}>
          <img src={post.ImageUrl} width="200px" height="170px" alt="" />
        </div>
        <div className={classes.title__wrap}>
          <Typography
            component="h6"
            variant="h3"
            color="inherit"
            gutterBottom
            className={classes.title}
          >
            {`${post.Title && post.Title}`}
          </Typography>
        </div>
      </a>
    </div>
  );
}

MainFeaturedPost.propTypes = {
  post: PropTypes.object,
};
