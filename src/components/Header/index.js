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
import BookmarksIcon from "@material-ui/icons/Bookmarks";
import Badge from "@material-ui/core/Badge";

import { userDataCRUD } from "../../utils/utils";
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
    fontSize: (props) => (props.is_maxWidth_1000px ? "5px" : "10px"),
    "@global": {
      ".MuiInput-underline:before": {
        borderBottom: "none",
      },
    },
  },
  subcribeBtnWrap: {
    marginRight: (props) => (props.is_maxWidth_1000px ? "0px" : "10px"),
    color: "#ffff",
    fontWeight: "bold",
    fontSize: (props) => (props.is_maxWidth_1000px ? "10px" : "15px"),
    transition: "transform 0.25s",
    "&:hover": {
      transform: "scale(1.05)",
    },
    "@global": {
      ".MuiBadge-badge": {
        minWidth: "0px",
        width: "15px",
        height: "15px",
      },
    },
  },
  bookMarkbtnWrap: {
    color: "#ffff",
    fontWeight: "bold",
    fontSize: (props) => (props.is_maxWidth_1000px ? "10px" : "15px"),
    transition: "transform 0.25s",
    "&:hover": {
      transform: "scale(1.05)",
    },
    "@global": {
      ".MuiBadge-badge": {
        minWidth: "0px",
        width: "15px",
        height: "15px",
      },
    },
  },
}));

const Header = (props) => {
  const history = useHistory();
  const is_maxWidth_1000px = useMediaQuery("(max-width:1000px)");
  const [showAppName, setShowAppName] = useState(true);

  const [hidingUserIcon, setHidingUserIcon] = useState(true);

  const {
    onSearchArticle,
    setIsOpenNotification,
    title,
    currentUser,
    searchingTxt,
    postList,
    isOpenNotification,
  } = props;
  const classes = useStyles({ ...props, is_maxWidth_1000px, hidingUserIcon });

  const handleDeleteUser = () => {
    userDataCRUD({ action: "DELETE" });
    history.push("/home");
    window.location.reload();
  };
  const onChangeSearchTxt = (txt) => {
    if (window.location.pathname === "/home/topic") {
      onSearchArticle(txt);
      return;
    }
    history.push({
      pathname: "/home/topic",
      searchTxt: txt,
    });
  };

  const onOpenSavedListPost = () => {
    if (window.location.pathname !== "/home/topic") {
      history.push({
        pathname: "/home/topic",
      });
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
              value={searchingTxt || ""}
              onChange={(node) => onChangeSearchTxt(node.target.value)}
            />
            <SearchIcon />
          </IconButton>
        )}
        {(!showAppName || !is_maxWidth_1000px) && (
          <>
            {window.location.pathname === "/home" && (
              <Button
                size="small"
                onClick={() => setIsOpenNotification(!isOpenNotification)}
                className={classes.subcribeBtnWrap}
                id="notiDividerBtn"
              >
                <Badge color="secondary" overlap="circle" badgeContent="3">
                  <NotificationsActiveIcon />
                </Badge>
              </Button>
            )}

            <Button
              size="small"
              onClick={() =>
                (window.location.href = `${process.env.REACT_APP_URL}/home/topic`)
              }
              className={classes.bookMarkbtnWrap}
            >
              <Badge
                color="secondary"
                overlap="circle"
                badgeContent={postList.length}
              >
                <BookmarksIcon />
              </Badge>
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
            value={searchingTxt}
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
