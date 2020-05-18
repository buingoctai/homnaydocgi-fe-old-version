import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import ButtonGroup from '@material-ui/core/ButtonGroup';
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
    '@global': {
      'h3': {
        marginTop: "0px",
        marginBottom: "0px"
      },
      'p': {
        marginTop: "0px",
        marginBottom: "0px"
      }
    },

  },
  buttonGroupWrap: {
    display: "flex",
    marginTop: "36px"
  }
}));
const PostWrap = (props) => {
  const classes = useStyles();
  const { post, mp3 } = props;

  return (
    <div className={classes.container}>
      <div className={classes.imageWrap}>
        <img src={post.imageUrl} alt="Ảnh" style={{ width: "250px", height: "150px" }} />
      </div>
      <div className={classes.contentWrap}>
        <h3>{post.title}</h3>
        <p>{`${post.content.substring(0, 100)}...`}</p>
        {/* <audio controls preload="auto">
          <source
            src="https://static.openfpt.vn/text2speech-v5/short/2020-05-18/banmai.0.bbb407922c0a43a4676eaa403fd5a50e.mp3"
            type="audio/mpeg"

          />
          Your browser does not support the audio element.
        </audio> */}



        <ButtonGroup disableElevation variant="contained" color="primary" className={classes.buttonGroupWrap}>
          <Button>Nghe</Button>
          <Button>Thêm</Button>
        </ButtonGroup>
      </div>
    </div>
  );
};

export default PostWrap;
