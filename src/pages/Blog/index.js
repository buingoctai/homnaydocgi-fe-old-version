import React from "react";
import ReactGA from "react-ga";
import { useHistory } from "react-router-dom";
import useMediaQuery from "@material-ui/core/useMediaQuery";
import { makeStyles } from "@material-ui/core/styles";
import CssBaseline from "@material-ui/core/CssBaseline";
import Grid from "@material-ui/core/Grid";
import Container from "@material-ui/core/Container";
import LinearProgress from "@material-ui/core/LinearProgress";

import DraggableDialog from "../../components/Dialog";
import Header from "./Header";
import MainFeaturedPost from "./PostWrap/MainFeaturedPost";
import FeaturedPost from "./PostWrap/FeaturedPost";
import DetailPost from "./PostWrap/DetailPost";
import Main from "./Main";
import Footer from "./Footer";
import PostGrid from "./PostWrap/PostGrid";
import enhance from "./enhance";

const useStyles = makeStyles((theme) => ({
  container: {
    width: "90%",
    paddingLeft: (props) => (props.is_maxWidth_500px ? "0px" : "none"),
    paddingRight: (props) => (props.is_maxWidth_500px ? "0px" : "none"),
  },
  mainGrid: {
    marginTop: theme.spacing(3),
  },
  totalContentLoadingWrap: {
    height: "100%",
    width: "100%",
    marginTop: "200px",
    marginBottom: "200px",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
  },
  loadingMessage: {
    display: "flex",
    justifyContent: "center",
    fontSize: "20px",
    fontWeight: "bold",
  },
}));

const sections = [
  { title: "CHUYÊN MÔN", url: "chuyen-mon-list" },
  { title: "NGOÀI CHUYÊN MÔN", url: "ngoai-chuyen-mon-list" },
];

const Blog = (props) => {
  const responsiveObj = {
    is_maxWidth_500px: useMediaQuery("(max-width:500px)"),
    is_maxWidth_1000px: useMediaQuery("(max-width:1000px)"),
    is_minWidth_2000px: useMediaQuery("(min-width:2000px)"),
  };
  const {
    isLoadingPage,
    isLoadingSubPage,
    isOpenDetaiContainer,
    isShowPaging,
    currentUser,
    currentPageIndex,
    detailPost,
    showingPost,
    mainPosts,
    featuredPosts,
    allPost,
    dialogContent,
    setDialogContent,
    onHandleNavigateAdminPage,
    onHandleSubscribeNotifiByBot,
    onHandleSuggestSendArticle,
    onHandleOpenDetailContainer,
  } = props;
  const classes = useStyles({ ...responsiveObj });
  const history = useHistory();

  // history.listen((location) => {
  //   console.log("Track Page Views");
  //   ReactGA.set({ page: location.pathname });
  //   ReactGA.pageview(location.pathname);
  // });
  // ReactGA.set({ page: "https://homnaydocgi.herokuapp.com/home" });
  // ReactGA.pageview("https://homnaydocgi.herokuapp.com/home");

  // const callback = (list) => {
  //   list.getEntries().forEach((entry) => {
  //     ReactGA.timing({
  //       category: "Load Performace",
  //       variable: "Some metric",
  //       value: "Value of Metric",
  //     });
  //   });
  // };

  // var observer = new PerformanceObserver(callback);
  // observer.observe({ entryTypes: ["navigation"] });

  return (
    <React.Fragment>
      <CssBaseline />
      <Container className={classes.container}>
        <Header
          title="HÔM NAY ĐỌC GÌ?"
          sections={sections}
          currentUser={currentUser}
          onHandleNavigateAdminPage={onHandleNavigateAdminPage}
          onHandleSubscribeNotifiByBot={onHandleSubscribeNotifiByBot}
          onHandleSuggestSendArticle={onHandleSuggestSendArticle}
        />
        {isLoadingPage && (
          <div className={classes.totalContentLoadingWrap}>
            <span className={classes.loadingMessage}>Đang tải bài viết</span>
            <LinearProgress
              color="primary"
              style={{ height: "3px", width: "30%" }}
            />
          </div>
        )}
        {DraggableDialog({
          ...dialogContent,
          setDialogContent: setDialogContent,
        })}
        {!isLoadingPage && (
          <main>
            <div
              style={{
                display: "flex",
                flexDirection: "row",
                padding: "20px 0",
              }}
            >
              <MainFeaturedPost
                post={mainPosts}
                responsiveObj={responsiveObj}
                onHandleOpenDetailContainer={onHandleOpenDetailContainer}
              />
              <div style={{ flexGrow: "2" }}>ĐANG PHÁT TRIỂN</div>
            </div>

            <Grid container spacing={4}>
              <FeaturedPost
                key="featured post"
                post={featuredPosts}
                responsiveObj={responsiveObj}
                onHandleOpenDetailContainer={onHandleOpenDetailContainer}
              />
            </Grid>
            <Grid container spacing={5} className={classes.mainGrid}>
              <Main title="Tất cả" />
              <PostGrid
                posts={allPost.data}
                totalRecord={Math.ceil(allPost.totalRecord / 3)}
                isShowPaging={isShowPaging}
                currentPageIndex={currentPageIndex}
                responsiveObj={responsiveObj}
                onHandleOpenDetailContainer={onHandleOpenDetailContainer}
              />
            </Grid>
          </main>
        )}
        {isOpenDetaiContainer && (
          <DetailPost
            post={detailPost}
            showingPost={showingPost}
            isOpenDetaiContainer={isOpenDetaiContainer}
            responsiveObj={responsiveObj}
            loading={isLoadingSubPage}
            onHandleOpenDetailContainer={onHandleOpenDetailContainer}
          />
        )}

        {/*-----------------------------------Nhóm thông báo-----------------------------------------------*/}
      </Container>
      <Footer description="Mọi sao chép nội dung bài viết không ghi rõ nguồn đều vi phạm quyền sở hữu" />
    </React.Fragment>
  );
};

export default enhance(Blog);
