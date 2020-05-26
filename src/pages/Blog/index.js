import React from "react";
import useMediaQuery from "@material-ui/core/useMediaQuery";
import { makeStyles } from "@material-ui/core/styles";
import CssBaseline from "@material-ui/core/CssBaseline";
import Grid from "@material-ui/core/Grid";
import Container from "@material-ui/core/Container";
import LinearProgress from "@material-ui/core/LinearProgress";

import DraggableDialog from "../../components/Dialog";
import TopicOption from "./components/TopicOption";
import Header from "../../components/Header";
import MainFeaturedPost from "./PostWrap/MainFeaturedPost";
import FeaturedPost from "./PostWrap/FeaturedPost";
import DetailPost from "../../components/DetailPost";
import Main from "../../components/Main";
import Footer from "../../components/Footer";
import PostGrid from "../../components/PostGrid";
import FeedBack from "./components/FeedBack";
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

const Blog = (props) => {
  const responsiveObj = {
    is_maxWidth_500px: useMediaQuery("(max-width:500px)"),
    is_maxWidth_1000px: useMediaQuery("(max-width:1000px)"),
    is_minWidth_2000px: useMediaQuery("(min-width:2000px)"),
  };
  const {
    isOpenFeedBack,
    isOpenChoseTopic,
    setIsOpenChoseTopic,
    isLoadingPage,
    isLoadingSubPage,
    isOpenDetaiContainer,
    isShowPaging,
    allTopic,
    userName,
    currentPageIndex,
    detailPost,
    showingPost,
    mainPosts,
    featuredPosts,
    allPost,
    dialogContent } = props;

  const {
    setDialogContent,
    onHandleNavigateAdminPage,
    onHandleSubscribeNotifiByBot,
    onHandleSuggestSendArticle,
    onClickSusbribeToPushNotification,
    onClickSendSubscriptionToPushServer,
    onClickSendNotification,
    onHandleOpenDetailContainer,
    onGetFeaturedTopic,
    onSearchArticle,
    onSubmitFeedBack,
    // Push Notification
    onClickAskUserPermission
  } = props;
  const classes = useStyles({ ...responsiveObj });

  return (
    <React.Fragment>
      <CssBaseline />
      <Container className={classes.container}>
        <Header
          title="HÔM NAY ĐỌC GÌ?"
          currentUser={userName}
          onHandleNavigateAdminPage={onHandleNavigateAdminPage}
          // onHandleSubscribeNotifiByBot={onHandleSubscribeNotifiByBot}
          // onHandleSuggestSendArticle={onHandleSuggestSendArticle}
          onSearchArticle={onSearchArticle}
          // Push Notification
          onHandleSubscribeNotifiByBot={onClickAskUserPermission}
          onHandleSuggestSendArticle={onClickSusbribeToPushNotification}
          onClickSendSubscriptionToPushServer={onClickSendSubscriptionToPushServer}
          onClickSendNotification={onClickSendNotification}
        />
        {isLoadingPage && (
          <div className={classes.totalContentLoadingWrap}>
            <span className={classes.loadingMessage}>Đang tải bài viết</span>
            <LinearProgress
              color="primary"
              style={{ height: "3px", width: "20%" }}
            />
          </div>
        )}
        {/* {DraggableDialog({
          ...dialogContent,
          setDialogContent: setDialogContent,
        })} */}

        {TopicOption({
          visible: isOpenChoseTopic,
          setIsOpenChoseTopic: setIsOpenChoseTopic,
          allTopic: allTopic,
          onGetFeaturedTopic: onGetFeaturedTopic,
        })}

        {/* {FeedBack({
          visible: isOpenFeedBack,
          onSubmitFeedBack: onSubmitFeedBack,
        })} */}

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
              <div style={{ flexGrow: "2" }} />
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
