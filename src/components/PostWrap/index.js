import React, { useState, useEffect } from "react";
import AudioPlayer from "react-h5-audio-player";
import "react-h5-audio-player/lib/styles.css";
import { makeStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import PlayCircleFilledIcon from '@material-ui/icons/PlayCircleFilled';
import AddCircleIcon from '@material-ui/icons/AddCircle';
import ButtonGroup from "@material-ui/core/ButtonGroup";
import Loading from "../Loading";

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
  fullContentWrap: {
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
  title: {
    fontSize: (props) => (props.is_maxWidth_500px ? "10px" : "none"),
  },
  content: {
    fontSize: (props) => (props.is_maxWidth_500px ? "10px" : "none"),
  },
  buttonGroupWrap: {
    display: "flex",
    justifyContent: "flex-end",
    marginTop: (props) => (props.stayListenStatus ? "36px" : "10px"),
  },
  button: {
    fontSize: (props) => (props.is_maxWidth_500px ? "10px" : "none"),
    padding: (props) => (props.is_maxWidth_500px ? "2px 2px" : "none"),
    height: (props) => (props.is_maxWidth_500px ? "20px" : "none"),
  },
  audioPlayerWrap: {
    paddingBottom: "0px",
    paddingTop: "0px",
    boxShadow: "none",
    backgroundColor: "#F1F3F4",
    "@global": {
      ".rhap_time": {
        fontSize: (props) => (props.is_maxWidth_500px ? "10px" : "none"),
      },
      ".rhap_repeat-button": {
        fontSize: (props) => (props.is_maxWidth_500px ? "10px" : "none"),
      },
      ".rhap_main-controls-button": {
        fontSize: (props) => (props.is_maxWidth_500px ? "15px" : "none"),
      },
      ".rhap_progress-indicator": {
        width: (props) => (props.is_maxWidth_500px ? "5px" : "none"),
        height: (props) => (props.is_maxWidth_500px ? "5px" : "none"),
      },
      ".rhap_volume-button": {
        display: (props) => (props.is_maxWidth_500px ? "none" : "flex"),
      },
      ".rhap_volume-indicator": {
        display: (props) => (props.is_maxWidth_500px ? "none" : "flex"),
      },
      ".rhap_progress-section": {
        width: (props) => (props.is_maxWidth_500px ? "150px" : "none"),
      },
      ".rhap_controls-section": {
        width: (props) => (props.is_maxWidth_500px ? "150px" : "none"),
        height: (props) => (props.is_maxWidth_500px ? "20px" : "none"),
        marginTop: (props) => (props.is_maxWidth_500px ? "0px" : "none"),
      },
    },
    padding: (props) => (props.is_maxWidth_500px ? "0px 0px" : "none"),
  },
}));
const PostWrap = (props) => {
  const {
    post,
    responsiveObj,
    currentAudioArticle,
    onClickListenArticle,
  } = props;
  const { is_maxWidth_500px } = responsiveObj;
  const { id, audio } = currentAudioArticle;

  const [isLoading, setIsLoading] = useState(false);
  const [stayListenStatus, setStayListenStatus] = useState(false);
  const [currentAudio, setCurrentAudio] = useState("");
  const [audioIndex, setAudioIndex] = useState(0);

  const nextAudioHandle = () => {
    setAudioIndex(audioIndex + 1);
    if (audio[audioIndex + 1]) {
      setCurrentAudio(audio[audioIndex + 1]);
    } else {
      setCurrentAudio("");
      setStayListenStatus(false);
    }
  };

  const pressListenHandle = () => {
    setStayListenStatus(!stayListenStatus);
    setIsLoading(true);
    onClickListenArticle({
      id: post.id,
      content: post.content,
      setCurrentAudio: setCurrentAudio,
      setIsLoading: setIsLoading,
    });
    setAudioIndex(0);
  };
  useEffect(() => {
    if (audio) {
      setCurrentAudio(audio[audioIndex]);
    }
  }, [audio]);

  const classes = useStyles({
    stayListenStatus: stayListenStatus,
    ...responsiveObj,
  });
  const viewedBtnGroup = !stayListenStatus && !isLoading;
  const viewedAudioPlayer = id && stayListenStatus && !isLoading;

  return (
    <div className={classes.container}>
      <div className={classes.imageWrap}>
        <img
          src={post.imageUrl}
          alt="Ảnh"
          style={
            is_maxWidth_500px
              ? { width: "120px", height: "110px" }
              : { width: "250px", height: "160px" }
          }
        />
      </div>
      <div className={classes.fullContentWrap}>
        <h3 className={classes.title}>{post.title}</h3>
        <p className={classes.content}>
          {stayListenStatus || is_maxWidth_500px
            ? `${post.content.substring(0, 100)}...`
            : `${post.content.substring(0, 250)}...`}
        </p>

        {viewedAudioPlayer && (
          <AudioPlayer
            autoPlay
            src={currentAudio}
            onEnded={() => nextAudioHandle()}
            className={classes.audioPlayerWrap}
          />
        )}
        {viewedBtnGroup && (
          <ButtonGroup
            disableElevation
            color="primary"
            variant="text"
            className={classes.buttonGroupWrap}
          >
            <Button
              onClick={() => pressListenHandle()}
              className={classes.button}
            >
              <PlayCircleFilledIcon />
            </Button>
            <Button className={classes.button}><AddCircleIcon /></Button>
          </ButtonGroup>
        )}
        {isLoading && <Loading responsiveObj={responsiveObj} />}
      </div>
    </div>
  );
};

export default PostWrap;
