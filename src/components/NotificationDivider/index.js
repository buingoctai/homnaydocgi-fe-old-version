import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import Divider from "@material-ui/core/Divider";

const useStyles = makeStyles((theme) => ({
  container: {
    position: "absolute",
    display: "flex",
    flexDirection: "row",
    justifyContent: "end",
    width: "100%",
  },
  listWrap: {
    width: "100%",
    zIndex: "2",
    maxWidth: 360,
    backgroundColor: theme.palette.background.paper,
    marginLeft: "auto",
    marginRight: "150px",
    overflowY: "scroll",
    paddingRight: "15px",
    boxSizing: "content-box",
    maxHeight: "200px",
  },
}));

export default function ListDividers() {
  const classes = useStyles();

  return (
    <div className={classes.container}>
      <div
        style={{
          position: "relative",
          overflow: "hidden",
        }}
      >
        <List
          component="nav"
          className={classes.listWrap}
          aria-label="mailbox folders"
        >
          <ListItem button>
            <ListItemText primary="Inbox" />
          </ListItem>
          <Divider />
          <ListItem button divider>
            <ListItemText primary="Drafts" />
          </ListItem>
          <Divider light />
          <ListItem button>
            <ListItemText primary="Spam" />
          </ListItem>
          <Divider light />
          <ListItem button>
            <ListItemText primary="Spam" />
          </ListItem>
          <Divider light />
          <ListItem button>
            <ListItemText primary="Spam" />
          </ListItem>
        </List>
      </div>
    </div>
  );
}
