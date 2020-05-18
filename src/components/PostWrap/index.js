import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import ButtonGroup from "@material-ui/core/ButtonGroup";
import AudioPlayer from "react-h5-audio-player";
import "react-h5-audio-player/lib/styles.css";

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
    "@global": {
      h3: {
        marginTop: "0px",
        marginBottom: "0px",
      },
      p: {
        marginTop: "0px",
        marginBottom: "0px",
      },
    },
  },
  buttonGroupWrap: {
    display: "flex",
    justifyContent: "flex-end",
    marginTop: "36px",
  },
}));
const PostWrap = (props) => {
  const classes = useStyles();
  const { post, currentAudioArticle, onClickListenArticle } = props;
  const [switchAudio, setSwitchAudio] = useState(false);

  return (
    <div className={classes.container}>
      <div className={classes.imageWrap}>
        <img
          src={post.imageUrl}
          alt="Ảnh"
          style={{ width: "250px", height: "160px" }}
        />
      </div>
      <div className={classes.contentWrap}>
        <h3>{post.title}</h3>
        <p>{`${post.content.substring(0, 100)}...`}</p>

        {currentAudioArticle.id === post.id ? (
          <AudioPlayer
            autoPlay
            src={
              switchAudio
                ? currentAudioArticle.audio[1]
                : currentAudioArticle.audio[0]
            }
            onEnded={() => setSwitchAudio(true)}
            style={{
              paddingBottom: "0px",
              boxShadow: "none",
              backgroundColor: "#F1F3F4",
            }}
          />
        ) : (
          <ButtonGroup
            disableElevation
            color="primary"
            variant="text"
            className={classes.buttonGroupWrap}
          >
            <Button
              onClick={() =>
                onClickListenArticle({
                  id: post.id,
                  content: post.content,
                })
              }
            >
              Nghe
            </Button>
            <Button>Thêm</Button>
          </ButtonGroup>
        )}
      </div>
    </div>
  );
};

export default PostWrap;
