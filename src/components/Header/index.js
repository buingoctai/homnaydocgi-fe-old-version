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
import Badge from "@material-ui/core/Badge";

import { userDataCRUD } from "../../utils/utils";
import DrawerMenu from "../../components/DrawerMenu";

const useStyles = makeStyles((theme) => ({
  header__container: {
    padding: (props) => (props.is_maxWidth_1000px ? "0px 2px" : null),
    transition: "transform 1s",
    transform: (props) => (props.hidingUserIcon ? "none" : "translateY(-100%)"),
    height: "46px",
    minHeight: "20px",
    "@global": {
      ".MuiChip-root": {
        backgroundColor: '#ffff'
      },
    },
  },

  user__btn__wrap: {
    color: "#737373",
    fontWeight: "bold",
    fontSize: (props) => (props.is_maxWidth_1000px ? "10px" : "15px"),
  },
  title__wrap: {
    flex: 1,
    fontWeight: "1000",
    fontStyle: "italic",
    color: "#808182",
    textShadow: (props) =>
      props.is_maxWidth_1000px ? "1px 1px white" : "2px 2px white",
    position: "relative",
    animationName: "$titleAmination",
    animationDuration: "6s",
    fontSize: (props) => (props.is_maxWidth_1000px ? "15px" : "30px"),
  },

  "@keyframes titleAmination": {
    "0%": { opacity: 0, paddingLeft: "300px" },
    "25%": { opacity: 0.2, paddingLeft: "250px" },
    "50%": { opacity: 0.5, paddingLeft: "170px" },
    "75%": { opacity: 0.7, paddingLeft: "150px" },
    "100%": { opacity: 1, paddingLeft: "0" },
  },
  search__placeholder: {
    fontWeight: "bold",
    fontSize: (props) => (props.is_maxWidth_1000px ? "5px" : "10px"),
    "@global": {
      ".MuiInput-underline:before": {
        borderBottom: "none",
      },
      ".MuiInput-formControl": {
        marginTop: '28px'
      }
    },
  },
  subcribe__btn__wrap: {
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
  bookmark__btn__wrap: {
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
  }
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
      <Toolbar className={classes.header__container}>
        <DrawerMenu />
        {(showAppName || !is_maxWidth_1000px) && (
          <Typography
            variant="h5"
            color="inherit"
            align="center"
            noWrap
            className={classes.title__wrap}
          >
            {title}
          </Typography>
        )}
        {!is_maxWidth_1000px && (
          <IconButton className={classes.search}>
            <TextField
              id="standard-basic"
              label="Tìm kiếm"
              className={classes.search__placeholder}
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
                className={classes.subcribe__btn__wrap}
                id="notiDividerBtn"
              >
                <Badge color="secondary" overlap="circle" badgeContent="3">
                  <svg class="svgIcon-use" width="25" height="25" viewBox="-293 409 25 25"><path d="M-273.327 423.67l-1.673-1.52v-3.646a5.5 5.5 0 00-6.04-5.474c-2.86.273-4.96 2.838-4.96 5.71v3.41l-1.68 1.553c-.204.19-.32.456-.32.734V427a1 1 0 001 1h3.49a3.079 3.079 0 003.01 2.45 3.08 3.08 0 003.01-2.45h3.49a1 1 0 001-1v-2.59c0-.28-.12-.55-.327-.74zm-7.173 5.63c-.842 0-1.55-.546-1.812-1.3h3.624a1.92 1.92 0 01-1.812 1.3zm6.35-2.45h-12.7v-2.347l1.63-1.51c.236-.216.37-.522.37-.843v-3.41c0-2.35 1.72-4.356 3.92-4.565a4.353 4.353 0 014.78 4.33v3.645c0 .324.137.633.376.85l1.624 1.477v2.373z"></path></svg>
                </Badge>
              </Button>
            )}

            <Button
              size="small"
              onClick={() =>
                (window.location.href = `${process.env.REACT_APP_URL}/home/topic`)
              }
              className={classes.bookmark__btn__wrap}
            >
              <Badge
                color="secondary"
                overlap="circle"
                badgeContent={postList.length}
              >
                <svg class="svgIcon-use" width="25" height="25"><path d="M16 6c1.1 0 2 .9 2 2v13.661h-.012a.5.5 0 01-.118.285.508.508 0 01-.708.03L11.5 17.85l-5.662 4.125a.5.5 0 01-.706-.03.478.478 0 01-.12-.285H5V8c0-1.1.9-2 2-2h9zM6 8v12.636l5.162-3.667a.49.49 0 01.676 0L17 20.637V8c0-.55-.45-1-1-1H7c-.55 0-1 .45-1 1z"></path><path d="M21 5v13.661h-.012a.5.5 0 01-.118.285.508.508 0 01-.708.03L20 18.858V5c0-.55-.45-1-1-1h-9c-.55 0-1 .45-1 1H8c0-1.1.9-2 2-2h9c1.1 0 2 .9 2 2z"></path></svg>
              </Badge>
            </Button>
          </>
        )}
        {(!showAppName || !is_maxWidth_1000px) && (
          <Chip
            icon={<FaceIcon />}
            label={currentUser || "Vô danh"}
            className={classes.user__btn__wrap}
            onDelete={handleDeleteUser}
          />
        )}

      </Toolbar>
      {is_maxWidth_1000px && (
        <>
          <IconButton className={classes.search}>
            <TextField
              id="standard-basic"
              label="Tìm kiếm"
              className={classes.search__placeholder}
              fullWidth={true}
              size="small"
              value={searchingTxt}
              onChange={(node) => onChangeSearchTxt(node.target.value)}
              autoFocus
            />
            <SearchIcon />
          </IconButton>
        </>

      )}
    </React.Fragment>
  );
};

export default Header;
