import React from "react";
import useMediaQuery from "@material-ui/core/useMediaQuery";
import { makeStyles } from "@material-ui/core/styles";
import CssBaseline from "@material-ui/core/CssBaseline";
import Grid from "@material-ui/core/Grid";
import Container from "@material-ui/core/Container";
import ScalingSquaresSpinner from '@bit/bondz.react-epic-spinners.scaling-squares-spinner';

import NotificationDivider from "../../components/NotificationDivider";
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
import { AUTHOR_LIST } from "../../utils/constants";
import { Chart } from '@bit/primefaces.primereact.chart';
import enhance from "./enhance";


const useStyles = makeStyles((theme) => ({
  container: {
    position: "relative",
    width: "90%",
    paddingLeft: (props) => (props.is_maxWidth_500px ? "0px" : "none"),
    paddingRight: (props) => (props.is_maxWidth_500px ? "0px" : "none"),
  },
  main: {
    display: "flex",
    flexDirection: "row",
    padding: "20px 0",
    height: "230px",
    maxHeight: "235px",
    marginBottom: "1%",
  },
  featuredContent: {
    display: 'flex'
  },

  featureGrid: {
    // width: (props) => (props.is_maxWidth_500px ? "100%" : "50%"),
    // width: "100%",
    "@global": {
      ".MuiGrid-item": {
        padding: "0px 16px 0px 0px",
      },
    },
  },
  width1Col: {
    width: "50%"
  },
  width2Col: {
    // width: "100%"
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
    isOpenNotification,
    isOpenFeedBack,
    isOpenChoseTopic,
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
    isBookMarkedPost,
    postList,
  } = props;

  const {
    onHandleOpenDetailContainer,
    onGetFeaturedTopic,
    onSubmitFeedBack,
    onSaveListPost,
    onUnSaveListPost,
    setIsOpenNotification,
    setIsOpenChoseTopic,
    setIsOpenFeedBack,
  } = props;

  const { _onClickSusbribeToPushNotification, _onClickSendSubscriptionToServer, _onClickSendNotification } = props;

  const data = {
    labels: ['Kiến thức chuyên môn', 'Kiến thức ngoài chuyên môn', 'Kỹ năng mềm'],
    datasets: [
      {
        data: [500, 300, 100],
        backgroundColor: ['#FF6384', '#36A2EB', '#FFCE56'],
        hoverBackgroundColor: ['#FF6384', '#36A2EB', '#FFCE56']
      }
    ]
  };

  const classes = useStyles({ ...responsiveObj });

  return (
    <React.Fragment>
      <CssBaseline />
      <Container className={classes.container}>
        <Header
          title="HÔM NAY ĐỌC GÌ?"
          currentUser={userName}
          postList={postList}
          setIsOpenNotification={setIsOpenNotification}
          isOpenNotification={isOpenNotification}
          _onClickSusbribeToPushNotification={_onClickSusbribeToPushNotification}
          // _onClickSendSubscriptionToServer={_onClickSendSubscriptionToServer}
          _onClickSendNotification={_onClickSendNotification}
        />
        {isLoadingPage && (
          <div className={classes.totalContentLoadingWrap}>
            <ScalingSquaresSpinner
              color='#000000'
              size='100'
            />
          </div>
        )}

        {isOpenNotification && (
          <NotificationDivider
            setIsOpenChoseTopic={setIsOpenChoseTopic}
            setIsOpenFeedBack={setIsOpenFeedBack}
            _onClickSusbribeToPushNotification={_onClickSusbribeToPushNotification}
          />
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
            <div className={classes.main}>
              <MainFeaturedPost
                post={mainPosts}
                responsiveObj={responsiveObj}
                onHandleOpenDetailContainer={onHandleOpenDetailContainer}
              />
              {!responsiveObj.is_maxWidth_500px && (
                <AuthorPost
                  type="image"
                  title="Từ khóa hot"
                  data={AUTHOR_LIST.image}
                  navigateTime={3000}
                  responsiveObj={responsiveObj}
                />
              )}
              {!responsiveObj.is_maxWidth_500px && (
                <AuthorPost
                  type="infor"
                  title="Chuyên gia"
                  data={AUTHOR_LIST.author}
                  navigateTime={1500}
                  responsiveObj={responsiveObj}
                />
              )}
            </div>
            {/* <div className={classes.featuredContent}>

              <Grid container spacing={4} className={`${classes.featureGrid} ${classes.width1Col}`}>
                <FeaturedPost
                  key="featured post"
                  post={featuredPosts}
                  responsiveObj={responsiveObj}
                  onHandleOpenDetailContainer={onHandleOpenDetailContainer}
                  widthCol={12}
                />
              </Grid>
              <div className={classes.developing}>
                <div style={{ width: 400 }}>
                  <Chart type='pie' data={data} />
                </div>
              </div>
            </div> */}

            <div className={classes.featuredContent}>
              <Grid container spacing={4} className={`${classes.featureGrid} ${classes.width2Col}`}>
                <FeaturedPost
                  key="featured post"
                  post={featuredPosts}
                  responsiveObj={responsiveObj}
                  onHandleOpenDetailContainer={onHandleOpenDetailContainer}
                  widthCol={6}
                />
              </Grid>
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
            isBookMarkedPost={isBookMarkedPost}
            onHandleOpenDetailContainer={onHandleOpenDetailContainer}
            onSaveListPost={onSaveListPost}
            onUnSaveListPost={onUnSaveListPost}
          />
        )}

        {/*-----------------------------------Nhóm thông báo-----------------------------------------------*/}
      </Container>
      <Footer description="Mọi sao chép nội dung bài viết không ghi rõ nguồn đều vi phạm quyền sở hữu" />
    </React.Fragment>
  );
};
export default enhance(Blog);
