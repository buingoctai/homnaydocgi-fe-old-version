import React, { useEffect, useState } from "react";
import { connect } from "react-redux";

import { makeStyles } from "@material-ui/core/styles";
import CssBaseline from "@material-ui/core/CssBaseline";
import Grid from "@material-ui/core/Grid";
import Container from "@material-ui/core/Container";
import GitHubIcon from "@material-ui/icons/GitHub";
import FacebookIcon from "@material-ui/icons/Facebook";
import TwitterIcon from "@material-ui/icons/Twitter";
import LinearProgress from "@material-ui/core/LinearProgress";

import DraggableDialog from "../../components/Dialog";
import Header from "./Header";
import MainFeaturedPost from "./PostWrap/MainFeaturedPost";
import FeaturedPost from "./PostWrap/FeaturedPost";
import DetailPost from "./PostWrap/DetailPost";
import Main from "./Main";
import SideBar from "./SideBar";
import Footer from "./Footer";

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

const posts = ["post1", "post2", "post3"];

const sidebar = {
  title: "About",
  description:
    "Etiam porta sem malesuada magna mollis euismod. Cras mattis consectetur purus sit amet fermentum. Aenean lacinia bibendum nulla sed consectetur.",
  archives: [
    { title: "March 2020", url: "#" },
    { title: "February 2020", url: "#" },
    { title: "January 2020", url: "#" },
    { title: "November 1999", url: "#" },
    { title: "October 1999", url: "#" },
    { title: "September 1999", url: "#" },
    { title: "August 1999", url: "#" },
    { title: "July 1999", url: "#" },
    { title: "June 1999", url: "#" },
    { title: "May 1999", url: "#" },
    { title: "April 1999", url: "#" },
  ],
  social: [
    { name: "GitHub", icon: GitHubIcon },
    { name: "Twitter", icon: TwitterIcon },
    { name: "Facebook", icon: FacebookIcon },
  ],
};

const Blog = (props) => {
  const classes = useStyles();
  const {
    isAdmin,
    isLoadingPage,
    isOpenDetaiContainer,
    isSubscribeNotifiBot,
    isSuggestSendArticle,
    isNavigateSubmitPageNotifi,
    currentUser,
    showingPost,
    mainPosts,
    featuredPosts,
    onHandleNavigateAdminPage,
    onHandleSubscribeNotifiByBot,
    onHandleSuggestSendArticle,
    onHandleOpenDetailContainer,
  } = props;

  return (
    <React.Fragment>
      <CssBaseline />
      <Container maxWidth="false">
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
            <LinearProgress color="primary" style={{ height: "3px" }} />
          </div>
        )}
        {!isLoadingPage && (
          <main>
            <MainFeaturedPost
              post={mainPosts}
              onHandleOpenDetailContainer={onHandleOpenDetailContainer}
            />
            <Grid container spacing={4}>
              {featuredPosts.data &&
                featuredPosts.data.map((post) => (
                  <FeaturedPost
                    key={post.Title}
                    post={post}
                    onHandleOpenDetailContainer={onHandleOpenDetailContainer}
                  />
                ))}
            </Grid>
            <Grid container spacing={5} className={classes.mainGrid}>
              <Main title="Tất cả bài viết" posts={posts} />
              <SideBar
                title={sidebar.title}
                description={sidebar.description}
                archives={sidebar.archives}
                social={sidebar.social}
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

        {isNavigateSubmitPageNotifi && (
          <DraggableDialog
            dialogContent="Để có trải nghiệm tốt nhất, vui lòng cung cấp thông tin cần thiết!"
            showTime={3000}
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
