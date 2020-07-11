import React from "react";
import { Link } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";
import Drawer from "@material-ui/core/Drawer";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import MenuIcon from "@material-ui/icons/Menu";
import RadioIcon from "@material-ui/icons/Radio";
import SubjectIcon from "@material-ui/icons/Subject";
import { translateUrl } from "../../utils/utils";
const useStyles = makeStyles({
  container: {
    "@global": {
      ".MuiPaper-root": {
        backgroundColor: "#7D7D7D",
      },
      ".MuiPaper-elevation16": {
        boxShadow: "none",
      },
    },
  },
  list: {
    width: 250,
  },
  fullList: {
    width: "auto",
    height: "100%",
    "@global": {
      ".MuiList-root": {
        height: "100%",
        width: "120px",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "column",
      },
      ".MuiListItem-root": {
        display: "flex",
        flexDirection: "row",
        justifyContent: "center",
      },
      ".MuiListItemIcon-root": {
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "column",
      },
    },
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
      case "Nội dung":
        return <SubjectIcon color="primary" />;
      case "Nghe Báo":
        return <RadioIcon color="primary" />;
      default:
        return null;
    }
  };

  const list = () => (
    <div
      className={classes.fullList}
      role="presentation"
      onClick={toggleDrawer(false)}
      onKeyDown={toggleDrawer(false)}
    >
      <List>
        {["Nội dung", "Nghe Báo"].map((text, index) => (
          <ListItem button key={text}>
            <Link
              to={{ pathname: translateUrl(text) }}
              style={{ textDecoration: "none" }}
            >
              <ListItemIcon>{determineIcon(text)}</ListItemIcon>
              <ListItemText>{text}</ListItemText>
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
        className={classes.container}
      >
        {list()}
      </Drawer>
    </React.Fragment>
  );
}
