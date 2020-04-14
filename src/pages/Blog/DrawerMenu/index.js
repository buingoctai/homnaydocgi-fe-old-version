import React from "react";
import clsx from "clsx";
import { makeStyles } from "@material-ui/core/styles";
import Drawer from "@material-ui/core/Drawer";
import Button from "@material-ui/core/Button";
import List from "@material-ui/core/List";
import Divider from "@material-ui/core/Divider";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import InboxIcon from "@material-ui/icons/MoveToInbox";
import MailIcon from "@material-ui/icons/Mail";
import MenuIcon from "@material-ui/icons/Menu";
import ComputerIcon from "@material-ui/icons/Computer";
import EmojiPeopleIcon from "@material-ui/icons/EmojiPeople";
import SupervisedUserCircleIcon from "@material-ui/icons/SupervisedUserCircle";
import AttachMoneyIcon from "@material-ui/icons/AttachMoney";
import FaceIcon from "@material-ui/icons/Face";
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
      case "Lập Trình Back End":
        return <ComputerIcon />;
      case "Lãnh Đạo":
        return <EmojiPeopleIcon />;
      case "Marketing":
        return <AttachMoneyIcon />;
      case "Tâm Lý Học":
        return <SupervisedUserCircleIcon />;
      case "Quan Điểm Cá Nhân":
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
          "Lập Trình Back End",
          "Lãnh Đạo",
          "Marketing",
          "Tâm Lý Học",
          "Quan Điểm Cá Nhân",
        ].map((text, index) => (
          <ListItem button key={text}>
            <ListItemIcon>{determineIcon(text)}</ListItemIcon>
            <ListItemText primary={text} />
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
