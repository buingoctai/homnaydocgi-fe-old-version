import React from "react";
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
  const classes = useStyles();

  const {
    isAdmin,
    isLoadingPage,
    isOpenDetaiContainer,
    isSubscribeNotifiBot,
    isSuggestSendArticle,
    isNavigateSubmitPageNotifi,
    isShowPaging,
    currentUser,
    currentPageIndex,
    showingPost,
    mainPosts,
    featuredPosts,
    allPost,
    onHandleNavigateAdminPage,
    onHandleSubscribeNotifiByBot,
    onHandleSuggestSendArticle,
    onHandleOpenDetailContainer,
  } = props;

  return (
    <React.Fragment>
      <CssBaseline />
      <Container style={{ width: "90%" }}>
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
            <span className={classes.loadingMessage}>
              Đang tải bài viết. Vui lòng đợi!
            </span>
            <LinearProgress
              color="primary"
              style={{ height: "3px", width: "30%" }}
            />
          </div>
        )}
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
                onHandleOpenDetailContainer={onHandleOpenDetailContainer}
              />
              <div style={{ flexGrow: "2" }}>ĐANG PHÁT TRIỂN</div>
            </div>

            <Grid container spacing={4}>
              <FeaturedPost
                key="featured post"
                post={featuredPosts}
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
                onHandleOpenDetailContainer={onHandleOpenDetailContainer}
              />
            </Grid>
          </main>
        )}
        {isOpenDetaiContainer && (
          <DetailPost
            post={showingPost}
            isOpenDetaiContainer={isOpenDetaiContainer}
            onHandleOpenDetailContainer={onHandleOpenDetailContainer}
          />
        )}

        {/*-----------------------------------Nhóm thông báo-----------------------------------------------*/}
        {isNavigateSubmitPageNotifi && (
          <DraggableDialog
            dialogContent="Để có trải nghiệm tốt nhất, vui lòng cung cấp thông tin cần thiết!"
            showTime={100}
          />
        )}
        {isAdmin && (
          <DraggableDialog
            dialogContent="Bạn là admin. Hệ thống đang chuyển sang trang quản lý bài viết."
            showTime={3000}
          />
        )}
        {isSubscribeNotifiBot && (
          <DraggableDialog
            dialogContent="Tính năng gửi thông báo qua messenger bot đang phát triển."
            showTime={3000}
          />
        )}
        {isSuggestSendArticle && (
          <DraggableDialog
            dialogContent="Tính năng đề nghị gửi bài viết đang phát triển.."
            showTime={3000}
          />
        )}
      </Container>
      <Footer description="Mọi sao chép nội dung bài viết không ghi rõ nguồn đều vi phạm quyền sở hữu" />
    </React.Fragment>
  );
};

export default enhance(Blog);
