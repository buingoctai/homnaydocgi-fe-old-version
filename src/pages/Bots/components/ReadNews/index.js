import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import FormHelperText from "@material-ui/core/FormHelperText";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import Button from "@material-ui/core/Button";
import LinearProgress from "@material-ui/core/LinearProgress";
import PostWrap from "../../../../components/PostWrap";
import Paging from "../../../../components/Pagination";

const useStyles = makeStyles((theme) => ({
  totalContentLoadingWrap: {
    height: "100%",
    width: "100%",
    marginTop: "200px",
    marginBottom: "200px",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
  },
  loadingMessage: {
    display: "flex",
    justifyContent: "center",
    fontSize: "20px",
    fontWeight: "bold",
  },
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120,
  },
  selectEmpty: {
    marginTop: theme.spacing(2),
  },
}));

const ReadNews = (props) => {
  const classes = useStyles();
  const {
    allArticle: { data, totalRecord },
    currentAudioArticle,
    currentPageIndex,
    responsiveObj,
    onClickListenArticle,
    onChangePageIndex,
  } = props;

  return (
    <div>
      {totalRecord === 0 ? (
        <div className={classes.totalContentLoadingWrap}>
          <span className={classes.loadingMessage}>Đang tải bài viết</span>
          <LinearProgress
            color="primary"
            style={{ height: "3px", width: "20%" }}
          />
        </div>
      ) : (
        <>
          {data.map((item) => (
            <PostWrap
              post={item}
              responsiveObj={responsiveObj}
              onClickListenArticle={onClickListenArticle}
              currentAudioArticle={currentAudioArticle}
            />
          ))}
          <Paging
            currentPageIndex={currentPageIndex}
            totalRecord={totalRecord}
            onChangePageIndex={onChangePageIndex}
          />
        </>
      )}
    </div>
  );
};

export default ReadNews;
