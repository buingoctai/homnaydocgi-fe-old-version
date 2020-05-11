import React from "react";
import useMediaQuery from "@material-ui/core/useMediaQuery";
import Container from "@material-ui/core/Container";
import CssBaseline from "@material-ui/core/CssBaseline";
import { makeStyles } from "@material-ui/core/styles";

import Header from "../../components/Header";
import PostGrid from "../../components/PostGrid";
import Main from "../../components/Main";
import Footer from "../../components/Footer";
import DetailPost from "../../components/DetailPost";

import { translatePostGroupTitle } from "../../utils/utils";
import enhance from "./enhance";

const useStyles = makeStyles((theme) => ({
  container: {
    width: "90%",
    paddingLeft: (props) => (props.is_maxWidth_500px ? "0px" : "none"),
    paddingRight: (props) => (props.is_maxWidth_500px ? "0px" : "none"),
  },
}));

const Topic = (props) => {
  const { topic, searchTxt } = props.location;
  const {
    userName,
    searchingTxt,
    allPost,
    isShowPaging,
    detailPost,
    isOpenDetaiContainer,
    showingPost,
    isLoadingSubPage,
    onHandleOpenDetailContainer,
    onSearchArticle,
  } = props;
  const responsiveObj = {
    is_maxWidth_500px: useMediaQuery("(max-width:500px)"),
    is_maxWidth_1000px: useMediaQuery("(max-width:1000px)"),
    is_minWidth_2000px: useMediaQuery("(min-width:2000px)"),
  };
  const classes = useStyles({ ...responsiveObj });

  return (
    <React.Fragment>
      <CssBaseline />
      <Container className={classes.container}>
        <Header
          title="HÔM NAY ĐỌC GÌ?"
          currentUser={userName}
          searchTxtOnHomePage={searchTxt}
          onSearchArticle={onSearchArticle}
        />
        <div style={{ marginTop: "70px" }} />
        <Main
          title={
            searchingTxt
              ? `Tất cả bài viết chứa ký tự '${translatePostGroupTitle(
                  searchingTxt
                )}'`
              : `Tất cả bài viết ${translatePostGroupTitle(topic)}`
          }
        />
        <PostGrid
          posts={allPost.data}
          responsiveObj={responsiveObj}
          isShowPaging={isShowPaging}
          totalRecord={Math.ceil(allPost.data.length / 3)}
          onHandleOpenDetailContainer={onHandleOpenDetailContainer}
        />
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
      </Container>
      <Footer description="Mọi sao chép nội dung bài viết không ghi rõ nguồn đều vi phạm quyền sở hữu" />
    </React.Fragment>
  );
};

export default enhance(Topic);
