import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import FormHelperText from "@material-ui/core/FormHelperText";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import Button from "@material-ui/core/Button";
import PostWrap from "../../../../components/PostWrap";
import Paging from "../../../../components/Pagination";

const useStyles = makeStyles((theme) => ({
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
    onClickListenArticle,
    onChangePageIndex,
  } = props;

  return (
    <div>
      {/* <FormControl className={classes.formControl}>
        <InputLabel id="demo-simple-select-label">Đầu Báo</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={10}
          onChange={null}
        >
          <MenuItem value={10}>Tuổi Trẻ</MenuItem>
          <MenuItem value={20}>Thanh Niên</MenuItem>
          <MenuItem value={30}>Cafebiz</MenuItem>
        </Select>
      </FormControl>
      <FormControl className={classes.formControl}>
        <InputLabel id="demo-simple-select-label">Chủ Đề</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={10}
          onChange={null}
        >
          <MenuItem value={10}>Thế Giới</MenuItem>
          <MenuItem value={20}>Kinh Tế</MenuItem>
          <MenuItem value={30}>Công Nghệ</MenuItem>
        </Select>
      </FormControl>
      <Button variant="contained">Chọn</Button> */}
      {data.length > 0 &&
        data.map((item) => (
          <PostWrap
            post={item}
            onClickListenArticle={onClickListenArticle}
            currentAudioArticle={currentAudioArticle}
          />
        ))}
      <Paging
        currentPageIndex={currentPageIndex}
        totalRecord={totalRecord}
        onChangePageIndex={onChangePageIndex}
      />
    </div>
  );
};

export default ReadNews;
