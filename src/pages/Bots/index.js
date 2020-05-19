import React from "react";
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
import MusicVideoIcon from '@material-ui/icons/MusicVideo';
import VideoCallIcon from '@material-ui/icons/VideoCall';
import ChatIcon from '@material-ui/icons/Chat';
import ReadNews from "./components/ReadNews";
import Header from "../../components/Header";
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
  tabWrap: {
    backgroundColor: theme.palette.background.paper,
    width: "70%",
    marginTop: "50px",
  },
  tabLabelWrap: {
    display: "flex",
    alignItems: "center",
  }
}));

const Bots = (props) => {
  const {
    allArticle,
    currentAudioArticle,
    currentPageIndex,
    onClickListenArticle,
    onChangePageIndex,
  } = props;
  const classes = useStyles();
  const theme = useTheme();
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const handleChangeIndex = (index) => {
    setValue(index);
  };

  return (
    <React.Fragment>
      <CssBaseline />
      <Container className={classes.container}>
        <Header
          title="HÔM NAY ĐỌC GÌ?"
          currentUser={"userName"}
          onSearchArticle={null}
        />
        <div style={{ display: "flex", justifyContent: "center" }}>
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
                <Tab label={<div className={classes.tabLabelWrap}><MusicVideoIcon /><span style={{ paddingLeft: "5px" }}>Đọc Báo</span></div>} {...a11yProps(0)} />
                <Tab label={<div className={classes.tabLabelWrap}><VideoCallIcon /><span style={{ paddingLeft: "5px" }}>Gọi Video</span></div>} {...a11yProps(1)} />
                <Tab label={<div className={classes.tabLabelWrap}><ChatIcon /><span style={{ paddingLeft: "5px" }}>Chat</span></div>} {...a11yProps(2)} />
              </Tabs>
            </AppBar>
            <SwipeableViews
              axis={theme.direction === "rtl" ? "x-reverse" : "x"}
              index={value}
              onChangeIndex={handleChangeIndex}
            >
              <TabPanel value={value} index={0} dir={theme.direction}>
                <ReadNews
                  allArticle={allArticle}
                  currentAudioArticle={currentAudioArticle}
                  currentPageIndex={currentPageIndex}
                  onClickListenArticle={onClickListenArticle}
                  onChangePageIndex={onChangePageIndex}
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
        </div>
      </Container>
    </React.Fragment>
  );
};

export default enhance(Bots);
