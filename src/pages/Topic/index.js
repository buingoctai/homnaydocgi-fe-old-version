import React from "react";
import useMediaQuery from "@material-ui/core/useMediaQuery";
import Container from "@material-ui/core/Container";
import CssBaseline from "@material-ui/core/CssBaseline";
import { makeStyles } from "@material-ui/core/styles";

import Header from "../../components/Header";
import PostGrid from "../../components/PostGrid";
import Main from "../../components/Main";
import Footer from "../../components/Footer";
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
  const { topic } = props.location;
  const { allPost, isShowPaging } = props;
  const classes = useStyles();
  const responsiveObj = {
    is_maxWidth_500px: useMediaQuery("(max-width:500px)"),
    is_maxWidth_1000px: useMediaQuery("(max-width:1000px)"),
    is_minWidth_2000px: useMediaQuery("(min-width:2000px)"),
  };
  return (
    <React.Fragment>
      <CssBaseline />
      <Container className={classes.container}>
        <Header title="HÔM NAY ĐỌC GÌ?" />
        <Main title={`Tất cả bài viết ${translatePostGroupTitle(topic)}`} />
        <PostGrid
          posts={allPost.data}
          responsiveObj={responsiveObj}
          isShowPaging={isShowPaging}
          totalRecord={Math.ceil(allPost.data.length / 3)}
        />
      </Container>
      <Footer description="Mọi sao chép nội dung bài viết không ghi rõ nguồn đều vi phạm quyền sở hữu" />
    </React.Fragment>
  );
};

export default enhance(Topic);
