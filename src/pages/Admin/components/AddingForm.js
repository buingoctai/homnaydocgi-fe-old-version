import React from "react";
import { Link } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";
import moment from "moment";

import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import InputLabel from "@material-ui/core/InputLabel";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import KeyboardReturnIcon from "@material-ui/icons/KeyboardReturn";

import { translatePostGroupTitle } from "../../../utils/utils";

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
  const { onHandleSubmitArticle, setArticleData, articleData } = props;
  const { author, title, content, topic, submitDate, imageUrl } = articleData;
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
  const errContent = content &&
    content.length > 5000 && {
      error: true,
      id: "standard-error-helper-text",
      helperText: "Độ dài tối đa là 5000 ký tự",
    };

  return (
    <Paper className={classes.paper}>
      <Link to={{ pathname: "/home" }} style={{ textDecoration: "none" }}>
        <KeyboardReturnIcon color="primary" />
      </Link>
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
          value={imageUrl}
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
            <option value="Front End">
              {translatePostGroupTitle("Front End")}
            </option>
            <option value="Back End">
              {translatePostGroupTitle("Back End")}
            </option>
            <option value="AI/ML/DL Research">
              {translatePostGroupTitle("AI/ML/DL Research")}
            </option>
            <option value="Philosophy">
              {translatePostGroupTitle("Philosophy")}
            </option>
            <option value="Psychology">
              {translatePostGroupTitle("Psychology")}
            </option>
            <option value="Sociology">
              {translatePostGroupTitle("Sociology")}
            </option>
            <option value="Sales">{translatePostGroupTitle("Sales")}</option>
            <option value="Marketing">
              {translatePostGroupTitle("Marketing")}
            </option>
            <option value="LeaderShip">
              {translatePostGroupTitle("LeaderShip")}
            </option>
            <option value="Administration">
              {translatePostGroupTitle("Administration")}
            </option>
            <option value="Personal View">
              {translatePostGroupTitle("Personal View")}
            </option>
          </Select>
          <TextField
            id="date"
            label="Thời gian"
            type="date"
            defaultValue={moment().format("YYYY-MM-DD")}
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
            // disabled={
            //   !author ||
            //   !title ||
            //   !content ||
            //   !topic ||
            //   !imageUrl ||
            //   !submitDate
            // }
            onClick={onHandleSubmitArticle}
          >
            THÊM/SỬA
          </Button>
        </div>
      </React.Fragment>
    </Paper>
  );
};

export default AddingForm;
