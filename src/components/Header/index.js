import React, { useState, useEffect } from "react";
import useMediaQuery from "@material-ui/core/useMediaQuery";
import { makeStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import Toolbar from "@material-ui/core/Toolbar";
import Button from "@material-ui/core/Button";
import IconButton from "@material-ui/core/IconButton";
import SearchIcon from "@material-ui/icons/Search";
import Typography from "@material-ui/core/Typography";
import Avatar from "@material-ui/core/Avatar";
import Chip from "@material-ui/core/Chip";

const useStyles = makeStyles((theme, is_maxWidth_1000px) => ({
  headerContainer: {
    borderBottom: `1px solid ${theme.palette.divider}`,
    backgroundColor: "#808182",
    padding: (props) => (props.is_maxWidth_1000px ? "0px 2px" : null),
  },

  userBtnWrap: {
    backgroundColor: "#808182",
    color: "#ffff",
    fontWeight: "bold",
    fontSize: (props) => (props.is_maxWidth_1000px ? "10px" : "15px"),
  },
  titleWrap: {
    flex: 1,
    fontWeight: "bold",
    fontStyle: "italic",
    color: "#ffff",
    textShadow: (props) =>
      props.is_maxWidth_1000px ? "1px 1px white" : "2px 2px white",
    position: "relative",
    animationName: "$titleAmination",
    animationDuration: "2s",
    fontSize: (props) => (props.is_maxWidth_1000px ? "15px" : "40px"),
  },

  "@keyframes titleAmination": {
    "0%": { opacity: 0, paddingLeft: "300px" },
    "25%": { opacity: 0.2, paddingLeft: "250px" },
    "50%": { opacity: 0.5, paddingLeft: "170px" },
    "75%": { opacity: 0.7, paddingLeft: "150px" },
    "100%": { opacity: 1, paddingLeft: "0" },
  },
  searchPlaceholder: {
    fontWeight: "bold",
    fontSize: (props) => (props.is_maxWidth_1000px ? "5px" : "15px"),
  },
  subcribeBtnWrap: {
    marginRight: (props) => (props.is_maxWidth_1000px ? "0px" : "10px"),
    color: "#ffff",
    fontWeight: "bold",
    fontSize: (props) => (props.is_maxWidth_1000px ? "10px" : "15px"),
    transition: "transform 0.5s",
    "&:hover": {
      transform: "scale(1.1)",
    },
  },
  suggestSupplyArticleBtnWrap: {
    color: "#ffff",
    fontWeight: "bold",
    fontSize: (props) => (props.is_maxWidth_1000px ? "10px" : "15px"),
    transition: "transform 0.5s",
    "&:hover": {
      transform: "scale(1.1)",
    },
  },
}));

const Header = (props) => {
  const is_maxWidth_1000px = useMediaQuery("(max-width:1000px)");
  const classes = useStyles({ ...props, is_maxWidth_1000px });
  const [showAppName, setShowAppName] = useState(true);

  const {
    onHandleNavigateAdminPage,
    onHandleSubscribeNotifiByBot,
    onHandleSuggestSendArticle,
    title,
    currentUser,
  } = props;

  useEffect(() => {
    setTimeout(() => {
      setShowAppName(false);
    }, 3000);
  });
  return (
    <React.Fragment>
      <Toolbar className={classes.headerContainer}>
        {/* <DrawerMenu /> */}
        {(!showAppName || !is_maxWidth_1000px) && (
          <Button onClick={onHandleNavigateAdminPage}>
            <Chip
              avatar={
                <Avatar>
                  {currentUser ? currentUser.charAt(0).toUpperCase() : "U"}
                </Avatar>
              }
              label={currentUser || "User"}
              className={classes.userBtnWrap}
            />
          </Button>
        )}

        {(showAppName || !is_maxWidth_1000px) && (
          <Typography
            variant="h5"
            color="inherit"
            align="center"
            noWrap
            className={classes.titleWrap}
          >
            {title}
          </Typography>
        )}
        {!is_maxWidth_1000px && (
          <IconButton className={classes.search}>
            <TextField
              id="standard-basic"
              label="Tìm kiếm"
              className={classes.searchPlaceholder}
              fullWidth={true}
              size="small"
            />
            <SearchIcon />
          </IconButton>
        )}
        {(!showAppName || !is_maxWidth_1000px) && (
          <>
            <Button
              size="small"
              onClick={onHandleSubscribeNotifiByBot}
              className={classes.subcribeBtnWrap}
            >
              ĐĂNG KÝ
            </Button>
            <Button
              size="small"
              onClick={onHandleSuggestSendArticle}
              className={classes.suggestSupplyArticleBtnWrap}
            >
              GỬI BÀI VIẾT
            </Button>
          </>
        )}
      </Toolbar>
      {is_maxWidth_1000px && (
        <IconButton className={classes.search}>
          <TextField
            id="standard-basic"
            label="Tìm kiếm"
            className={classes.searchPlaceholder}
            fullWidth={true}
            size="small"
          />
          <SearchIcon />
        </IconButton>
      )}
    </React.Fragment>
  );
};

export default Header;
