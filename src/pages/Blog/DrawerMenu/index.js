import React from "react";
import clsx from "clsx";
import { makeStyles } from "@material-ui/core/styles";
import Drawer from "@material-ui/core/Drawer";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import MenuIcon from "@material-ui/icons/Menu";
import ComputerIcon from "@material-ui/icons/Computer";
import EmojiPeopleIcon from "@material-ui/icons/EmojiPeople";
import SupervisedUserCircleIcon from "@material-ui/icons/SupervisedUserCircle";
import FaceIcon from "@material-ui/icons/Face";
import RedditIcon from '@material-ui/icons/Reddit';
import NaturePeopleIcon from '@material-ui/icons/NaturePeople';

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
      case "Quản Trị":
        return <EmojiPeopleIcon />;
      case "Tâm Lý Học":
        return <SupervisedUserCircleIcon />;
      case "Quan Điểm Cá Nhân":
        return <FaceIcon />;
      case "Triết Học":
        return <NaturePeopleIcon />;
      case "Nguyên Cứu AI/ML/DL":
        return <RedditIcon />;
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
          "Nguyên Cứu AI/ML/DL",
          "Triết Học",
          "Tâm Lý Học",
          "Quản Trị",
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
