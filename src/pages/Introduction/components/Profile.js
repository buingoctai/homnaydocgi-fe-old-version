import React from "react";
import Avatar from "@material-ui/core/Avatar";
import { makeStyles } from "@material-ui/core/styles";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import Divider from "@material-ui/core/Divider";
import ListItemAvatar from "@material-ui/core/ListItemAvatar";
import Tooltip from "@material-ui/core/Tooltip";
import BusinessIcon from "@material-ui/icons/Business";
import DirectionsRun from "@material-ui/icons/DirectionsRun";
import PhoneInTalkIcon from "@material-ui/icons/PhoneInTalk";
import LinkedInIcon from "@material-ui/icons/LinkedIn";
import Chip from "@material-ui/core/Chip";

import avatar from "../../assets/images/avatar.jpg";

import {
  authorBrielf,
  skillGroup,
  skillDescribe,
} from "../../../utils/constants";

const useStyles = makeStyles((theme) => ({
  imageContainer: {
    height: "25%",
  },
  avatar: {
    height: "100px",
    width: "100px",
  },
  brielfAuthor: {
    height: "45%",
  },

  skillInform: {
    height: "30%",
    marginTop: "30px",

    display: "flex",
    flexDirection: "row",
    alignItems: "flex-end",
    whiteSpace: "normal",
  },
}));

const [name, workingPlace, address, phone] = Object.keys(authorBrielf);
const Profile = () => {
  const classes = useStyles();
  return (
    <div
      style={{
        height: "500px",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
      }}
    >
      <div className={classes.imageContainer}>
        <a
          href="https://www.facebook.com/bui.ngoctai.71"
          target="_blank"
          rel="noopener noreferrer"
        >
          <Avatar
            alt="Click into avatar redirect to Author"
            src={avatar}
            className={classes.avatar}
          />
        </a>
      </div>
      <div className={classes.brielfAuthor}>
        <List>
          <ListItem>
            <ListItemAvatar>
              <Avatar style={{ color: "#15edaf", background: "#5fcfaf" }}>
                <DirectionsRun />
              </Avatar>
            </ListItemAvatar>
            <ListItemText
              primary={name.toUpperCase()}
              secondary={authorBrielf.name}
            />
          </ListItem>
          <Divider variant="inset" component="li" />

          <ListItem>
            <ListItemAvatar>
              <Avatar style={{ color: "#15edaf", background: "#5fcfaf" }}>
                <BusinessIcon />
              </Avatar>
            </ListItemAvatar>
            <ListItemText
              primary={workingPlace.toUpperCase()}
              secondary={authorBrielf.workingPlace}
            />
          </ListItem>

          <ListItem>
            <ListItemAvatar>
              <Avatar style={{ color: "#15edaf", background: "#5fcfaf" }}>
                <PhoneInTalkIcon />
              </Avatar>
            </ListItemAvatar>
            <ListItemText
              primary={phone.toUpperCase()}
              secondary={authorBrielf.phone}
            />
          </ListItem>
          <Divider variant="inset" component="li" />
        </List>
      </div>
      <div className={classes.skillInform}>
        <Tooltip title={skillDescribe.programmer} placement="top">
          <Chip
            label={skillGroup.programmer}
            color="primary"
            style={{ marginLeft: "10px" }}
          />
        </Tooltip>

        <Tooltip title={skillDescribe.writer} placement="top">
          <Chip
            label={skillGroup.writer}
            color="primary"
            style={{ marginLeft: "10px", marginRight: "10px" }}
          />
        </Tooltip>

        <Tooltip title={skillDescribe.sharer} placement="top">
          <Chip
            label={skillGroup.sharer}
            color="primary"
            style={{ marginRight: "10px" }}
          />
        </Tooltip>

        <Chip
          icon={<LinkedInIcon style={{ width: "20px" }} />}
          color="primary"
          style={{ justifyContent: "center" }}
          label={skillGroup.linkedin}
          onClick={() =>
            (document.location.href =
              "https://www.linkedin.com/in/t%C3%A0i-b%C3%B9i-0010a6152/")
          }
        />
      </div>
    </div>
  );
};

export default Profile;
