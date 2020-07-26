import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";

import useMediaQuery from "@material-ui/core/useMediaQuery";
import { makeStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import Toolbar from "@material-ui/core/Toolbar";
import Button from "@material-ui/core/Button";
import IconButton from "@material-ui/core/IconButton";
import SearchIcon from "@material-ui/icons/Search";
import Typography from "@material-ui/core/Typography";
import Chip from "@material-ui/core/Chip";
import FaceIcon from "@material-ui/icons/Face";
import NotificationsActiveIcon from "@material-ui/icons/NotificationsActive";
import PostAddIcon from "@material-ui/icons/PostAdd";

import DrawerMenu from "../../components/DrawerMenu";

const useStyles = makeStyles((theme) => ({
  headerContainer: {
    borderBottom: `1px solid ${theme.palette.divider}`,
    backgroundColor: "#808182",
    padding: (props) => (props.is_maxWidth_1000px ? "0px 2px" : null),
    transition: "transform 1s",
    transform: (props) => (props.hidingUserIcon ? "none" : "translateY(-100%)"),
    height: "46px",
    minHeight: "20px",
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
    animationDuration: "6s",
    animationIterationCount: "infinite",
    fontSize: (props) => (props.is_maxWidth_1000px ? "15px" : "30px"),
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
  const history = useHistory();
  const is_maxWidth_1000px = useMediaQuery("(max-width:1000px)");
  const [showAppName, setShowAppName] = useState(true);
  const [searchTxt, setSearchTxt] = useState("");
  const [hidingUserIcon, setHidingUserIcon] = useState(true);

  const { onSearchArticle, title, currentUser, searchTxtOnHomePage , _onClickSusbribeToReceiveNotification, _onClickSusbribeToPushNotification, _onClickSendSubscriptionToPushServer, _onClickSendNotification} = props;
  const classes = useStyles({ ...props, is_maxWidth_1000px, hidingUserIcon });

  const handleDeleteUser = () => {
    localStorage.removeItem("userData");
    history.push("/home");
    window.location.reload();
  };
  const onChangeSearchTxt = (txt) => {
    setSearchTxt(txt);

    if (window.location.pathname === "/home") {
      history.push({
        pathname: "/home/topic",
        topic: txt,
        searchTxt: txt,
      });
    } else {
      onSearchArticle(txt);
    }
  };

  const onScroll = () => {
    // Khoảng cách từ đỉnh scroll bar đến đỉnh của browser
    const scrollTop = document.documentElement.scrollTop;
    if (scrollTop >= 100) {
      setHidingUserIcon(false);
    }
    if (scrollTop === 0) {
      setHidingUserIcon(true);
    }
  };

  useEffect(() => {
    setTimeout(() => {
      setShowAppName(false);
    }, 3000);
  });
  useEffect(() => {
    setSearchTxt(searchTxtOnHomePage);
    window.addEventListener("scroll", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
    };
  }, []);
  return (
    <React.Fragment>
      <Toolbar className={classes.headerContainer}>
        <DrawerMenu />
        {(!showAppName || !is_maxWidth_1000px) && (
          <Chip
            icon={<FaceIcon />}
            label={currentUser || "Vô danh"}
            className={classes.userBtnWrap}
            onDelete={handleDeleteUser}
          />
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
              value={searchTxt}
              onChange={(node) => onChangeSearchTxt(node.target.value)}
              autoFocus
            />
            <SearchIcon />
          </IconButton>
        )}
        {(!showAppName || !is_maxWidth_1000px) && (
          <>
            <Button
              size="small"
              onClick={_onClickSusbribeToReceiveNotification}
              className={classes.subcribeBtnWrap}
            >
              <NotificationsActiveIcon />
            </Button>
            <Button
              size="small"
              onClick={null}
              className={classes.suggestSupplyArticleBtnWrap}
            >
              <PostAddIcon />
            </Button>
            <Button
              onClick={_onClickSusbribeToPushNotification}
              title="Test push sw"
              color="#black"
              size="small"
            />
            <Button
              onClick={_onClickSendSubscriptionToPushServer}
              title="Test send sw"
              color="#black"
              size="small"
            />
            <Button
              onClick={_onClickSendNotification}
              title="Test send nofi"
              color="#black"
              size="small"
            />
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
            value={searchTxt}
            onChange={(node) => onChangeSearchTxt(node.target.value)}
            autoFocus
          />
          <SearchIcon />
        </IconButton>
      )}
    </React.Fragment>
  );
};

export default Header;
