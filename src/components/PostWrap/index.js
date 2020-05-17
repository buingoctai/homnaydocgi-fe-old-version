import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { findByLabelText } from "@testing-library/react";

const useStyles = makeStyles((theme) => ({
  container: {
    display: "flex",
    flexDirection: "row",
    margin: "15px 0px",
  },
  imageWrap: {
    display: "flex",
    flexBasis: "30%",
  },
  contentWrap: {
    display: "flex",
    flexBasis: "70%",
    flexDirection: "column",
    backgroundColor: "#f1f3f4",
    marginLeft: "20px",
  },
}));
const PostWrap = (props) => {
  const classes = useStyles();
  const { post, mp3 } = props;

  return (
    <div className={classes.container}>
      <div className={classes.imageWrap}>
        <img src={post.imageUrl} alt="Ảnh" style={{ width: "300px" }} />
      </div>
      <div className={classes.contentWrap}>
        <h3>{post.title}</h3>
        <p>{`${post.content.substring(1, 200)}...`}</p>
        <audio controls>
          <source
            src="https://static.openfpt.vn/text2speech-v5/short/2020-05-16/leminh.0.145e5fb39450a06881e34aad8cef49be.mp3"
            type="audio/mpeg"
          />
          Your browser does not support the audio element.
        </audio>
      </div>
    </div>
  );
};

export default PostWrap;
