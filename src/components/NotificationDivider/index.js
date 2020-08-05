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
    justifyContent: "flex-end",
    width: "100%",
    paddingRight: "230px",
    marginTop: "5px",
  },
  listWrap: {
    width: "100%",
    zIndex: "2",
    maxWidth: 360,
    backgroundColor: theme.palette.background.paper,
    marginLeft: "auto",
    overflowY: "scroll",
    paddingRight: "15px",
    boxSizing: "content-box",
    maxHeight: "300px",
    backgroundColor: "#E7EAED",
  },
}));

export default function ListDividers(props) {
  const classes = useStyles();
  const { setIsOpenChoseTopic, setIsOpenFeedBack } = props;

  return (
    <div className={classes.container}>
      <div
        style={{
          position: "relative",
          overflow: "hidden",
          borderRadius: "5px",
        }}
        id="notiDivider"
      >
        <List
          component="nav"
          className={classes.listWrap}
          aria-label="mailbox folders"
        >
          <h3
            style={{
              color: "#808182",
              marginTop: "0px",
              marginBottom: "0px",
              marginLeft: "10px",
            }}
          >
            Thông báo
          </h3>

          <ListItem>
            <ListItemText primary="Cảm ơn bạn đã ghé thăm website!" />
          </ListItem>
          <Divider />
          <ListItem button divider>
            <ListItemText
              primary="Chọn chủ đề bạn muốn học hỏi"
              onClick={() => setIsOpenChoseTopic(true)}
            />
          </ListItem>
          <Divider light />
          <ListItem button onClick={() => setIsOpenFeedBack(true)}>
            <ListItemText primary="Gửi feedback trực tiếp đến Tài Admin. Nội dung sẽ được đến Tài thông qua messenger." />
          </ListItem>
        </List>
      </div>
    </div>
  );
}
