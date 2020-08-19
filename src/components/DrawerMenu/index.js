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
import AddToHomeScreenIcon from "@material-ui/icons/AddToHomeScreen";
import FacebookIcon from "@material-ui/icons/Facebook";
import LinkedInIcon from "@material-ui/icons/LinkedIn";
import Button from "@material-ui/core/Button";
import { translateUrl, userDataCRUD } from "../../utils/utils";
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

const DrawerMenu = (props) => {
  const { onSubscribePage } = props;
  const classes = useStyles();
  const [isOpen, setIsOpen] = React.useState(false);
  userDataCRUD({ action: "EDIT", data: {} });
  const { subscriptionId = "" } = userDataCRUD({
    action: "GET",
  });

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

        <ListItem button key={"text"}>
          <a
            // style={{ textDecoration: "none" }}
            onClick={onSubscribePage}
            to=""
          >
            <ListItemIcon>
              <AddToHomeScreenIcon color="primary" />
            </ListItemIcon>
            <ListItemText style={{ color: "#551A8B", textAlign: "center" }}>
              {subscriptionId ? "Bỏ Theo Dõi" : "Theo Dõi"}
            </ListItemText>
          </a>
        </ListItem>
        {/* <ListItem button key={"text"}>
          <Link
            style={{ textDecoration: "none" }}
            onClick={() =>
              window.open("https://www.facebook.com/bui.ngoctai.71/", "_blank")
            }
            to=""
          >
            <ListItemIcon>
              <FacebookIcon color="primary" />
            </ListItemIcon>
            <ListItemText>Liên hệ</ListItemText>
          </Link>
        </ListItem> */}
        {/* <ListItem button key={"text"}>
          <Link
            style={{ textDecoration: "none" }}
            onClick={() =>
              window.open(
                "https://www.linkedin.com/in/b%C3%B9i-ng%E1%BB%8Dc-t%C3%A0i-0010a6152/?lipi=urn%3Ali%3Apage%3Ad_flagship3_feed%3Bq8uomy%2BNRKit63nDG4gSfg%3D%3D&licu=urn%3Ali%3Acontrol%3Ad_flagship3_feed-nav.settings_view_profile",
                "_blank"
              )
            }
            to=""
          >
            <ListItemIcon>
              <LinkedInIcon color="primary" />
            </ListItemIcon>
            <ListItemText>Linkedin</ListItemText>
          </Link>
        </ListItem> */}
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
};

export default DrawerMenu;
