import React from "react";
import { makeStyles } from "@material-ui/core/styles";

import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import InputLabel from "@material-ui/core/InputLabel";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";

const useStyles = makeStyles(theme => ({
  appBar: {
    position: "relative"
  },
  layout: {
    width: "auto",
    marginLeft: theme.spacing(2),
    marginRight: theme.spacing(2),
    [theme.breakpoints.up(600 + theme.spacing(2) * 2)]: {
      width: 600,
      marginLeft: "auto",
      marginRight: "auto"
    }
  },
  paper: {
    marginTop: theme.spacing(3),
    marginBottom: theme.spacing(3),
    padding: theme.spacing(2),
    [theme.breakpoints.up(600 + theme.spacing(3) * 2)]: {
      marginTop: theme.spacing(6),
      marginBottom: theme.spacing(6),
      padding: theme.spacing(3)
    }
  },
  textWrap: {
    width: "100%",
    margin: "10px 0"
  },
  btnWrap: {
    display: "flex",
    marginTop: theme.spacing(3),
    marginLeft: theme.spacing(1),
    justifyContent: "center"
  },
  optionWrap: {
    display: "flex",
    flexDirection: "row"
  },
  wrappedOption: {
    display: "flex",
    flexGrow: "1",
    marginRight: "8px"
  }
}));

const AddingForm = props => {
  const classes = useStyles();
  const { onNavigateListArticle } = props;

  return (
    <Paper className={classes.paper}>
      <Typography component="h1" variant="h4" align="center">
        MẪU THÔNG TIN
      </Typography>
      <React.Fragment>
        <TextField
          className={classes.textWrap}
          label="Tác giả"
          variant="outlined"
          id="mui-theme-provider-outlined-input"
          multiline
          rows="1"
        />
        <TextField
          className={classes.textWrap}
          label="Tiêu đề"
          variant="outlined"
          id="mui-theme-provider-outlined-input"
          multiline
          rows="1"
        />
        <TextField
          className={classes.textWrap}
          label="Nội dung"
          variant="outlined"
          id="mui-theme-provider-outlined-input"
          multiline
          rows="10"
        />
        <FormControl variant="outlined" className={classes.optionWrap}>
          <InputLabel htmlFor="outlined-age-native-simple">Chủ đề</InputLabel>
          <Select
            native
            value="Ten"
            // onChange={handleChange}
            label="Topic"
            inputProps={{
              name: "age",
              id: "outlined-age-native-simple"
            }}
            className={classes.wrappedOption}
          >
            <option aria-label="None" value="" />
            <option value={10}>Front-End</option>
            <option value={20}>Marketing</option>
            <option value={30}>Sales</option>
          </Select>
          <TextField
            id="date"
            label="Thời gian"
            type="date"
            defaultValue="2017-05-24"
            InputLabelProps={{
              shrink: true
            }}
            className={classes.wrappedOption}
          />
        </FormControl>

        <div className={classes.btnWrap}>
          <Button
            variant="contained"
            color="primary"
            style={{ marginRight: "5px" }}
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
