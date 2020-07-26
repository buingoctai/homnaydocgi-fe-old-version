import React from "react";
import useMediaQuery from "@material-ui/core/useMediaQuery";
import { makeStyles } from "@material-ui/core/styles";
import CssBaseline from "@material-ui/core/CssBaseline";
import Grid from "@material-ui/core/Grid";
import Container from "@material-ui/core/Container";
import LinearProgress from "@material-ui/core/LinearProgress";

import TopicOption from "./components/TopicOption";
import Header from "../../components/Header";
import MainFeaturedPost from "./PostWrap/MainFeaturedPost";
import FeaturedPost from "./PostWrap/FeaturedPost";
import DetailPost from "../../components/DetailPost";
import Main from "../../components/Main";
import Footer from "../../components/Footer";
import PostGrid from "../../components/PostGrid";
import FeedBack from "./components/FeedBack";


import AuthorPost from "./PostWrap/AuthorPost";
import AuthorPost from "./PostWrap/AuthorPost";
import enhance from "./enhance";

const useStyles = makeStyles((theme) => ({
  container: {
    width: "90%",
    paddingLeft: (props) => (props.is_maxWidth_500px ? "0px" : "none"),
    paddingRight: (props) => (props.is_maxWidth_500px ? "0px" : "none"),
  },
  featuredContent: {},
  featureGrid: {
    width: (props) => (props.is_maxWidth_500px ? "100%" : "50%"),
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
  } = props;

  const {
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
    onClickAskUserPermission,
    _onClickSusbribeToReceiveNotification
  } = props;
  const classes = useStyles({ ...responsiveObj });

  const authorData = {
    imageList: [
      "https://scontent.fsgn5-5.fna.fbcdn.net/v/t1.0-9/91651356_10221659159173576_3247397447923662848_o.jpg?_nc_cat=100&_nc_sid=174925&_nc_ohc=pp_EiaNhDC0AX_EUZ74&_nc_ht=scontent.fsgn5-5.fna&oh=4e857736da7d671473062711d27258cc&oe=5F274795",
      "https://scontent.fdad3-3.fna.fbcdn.net/v/t1.0-9/26230148_10214748987063592_8377186319034611906_n.jpg?_nc_cat=111&_nc_sid=8bfeb9&_nc_ohc=uvu6Qu3c240AX_Osvq-&_nc_ht=scontent.fdad3-3.fna&oh=aed9cb0f661f270fe165ed60fff689e1&oe=5F2612A3",
    ],
    infor: [
      {
        name: "Tuan Nguyen",
        description: "CTO tại VCCORP",
        image:
          "https://scontent-hkt1-1.xx.fbcdn.net/v/t1.0-9/38149369_10216412207723069_415017780664860672_n.jpg?_nc_cat=107&_nc_sid=a4a2d7&_nc_ohc=SNk8DlYsadEAX_xbwhD&_nc_ht=scontent-hkt1-1.xx&oh=cc84562c81babdbcbd4c91a35899e995&oe=5F2E649E",
      },
      {
        name: "Nguyen Phi Van",
        description: "Board Advisor at Austria-Vietnam Innovation Council",
        image:
          "https://scontent-hkt1-1.xx.fbcdn.net/v/t1.0-9/106505010_1405071963215891_7426207842881977826_o.jpg?_nc_cat=110&_nc_sid=09cbfe&_nc_ohc=OYaMfoVH8J8AX83AUDz&_nc_ht=scontent-hkt1-1.xx&oh=8ed8aa8efaae51e21548cca0e50e9790&oe=5F2CF107",
      },
      {
        name: "David Trieu",
        description:
          "Project Director tại Hệ Sinh Thái Khởi Nghiệp IoT Việt Nam",
        image:
          "https://scontent-hkt1-1.xx.fbcdn.net/v/t31.0-8/20900824_1147057698772455_2980176105139356507_o.jpg?_nc_cat=108&_nc_sid=09cbfe&_nc_ohc=Nv4zjWZ7IXkAX-STMvm&_nc_ht=scontent-hkt1-1.xx&oh=cf42e18bcef0fbc41a64a3de75620206&oe=5F2B2C7C",
      },
    ],
  };

  const authorList = {
    image: [
      "https://uploads-ssl.webflow.com/5be2baf97a00671aef1118cd/5e31a33d94b1c0d5e4b58f99_belle%20buzzwords.png",
      "https://www.intheblack.com/-/media/intheblack/allimages/workplace/2016/business-buzzwords.jpg?h=476&la=en&mw=806&w=806&rev=c39bd5246fcd4ded832348c5b8b591ad",
      "https://miro.medium.com/max/3000/1*z_tMP7UnBamSyDkB1rav3Q.png",
    ],
    author: [...authorData.infor],
  };
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
          onClickSusbribeToPushNotification={onClickSusbribeToPushNotification}
          onClickSendSubscriptionToPushServer={
            onClickSendSubscriptionToPushServer
          }
          onClickSendNotification={onClickSendNotification}

          _onClickSusbribeToReceiveNotification={onClickAskUserPermission}
          _onClickSusbribeToPushNotification={onClickSusbribeToPushNotification}
          _onClickSendSubscriptionToPushServer={onClickSendSubscriptionToPushServer}
          _onClickSendNotification={onClickSendNotification}
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

        {TopicOption({
          visible: isOpenChoseTopic,
          setIsOpenChoseTopic: setIsOpenChoseTopic,
          allTopic: allTopic,
          onGetFeaturedTopic: onGetFeaturedTopic,
        })}

        {FeedBack({
          visible: isOpenFeedBack,
          onSubmitFeedBack: onSubmitFeedBack,
        })}
 
        {!isLoadingPage && (
          <main>
            <div
              style={{
                display: "flex",
                flexDirection: "row",
                padding: "20px 0",
                height: "230px",
                maxHeight: "235px",
                marginBottom: "1%",
              }}
            >
              <MainFeaturedPost
                post={mainPosts}
                responsiveObj={responsiveObj}
                onHandleOpenDetailContainer={onHandleOpenDetailContainer}
              />
              {!responsiveObj.is_maxWidth_500px && (
                <AuthorPost
                  type="image"
                  title="Từ khóa hot"
                  data={authorList.image}
                  navigateTime={3000}
                  responsiveObj={responsiveObj}
                />
              )}
              {!responsiveObj.is_maxWidth_500px && (
                <AuthorPost
                  type="infor"
                  title="Chuyên gia"
                  data={authorList.author}
                  navigateTime={3000}
                  responsiveObj={responsiveObj}
                />
              )}
            </div>
            <div className={classes.featuredContent}>
              <Grid container spacing={4} className={classes.featureGrid}>
                <FeaturedPost
                  key="featured post"
                  post={featuredPosts}
                  responsiveObj={responsiveObj}
                  onHandleOpenDetailContainer={onHandleOpenDetailContainer}
                />
              </Grid>
              <div className={classes.developing}>ĐANG PHÁT TRIỂN</div>
            </div>

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
