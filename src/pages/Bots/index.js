import React, { useEffect, useState } from "react";
import useMediaQuery from "@material-ui/core/useMediaQuery";
import Container from "@material-ui/core/Container";
import CssBaseline from "@material-ui/core/CssBaseline";
import PropTypes from "prop-types";
import SwipeableViews from "react-swipeable-views";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import Typography from "@material-ui/core/Typography";
import Box from "@material-ui/core/Box";
import MusicVideoIcon from "@material-ui/icons/MusicVideo";
import VideoCallIcon from "@material-ui/icons/VideoCall";
import ChatIcon from "@material-ui/icons/Chat";
import AccountCircleIcon from "@material-ui/icons/AccountCircle";
import TocIcon from "@material-ui/icons/Toc";

import ReadNews from "./components/ReadNews";
import NotificationsIcon from "@material-ui/icons/Notifications";
import Header from "../../components/Header";
import BarChart from "../../components/BarChart";
import enhance from "./enhance";

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`full-width-tabpanel-${index}`}
      aria-labelledby={`full-width-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box p={3}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.any.isRequired,
  value: PropTypes.any.isRequired,
};

function a11yProps(index) {
  return {
    id: `full-width-tab-${index}`,
    "aria-controls": `full-width-tabpanel-${index}`,
  };
}

const useStyles = makeStyles((theme) => ({
  container: {
    width: "90%",
    paddingLeft: (props) => (props.is_maxWidth_500px ? "0px" : "none"),
    paddingRight: (props) => (props.is_maxWidth_500px ? "0px" : "none"),
  },

  rootWrap: {
    display: "flex",
    justifyContent: "center",
    flexDirection: "row",
    marginTop: (props) => (props.is_maxWidth_500px ? "5px" : "50px"),
  },

  tabWrap: {
    backgroundColor: theme.palette.background.paper,
    width: (props) => (props.is_maxWidth_500px ? "95%" : "70%"),
  },
  personalizedUserWrap: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    flexGrow: "0.5",
  },
  personalizedChartWrap: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    flexGrow: "1",
  },
  icon: {
    fontSize: "40px",
    marginBottom: "50px",
  },
  tabLabelWrap: {
    display: "flex",
    alignItems: "center",
  },
  tabpanelWrap: {
    "@global": {
      ".MuiBox-root-278": {
        padding: "0px 0px",
      },
    },
  },
}));

const Bots = (props) => {
  const responsiveObj = {
    is_maxWidth_500px: useMediaQuery("(max-width:500px)"),
    is_maxWidth_1000px: useMediaQuery("(max-width:1000px)"),
    is_minWidth_2000px: useMediaQuery("(min-width:2000px)"),
  };

  const {
    userName,
    postList,
    allArticle,
    currentAudioArticle,
    currentPageIndex,
    onClickListenArticle,
    onChangePageIndex,
  } = props;
  const classes = useStyles({ ...responsiveObj });
  const theme = useTheme();
  const [value, setValue] = useState(0);
  const [hidingUserIcon, setHidingUserIcon] = useState(true);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const handleChangeIndex = (index) => {
    setValue(index);
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
    window.addEventListener("scroll", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
    };
  }, []);

  return (
    <React.Fragment>
      <CssBaseline />
      <Container className={classes.container}>
        <Header
          title="HÔM NAY ĐỌC GÌ?"
          currentUser={userName}
          postList={postList}
        />
        <div className={classes.rootWrap}>
          <div className={classes.personalizedUserWrap}>
            {!hidingUserIcon && <AccountCircleIcon className={classes.icon} />}
            <NotificationsIcon className={classes.icon} />
            <TocIcon className={classes.icon} />
          </div>
          <div className={classes.tabWrap}>
            <AppBar position="static" color="default">
              <Tabs
                value={value}
                onChange={handleChange}
                indicatorColor="primary"
                textColor="primary"
                variant="fullWidth"
                aria-label="full width tabs example"
              >
                <Tab
                  label={
                    <div className={classes.tabLabelWrap}>
                      <MusicVideoIcon />
                      {!responsiveObj.is_maxWidth_500px && (
                        <span
                          style={{ paddingLeft: "5px", fontWeight: "1000" }}
                        >
                          Đọc Báo
                        </span>
                      )}
                    </div>
                  }
                  {...a11yProps(0)}
                />
                <Tab
                  label={
                    <div className={classes.tabLabelWrap}>
                      <VideoCallIcon />
                      {!responsiveObj.is_maxWidth_500px && (
                        <span
                          style={{ paddingLeft: "5px", fontWeight: "1000" }}
                        >
                          Gọi Video
                        </span>
                      )}
                    </div>
                  }
                  {...a11yProps(1)}
                />
                <Tab
                  label={
                    <div className={classes.tabLabelWrap}>
                      <ChatIcon />
                      {!responsiveObj.is_maxWidth_500px && (
                        <span
                          style={{ paddingLeft: "5px", fontWeight: "1000" }}
                        >
                          Chat
                        </span>
                      )}
                    </div>
                  }
                  {...a11yProps(2)}
                />
              </Tabs>
            </AppBar>
            <SwipeableViews
              axis={theme.direction === "rtl" ? "x-reverse" : "x"}
              index={value}
              onChangeIndex={handleChangeIndex}
            >
              <TabPanel
                value={value}
                index={0}
                dir={theme.direction}
                className={classes.tabpanelWrap}
              >
                <ReadNews
                  allArticle={allArticle}
                  currentAudioArticle={currentAudioArticle}
                  currentPageIndex={currentPageIndex}
                  onClickListenArticle={onClickListenArticle}
                  onChangePageIndex={onChangePageIndex}
                  responsiveObj={responsiveObj}
                />
              </TabPanel>
              <TabPanel value={value} index={1} dir={theme.direction}>
                ĐANG PHÁT TRIỂN
              </TabPanel>
              <TabPanel value={value} index={2} dir={theme.direction}>
                ĐANG PHÁT TRIỂN
              </TabPanel>
            </SwipeableViews>
          </div>
          <div className={classes.personalizedChartWrap}>
            <BarChart />
          </div>
        </div>
      </Container>
    </React.Fragment>
  );
};

export default enhance(Bots);
