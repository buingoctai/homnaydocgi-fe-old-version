import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import Toolbar from "@material-ui/core/Toolbar";
import Button from "@material-ui/core/Button";
import IconButton from "@material-ui/core/IconButton";
import SearchIcon from "@material-ui/icons/Search";
import Typography from "@material-ui/core/Typography";
import Avatar from "@material-ui/core/Avatar";
import Chip from "@material-ui/core/Chip";
import DrawerMenu from "../DrawerMenu";

const useStyles = makeStyles((theme) => ({
  toolbar: {
    borderBottom: `1px solid ${theme.palette.divider}`,
    backgroundColor: "#808182",
  },
  toolbarTitle: {
    flex: 1,
    fontWeight: "bold",
    fontStyle: "italic",
    color: "#ffff",
    fontSize: "40px",
    textShadow: "2px 2px white",
    position: "relative",
    animationName: "$titleAmination",
    animationDuration: "2s",
  },
  toolbarSecondary: {
    justifyContent: "space-between",
    overflowX: "auto",
  },
  toolbarLink: {
    padding: theme.spacing(1),
    flexShrink: 0,
  },
  titleWrap: {
    position: "relative",
    animationName: "$titleAmination",
    animationDuration: "2s",
  },
  "@keyframes titleAmination": {
    "0%": { opacity: 0, paddingLeft: "300px" },
    "25%": { opacity: 0.2, paddingLeft: "250px" },
    "50%": { opacity: 0.5, paddingLeft: "170px" },
    "75%": { opacity: 0.7, paddingLeft: "150px" },
    "100%": { opacity: 1, paddingLeft: "0" },
  },
}));

const Header = (props) => {
  const classes = useStyles();
  const {
    onHandleNavigateAdminPage,
    onHandleSubscribeNotifiByBot,
    onHandleSuggestSendArticle,
    sections,
    title,
    currentUser,
  } = props;

  return (
    <React.Fragment>
      <Toolbar className={classes.toolbar}>
        <DrawerMenu />

        <Button onClick={onHandleNavigateAdminPage}>
          <Chip
            avatar={
              <Avatar>
                {currentUser ? currentUser.charAt(0).toUpperCase() : "U"}
              </Avatar>
            }
            label={currentUser || "KHÔNG XÁC ĐỊNH NGƯỜI DÙNG"}
            style={{
              backgroundColor: "#808182",
              color: "#ffff",
              fontWeight: "bold",
            }}
          />
        </Button>
        <Typography
          component="h2"
          variant="h5"
          color="inherit"
          align="center"
          noWrap
          className={classes.toolbarTitle}
        >
          {title}
        </Typography>

        <IconButton>
          <TextField
            id="standard-basic"
            label="Tìm kiếm"
            style={{ fontWeight: "bold" }}
          />
          <SearchIcon />
        </IconButton>
        <Button
          size="small"
          onClick={onHandleSubscribeNotifiByBot}
          style={{ marginRight: "10px", color: "#ffff", fontWeight: "bold" }}
        >
          ĐĂNG KÝ
        </Button>
        <Button
          size="small"
          onClick={onHandleSuggestSendArticle}
          style={{ marginRight: "10px", color: "#ffff", fontWeight: "bold" }}
        >
          GỬI BÀI VIẾT
        </Button>
      </Toolbar>
    </React.Fragment>
  );
};

export default Header;
