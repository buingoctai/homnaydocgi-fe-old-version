import React from "react";
import { Link } from "react-router-dom";
import clsx from "clsx";
import { makeStyles } from "@material-ui/core/styles";
import Drawer from "@material-ui/core/Drawer";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import MenuIcon from "@material-ui/icons/Menu";
import ComputerIcon from "@material-ui/icons/Computer";
import FaceIcon from "@material-ui/icons/Face";
import TocIcon from '@material-ui/icons/Toc';
import { translateUrl } from "../../utils/utils";
const useStyles = makeStyles({
  list: {
    width: 250,
  },
  fullList: {
    width: "auto",
  },
});

export default function DrawerMenu() {
  const classes = useStyles();
  const [isOpen, setIsOpen] = React.useState(false);

  const toggleDrawer = (open) => (event) => {
    if (
      event.type === "keydown" &&
      (event.key === "Tab" || event.key === "Shift")
    ) {
      return;
    }

    setIsOpen(open);
  };
  const determineIcon = (text) => {
    switch (text) {
      case "Trang Chủ":
        return <ComputerIcon />;
      case "Dữ liệu Crawl":
        return <TocIcon />;
      case "Bots":
        return <FaceIcon />;
      default:
        return null;
    }
  };

  const list = (anchor) => (
    <div
      className={clsx(classes.list, {
        [classes.fullList]: anchor === "top" || anchor === "bottom",
      })}
      role="presentation"
      onClick={toggleDrawer(false)}
      onKeyDown={toggleDrawer(false)}
    >
      <List>
        {[
          "Trang Chủ",
          "Dữ liệu Crawl",
          "Bots"
        ].map((text, index) => (
          <ListItem button key={text}>
            <ListItemIcon >{determineIcon(text)}</ListItemIcon>
            <Link to={{ pathname: translateUrl(text) }} style={{ textDecoration: "none" }}>
              <ListItemText primary={text} />
            </Link>
          </ListItem>
        ))}
      </List>
    </div>
  );

  return (
    <React.Fragment key={"anchor"}>
      <MenuIcon onClick={toggleDrawer(true)} />

      <Drawer
        anchor="left"
        open={isOpen}
        onClose={toggleDrawer(false)}
        style={{ paper: { backgroundColor: "red" } }}
      >
        {list("anchor")}
      </Drawer>
    </React.Fragment>
  );
}
