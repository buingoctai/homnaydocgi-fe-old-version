import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";

import {
  makeStyles,
  ThemeProvider,
  createMuiTheme
} from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import AssignmentIndIcon from "@material-ui/icons/AssignmentInd";
import TextField from "@material-ui/core/TextField";
import { green } from "@material-ui/core/colors";
import LinearProgress from "@material-ui/core/LinearProgress";
import Typography from "@material-ui/core/Typography";
import ArrowDownwardIcon from "@material-ui/icons/ArrowDownward";
import FormLabel from "@material-ui/core/FormLabel";
import FormControl from "@material-ui/core/FormControl";
import FormGroup from "@material-ui/core/FormGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";

import DraggableDialog from "../../../components/Dialog";
import { contentIntro } from "../../../utils/constants";

const useStyles = makeStyles(theme => ({
  loginFormContainer: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    width: "100%",
    "& > * + *": {
      marginTop: theme.spacing(2)
    }
  },
  iconContainer: {
    width: "50px",
    height: "50px",
    color: "#00ffbf"
  },
  title: {
    fontSize: "20px",
    fontWeight: "bold",
    color: "#5fcfaf"
  },
  fieldInputContainer: {
    margin: theme.spacing(1),
    width: "100%"
  },
  buttonContainer: {
    width: "100%",
    color: "#15edaf",
    backgroundColor: "#5fcfaf"
  },

  linearLoadingHandleInput: {
    width: "100%",
    "& > * + *": {
      marginTop: theme.spacing(2)
    }
  },
  linearLoadingNavigatePage: {
    width: "100%",
    marginTop: "250px"
  },
  contentHeaderWrap: {
    borderBottom: "2px",
    fontStyle: "italic",
    fontWeight: "bold",
    color: "#5fcfaf"
  },
  formControl: {
    margin: theme.spacing(3),
    display: "flex",
    justifyContent: "flex-start",
    width: "100%"
  },
  formLabel: {
    width: "100%",
    display: "flex",
    flexDirection: "row"
  }
}));
const theme = createMuiTheme({
  palette: {
    primary: green
  }
});
const Login = props => {
  const classes = useStyles();
  const [userData, setUserData] = useState({
    userName: "",
    fbUrl: "",
    techKnowledge: "",
    addKnowledge: ""
  });
  const history = useHistory();
  const {
    onPressLoginButton,
    onChangeTechLabels,
    onChangeAddLabels,
    isLoadingBtn,
    isSuccessLogin,
    techLabels,
    addLabels,
    isChooseTechOptions,
    isChooseAddOptions,
    techLabelsChoosing,
    addLabelsChoosing,
    isKeepCurrentPage
  } = props;

  // Handle disable btn
  const isDisabledTechField = isChooseTechOptions
    ? userData.techKnowledge === "" || techLabels.length === 0
    : userData.techKnowledge === "" && techLabels.length === 0;
  const isDisabledAddField = isChooseAddOptions
    ? userData.addKnowledge === "" || addLabels.length === 0
    : userData.addKnowledge === "" && addLabels.length === 0;
  // Validation
  const errUsernameProps = userData.userName.length > 5 && {
    error: true,
    id: "standard-error-helper-text",
    helperText: "Độ dài tối đa là 5 ký tự"
  };
  const errFbUrlProps = userData.fbUrl.indexOf("facebook.com/") === -1 && {
    error: true,
    id: "standard-error-helper-text",
    helperText: "Phải chứa domain facebook.com"
  };
  const isDisabledBtn =
    userData.userName === "" ||
    userData.fbUrl === "" ||
    isDisabledTechField ||
    isDisabledAddField ||
    errUsernameProps ||
    errFbUrlProps ||
    isLoadingBtn;

  useEffect(() => {
    if (isSuccessLogin) {
      history.push("/home", { currentUser: userData.userName });
    }
  });

  return (
    <div className={classes.loginFormContainer}>
      {isKeepCurrentPage && (
        <>
          <AssignmentIndIcon className={classes.iconContainer} />
          <span className={classes.title}>Đăng Nhập</span>
          <ThemeProvider theme={theme}>
            <TextField
              className={classes.fieldInputContainer}
              label="Tên hiển thị"
              variant="outlined"
              id="mui-theme-provider-outlined-input"
              value={userData.userName}
              onChange={({ target }) =>
                setUserData({ ...userData, userName: target.value })
              }
              {...errUsernameProps}
            />
          </ThemeProvider>
          <ThemeProvider theme={theme}>
            <TextField
              className={classes.fieldInputContainer}
              label="Facebook URL"
              placeholder=""
              variant="outlined"
              id="mui-theme-provider-outlined-input"
              value={userData.fbUrl}
              onChange={({ target }) =>
                setUserData({ ...userData, fbUrl: target.value })
              }
              {...errFbUrlProps}
            />
          </ThemeProvider>
          <ThemeProvider theme={theme}>
            {isChooseTechOptions && (
              <FormControl component="fieldset" className={classes.formControl}>
                <FormLabel component="legend" className={classes.formLabel}>
                  Vui lòng chọn nhóm chuyên môn
                </FormLabel>
                <FormGroup>
                  {techLabelsChoosing.map(labelName => (
                    <FormControlLabel
                      control={
                        <Checkbox
                          checked={techLabels.includes(labelName)}
                          name={labelName}
                          onChange={node =>
                            onChangeTechLabels({
                              name: node.target.name,
                              checked: node.target.checked
                            })
                          }
                        />
                      }
                      label={labelName}
                    />
                  ))}
                </FormGroup>
              </FormControl>
            )}
            {!isChooseTechOptions && (
              <TextField
                className={classes.fieldInputContainer}
                label="Chuyên môn"
                variant="outlined"
                id="mui-theme-provider-outlined-input"
                // value={userData.techKnowledge}
                value={
                  techLabels.length > 0
                    ? techLabels.toString()
                    : userData.techKnowledge
                }
                onChange={({ target }) =>
                  setUserData({ ...userData, techKnowledge: target.value })
                }
                multiline
                rows="3"
              />
            )}
          </ThemeProvider>
          <ThemeProvider theme={theme}>
            {isChooseAddOptions && (
              <FormControl component="fieldset" className={classes.formControl}>
                <FormLabel component="legend" className={classes.formLabel}>
                  Vui lòng chọn nhóm ngoài chuyên môn
                </FormLabel>
                <FormGroup>
                  {addLabelsChoosing.map(labelName => (
                    <FormControlLabel
                      control={
                        <Checkbox
                          checked={addLabels.includes(labelName)}
                          name={labelName}
                          onChange={node =>
                            onChangeAddLabels({
                              name: node.target.name,
                              checked: node.target.checked
                            })
                          }
                        />
                      }
                      label={labelName}
                    />
                  ))}
                </FormGroup>
              </FormControl>
            )}
            {!isChooseAddOptions && (
              <TextField
                className={classes.fieldInputContainer}
                label="Ngoài chuyên môn"
                variant="outlined"
                id="mui-theme-provider-outlined-input"
                // value={userData.addKnowledge}
                value={
                  addLabels.length > 0
                    ? addLabels.toString()
                    : userData.addKnowledge
                }
                onChange={({ target }) =>
                  setUserData({ ...userData, addKnowledge: target.value })
                }
                multiline
                rows="3"
              />
            )}
          </ThemeProvider>
          <Button
            variant="contained"
            className={classes.buttonContainer}
            disabled={isDisabledBtn}
            onClick={() => onPressLoginButton(userData)}
          >
            <span style={{ fontWeight: "bold" }}>BẮT ĐẦU</span>
          </Button>
          {isLoadingBtn && (
            <div className={classes.linearLoadingHandleInput}>
              <LinearProgress color="primary" />
              <span style={{ fontWeight: "bold" }}>
                Đang xử lý thông tin người dùng vừa nhập
              </span>
            </div>
          )}
          <div>
            <Typography
              variant="h5"
              component="h6"
              className={classes.contentHeaderWrap}
            >
              Tại sao cần cung cấp các thông tin trên?
            </Typography>
            <ArrowDownwardIcon
              style={{ width: "40px", height: "50px", color: "green" }}
            />
            <p style={{ fontStyle: "italic" }}>{contentIntro.reasonFBLink}</p>
          </div>
        </>
      )}

      {isChooseTechOptions && !isChooseAddOptions && (
        <DraggableDialog
          dialogContent="Thông tin người dùng vừa nhập, hệ thống không xác định được CHUYÊN MÔN. Vui
            lòng chọn tùy chọn bên dưới."
        />
      )}
      {isChooseAddOptions && !isChooseTechOptions && (
        <DraggableDialog
          dialogContent="Thông tin người dùng vừa nhập, hệ thống không xác định được NGOÀI CHUYÊN MÔN. Vui
      lòng chọn tùy chọn bên dưới."
        />
      )}
      {isChooseTechOptions && isChooseAddOptions && (
        <DraggableDialog
          dialogContent="Thông tin người dùng vừa nhập, hệ thống không xác định được CHUYÊN MÔN và NGOÀI CHUYÊN MÔN. Vui
            lòng chọn tùy chọn bên dưới."
        />
      )}
      {!isKeepCurrentPage && (
        <div className={classes.linearLoadingNavigatePage}>
          <LinearProgress color="primary" style={{ height: "3px" }} />
          <span style={{ fontWeight: "bold" }}>Đang chuyển sang trang mới</span>
        </div>
      )}
      {}
    </div>
  );
};

export default Login;
