import { connect } from "react-redux";
import { compose, withHandlers, withState, lifecycle } from "recompose";

import { asyncGetDetailPost } from "../../pages/Blog/Store/actions";
import { asyncGetAllPost, asyncSearchArticles } from "./Store/actions";

const mapStateToProps = (state) => {
  const { topicReducers, blogReducers } = state;
  return {
    allPost: topicReducers.allPost,
    detailPost: blogReducers.detailPost,
  };
};
const mapDispatchToProps = (dispatch) => {
  return {
    getAllPostDispatch: (payload) => asyncGetAllPost(payload),
    getDetailPostDispatch: (payload) => asyncGetDetailPost(payload),
    searchArticlesDispatch: (payload) => asyncSearchArticles(payload),
  };
};
export default compose(
  withState("userName", "setUserName", ""),
  withState("searchingTxt", "setSearchingTxt", ""),
  withState("isShowPaging", "setIsShowPaging", true),
  withState("isLoadingSubPage", "setIsLoadingSubPage", false),
  withState("isOpenDetaiContainer", "setIsOpenDetaiContainer", false),
  withState("showingPost", "setShowingPost", {}),
  connect(mapStateToProps, mapDispatchToProps),
  withHandlers({
    onHandleOpenDetailContainer: (props) => (postId) => {
      const {
        getDetailPostDispatch,
        setIsOpenDetaiContainer,
        setShowingPost,
        setIsLoadingSubPage,
        allPost,
        isOpenDetaiContainer,
      } = props;
      let refresh = window.location.protocol + "//" + window.location.host;

      if (isOpenDetaiContainer) {
        refresh = refresh + "/home/topic";
        setIsOpenDetaiContainer(!isOpenDetaiContainer);
        window.history.pushState({ path: refresh }, "", refresh);
      } else {
        const mergedPosts = allPost.data;
        const [detailPost] = mergedPosts.filter((item) => item.Id === postId);
        const find = " ";
        const re = new RegExp(find, "g");
        const titleUrl = detailPost.Title.replace(re, "-");
        refresh = refresh + `/home/topic/${titleUrl}`;

        setIsLoadingSubPage(true);
        getDetailPostDispatch({ id: postId })
          .then(() => {
            setIsLoadingSubPage(false);
          })
          .catch(() => {
            setIsLoadingSubPage(false);
          });
        window.history.pushState({ path: refresh }, "", refresh);
        setShowingPost(detailPost);
        setIsOpenDetaiContainer(!isOpenDetaiContainer);
      }
    },
    onSearchArticle: (props) => (searchTxt) => {
      const { searchArticlesDispatch, setSearchingTxt } = props;
      setSearchingTxt(searchTxt);
      searchArticlesDispatch({
        searchTxt,
      });
    },
  }),
  lifecycle({
    componentDidMount() {
      window.removeEventListener("scroll", this.onScroll, false);

      if (!this.props.location.topic) {
        window.location.href = `${process.env.REACT_APP_URL}/home`;
      }

      const userData = JSON.parse(localStorage.getItem("userData"));
      if (userData) {
        const { name } = userData;
        this.props.setUserName(name);
      }
      if (this.props.location.searchTxt) {
      } else {
      }
      if (this.props.location.searchTxt) {
        this.props.setSearchingTxt(this.props.location.searchTxt);
        this.props.searchArticlesDispatch({
          searchTxt: this.props.location.searchTxt,
        });
      } else {
        this.props.getAllPostDispatch({ topicName: this.props.location.topic });
      }
    },
  })
);
