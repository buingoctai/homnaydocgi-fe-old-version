import React, { useState, useEffect } from "react";
import AudioPlayer from "react-h5-audio-player";
import "react-h5-audio-player/lib/styles.css";
import { makeStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import ButtonGroup from "@material-ui/core/ButtonGroup";

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
    marginTop: props => props.stayListenStatus ? "36px" : "0px",
  },
  audioPlayerWrap: {
    paddingBottom: "0px",
    paddingTop: "0px",
    boxShadow: "none",
    backgroundColor: "#F1F3F4",
  }
}));
const PostWrap = (props) => {

  const { post, currentAudioArticle, onClickListenArticle } = props;
  const { id, audio } = currentAudioArticle;

  const [stayListenStatus, setStayListenStatus] = useState(false);
  const [currentAudio, setCurrentAudio] = useState('');
  const [audioIndex, setAudioIndex] = useState(0);

  const nextAudioHandle = () => {
    setAudioIndex(audioIndex + 1);
    if (audio[audioIndex + 1]) {
      setCurrentAudio(audio[audioIndex + 1]);
    } else {
      setCurrentAudio('');
      setStayListenStatus(false);
    }
  }

  const pressListenHandle = () => {
    setStayListenStatus(!stayListenStatus);
    onClickListenArticle({
      id: post.id,
      content: post.content,
      setCurrentAudio: setCurrentAudio
    });
    setAudioIndex(0);
  }
  useEffect(() => {
    if (audio) {
      setCurrentAudio(audio[audioIndex]);

    }
  }, [audio]);

  const classes = useStyles({ stayListenStatus: stayListenStatus });


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
        <p>{stayListenStatus ? `${post.content.substring(0, 100)}...` : `${post.content.substring(0, 250)}...`}</p>

        {id === post.id && stayListenStatus ? (

          <AudioPlayer
            autoPlay
            src={
              currentAudio
            }
            onEnded={() => nextAudioHandle()}
            className={classes.audioPlayerWrap}
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
                  pressListenHandle()
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
