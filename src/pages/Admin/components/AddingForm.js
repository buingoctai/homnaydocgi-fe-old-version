import React from "react";
import { makeStyles } from "@material-ui/core/styles";

import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import InputLabel from "@material-ui/core/InputLabel";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";

const useStyles = makeStyles((theme) => ({
  appBar: {
    position: "relative",
  },
  layout: {
    width: "auto",
    marginLeft: theme.spacing(2),
    marginRight: theme.spacing(2),
    [theme.breakpoints.up(600 + theme.spacing(2) * 2)]: {
      width: 600,
      marginLeft: "auto",
      marginRight: "auto",
    },
  },
  paper: {
    marginTop: theme.spacing(3),
    marginBottom: theme.spacing(3),
    padding: theme.spacing(2),
    [theme.breakpoints.up(600 + theme.spacing(3) * 2)]: {
      marginTop: theme.spacing(6),
      marginBottom: theme.spacing(6),
      padding: theme.spacing(3),
    },
  },
  textWrap: {
    width: "100%",
    margin: "10px 0",
  },
  btnWrap: {
    display: "flex",
    marginTop: theme.spacing(3),
    marginLeft: theme.spacing(1),
    justifyContent: "center",
  },
  optionWrap: {
    display: "flex",
    flexDirection: "row",
  },
  wrappedOption: {
    display: "flex",
    flexGrow: "1",
    marginRight: "8px",
  },
}));

const AddingForm = (props) => {
  const classes = useStyles();
  const {
    onNavigateListArticle,
    onHandleSubmitArticle,
    setArticleData,
    articleData,
  } = props;
  const { author, title, content, topic, submitDate, image } = articleData;
  const errAuthor = author.length > 20 && {
    error: true,
    id: "standard-error-helper-text",
    helperText: "Độ dài tối đa là 20 ký tự",
  };
  const errTile = title.length > 100 && {
    error: true,
    id: "standard-error-helper-text",
    helperText: "Độ dài tối đa là 100 ký tự",
  };
  const errContent = content.length > 5000 && {
    error: true,
    id: "standard-error-helper-text",
    helperText: "Độ dài tối đa là 5000 ký tự",
  };
  const disableAddArticleBtn =
    errAuthor || errTile || errContent || topic || submitDate;

  return (
    <Paper className={classes.paper}>
      <Typography component="h1" variant="h4" align="center">
        MẪU THÔNG TIN
      </Typography>
      <React.Fragment>
        <TextField
          className={classes.textWrap}
          value={author}
          label="Tác giả"
          variant="outlined"
          id="mui-theme-provider-outlined-input"
          multiline
          rows="1"
          {...errAuthor}
          onChange={({ target }) =>
            setArticleData({ ...articleData, author: target.value })
          }
        />
        <TextField
          className={classes.textWrap}
          value={title}
          label="Tiêu đề"
          variant="outlined"
          id="mui-theme-provider-outlined-input"
          multiline
          rows="1"
          {...errTile}
          onChange={({ target }) =>
            setArticleData({
              ...articleData,
              title: target.value.toUpperCase(),
            })
          }
        />
        <TextField
          className={classes.textWrap}
          value={image}
          label="Ảnh"
          variant="outlined"
          id="mui-theme-provider-outlined-input"
          multiline
          rows="1"
          {...errTile}
          onChange={({ target }) =>
            setArticleData({ ...articleData, imageUrl: target.value })
          }
        />
        <TextField
          className={classes.textWrap}
          value={content}
          label="Nội dung"
          variant="outlined"
          id="mui-theme-provider-outlined-input"
          multiline
          rows="10"
          {...errContent}
          onChange={({ target }) =>
            setArticleData({ ...articleData, content: target.value })
          }
        />
        <FormControl variant="outlined" className={classes.optionWrap}>
          <InputLabel htmlFor="outlined-age-native-simple">Chủ đề</InputLabel>
          <Select
            native
            value={topic}
            // onChange={handleChange}
            label="Topic"
            inputProps={{
              name: "age",
              id: "outlined-age-native-simple",
            }}
            className={classes.wrappedOption}
            onChange={({ target }) =>
              setArticleData({ ...articleData, topic: target.value })
            }
          >
            <option aria-label="None" value="" />
            <option value="Front End">Lập Trình Front End</option>
            <option value="Back End">Lập Trình Back End</option>
            <option value="AI/ML/DL Research">Nguyên Cứu AI/ML/DL</option>
            <option value="Philosophy">Triết Học</option>
            <option value="Psychology">Tâm Lý Học</option>
            <option value="Sociology">Xã Hội Học</option>
            <option value="Sales">Bán Hàng</option>
            <option value="Marketing">Marketing</option>
            <option value="LeaderShip">Lãnh Đạo</option>
            <option value="Personal View">Góc Nhìn Cá Nhân</option>
          </Select>
          <TextField
            id="date"
            label="Thời gian"
            type="date"
            defaultValue="2017-05-24"
            InputLabelProps={{
              shrink: true,
            }}
            className={classes.wrappedOption}
            onChange={({ target }) =>
              setArticleData({ ...articleData, submitDate: target.value })
            }
          />
        </FormControl>

        <div className={classes.btnWrap}>
          <Button
            variant="contained"
            color="primary"
            style={{ marginRight: "5px" }}
            // disabled={disableAddArticleBtn}
            onClick={onHandleSubmitArticle}
          >
            THÊM BÀI VIẾT MỚI
          </Button>
          <Button
            variant="contained"
            color="primary"
            onClick={onNavigateListArticle}
          >
            DANH SÁCH BÀI VIẾT
          </Button>
        </div>
      </React.Fragment>
    </Paper>
  );
};

export default AddingForm;
