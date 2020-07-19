import { connect } from "react-redux";
import { compose, withHandlers, withState, lifecycle } from "recompose";
import OpenDetaiPostHandler from "../../components/HOC/OpenDetaiPostHandler";
import UserDataHandler from "../../components/HOC/UserDataHandler";

import { userDataCRUD } from "../../utils/utils";
import {
  asyncGetAllPost,
  asyncSearchArticles,
  asyncGetSavedPosts,
} from "./Store/actions";

const mapDispatchToProps = () => {
  return {
    getAllPostDispatch: (payload) => asyncGetAllPost(payload),
    searchArticlesDispatch: (payload) => asyncSearchArticles(payload),
    getSavedPostsDispatch: (payload) => asyncGetSavedPosts(payload),
  };
};
export default compose(
  UserDataHandler,
  OpenDetaiPostHandler,
  withState("searchingTxt", "setSearchingTxt", ""),
  withState("isShowPaging", "setIsShowPaging", true),
  connect(null, mapDispatchToProps),
  withHandlers({
    onSearchArticle: (props) => (searchTxt) => {
      const {
        searchArticlesDispatch,
        setSearchingTxt,
        setIsSavedPostsStatus,
      } = props;

      setIsSavedPostsStatus(false);
      setSearchingTxt(searchTxt);
      searchArticlesDispatch({
        searchTxt,
      });
    },
  }),
  lifecycle({
    componentDidMount() {
      window.removeEventListener("scroll", this.onScroll, false);
      const { name = "", postList = [] } = userDataCRUD({ action: "GET" });

      this.props.setUserName(name);
      this.props.setPostList([...postList]);

      if (!this.props.location.searchTxt && !this.props.location.topic) {
        if (postList.length === 0) {
          window.location.href = `${process.env.REACT_APP_URL}/home`;
          return;
        }
        this.props.setIsSavedPostsStatus(true);
        this.props.getSavedPostsDispatch({ listId: [...postList] });
        return;
      }

      if (this.props.location.searchTxt) {
        this.props.setSearchingTxt(this.props.location.searchTxt);
        this.props.searchArticlesDispatch({
          searchTxt: this.props.location.searchTxt,
        });
      }

      if (this.props.location.topic) {
        this.props.setSearchingTxt(this.props.location.topic);
        this.props.getAllPostDispatch({ topicName: this.props.location.topic });
      }
    },
  })
);
