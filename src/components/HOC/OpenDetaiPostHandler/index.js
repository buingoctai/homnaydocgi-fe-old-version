import { connect } from "react-redux";
import { compose, withHandlers, withState, lifecycle } from "recompose";
import { userDataCRUD, isBookMarkedPost } from "../../../utils/utils";

import { asyncGetDetailPost } from "../../../pages/Blog/Store/actions";

const mapStateToProps = (state) => {
  const { blogReducers, topicReducers } = state;

  return window.location.pathname === "/home"
    ? {
        mainPosts: blogReducers.mainPosts,
        featuredPosts: blogReducers.featuredPosts,
        allPost: blogReducers.allPost,
        detailPost: blogReducers.detailPost,
      }
    : {
        detailPost: blogReducers.detailPost,
        allPost: topicReducers.allPost,
      };
};

const mapDispatchToProps = () => {
  return {
    getDetailPostDispatch: (payload) => asyncGetDetailPost(payload),
  };
};

export default compose(
  withState("isOpenDetaiContainer", "setIsOpenDetaiContainer", false),
  withState("showingPost", "setShowingPost", {}),
  withState("isBookMarkedPost", "setIsBookMarkedPost", true),
  withState("isLoadingSubPage", "setIsLoadingSubPage", false),

  connect(mapStateToProps, mapDispatchToProps),
  withHandlers({
    onHandleOpenDetailContainer: (props) => (postId) => {
      const {
        getDetailPostDispatch,
        setIsOpenDetaiContainer,
        setShowingPost,
        setIsLoadingSubPage,
        setIsBookMarkedPost,
        mainPosts,
        featuredPosts,
        allPost,
        isOpenDetaiContainer,
      } = props;

      if (isOpenDetaiContainer) {
        setIsOpenDetaiContainer(false);
      } else {
        const mergedPosts =
          window.location.pathname === "/home"
            ? featuredPosts.data.concat(allPost.data).concat([mainPosts])
            : allPost.data;
        const [detailPost] = mergedPosts.filter((item) => item.Id === postId);

        setIsOpenDetaiContainer(true);
        setIsLoadingSubPage(true);
        setIsBookMarkedPost(isBookMarkedPost(postId));
        getDetailPostDispatch({ id: postId })
          .then(() => {
            setIsLoadingSubPage(false);
          })
          .catch(() => {
            setIsLoadingSubPage(false);
          });
        setShowingPost(detailPost);
      }
    },

    onSaveListPost: (props) => (postId) => {
      const { setIsBookMarkedPost, setPostList } = props;
      const { postList = [] } = userDataCRUD({ action: "GET" });

      setIsBookMarkedPost(true);
      const newPostList = [...postList, postId];
      setPostList(newPostList);
      userDataCRUD({
        action: "EDIT",
        data: { postList: [...newPostList] },
      });
    },
    onUnSaveListPost: (props) => (postId) => {
      const { setIsBookMarkedPost, setPostList } = props;
      const { postList = [] } = userDataCRUD({ action: "GET" });

      setIsBookMarkedPost(false);

      const newPostList = postList.filter((item) => item !== postId);
      setPostList(newPostList);
      userDataCRUD({
        action: "EDIT",
        data: { postList: [...newPostList] },
      });
    },
  }),
  lifecycle({})
);
