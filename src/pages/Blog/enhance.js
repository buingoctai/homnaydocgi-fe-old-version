import { connect } from "react-redux";
import { compose, withHandlers, withState, lifecycle } from "recompose";
import { DEFAULT_TOPIC } from "../../utils/constants";

import {
  asyncGetMainPosts,
  asyncGetFeaturedPosts,
  asyncGetAllPost,
  asyncSuggestSubscribeNotifiByBot,
  asyncGetDetailPost,
  asyncGetAllTopic,
  saveAllPost,
} from "./Store/actions";

const mapStateToProps = (state) => {
  const { blogReducers } = state;

  return {
    mainPosts: blogReducers.mainPosts,
    featuredPosts: blogReducers.featuredPosts,
    allPost: blogReducers.allPost,
    detailPost: blogReducers.detailPost,
    allTopic: blogReducers.allTopic,
  };
};
const mapDispatchToProps = (dispatch) => {
  return {
    getMainPostsDispatch: (payload) => asyncGetMainPosts(payload),
    getFeaturedPostsDispatch: (payload) => asyncGetFeaturedPosts(payload),
    getAllPostDispatch: (payload) => asyncGetAllPost(payload),
    suggestSubscribeNotifiByBotDispatch: (payload) =>
      asyncSuggestSubscribeNotifiByBot(payload),
    saveAllPostDispatch: (payload) => dispatch(saveAllPost(payload)),
    getDetailPostDispatch: (payload) => asyncGetDetailPost(payload),
    getGetAllTopicDispatch: (payload) => asyncGetAllTopic(payload),
  };
};
export default compose(
  withState("userName", "setUserName", ""),
  withState("isLoadingPage", "setIsLoadingPage", false),
  withState("isLoadingSubPage", "setIsLoadingSubPage", false),
  withState("isOpenDetaiContainer", "setIsOpenDetaiContainer", false),
  withState("dialogContent", "setDialogContent", {
    visible: false,
    content: "",
  }),
  withState("showingPost", "setShowingPost", {}),
  withState("currentPageIndex", "setCurrentPageIndex", 1),
  withState("isShowPaging", "setIsShowPaging", true),
  withState("isStopCallApiGetAllPost", "setIsStopCallApiGetAllPost", false),
  withState("isOpenChoseTopic", "setIsOpenChoseTopic", true),
  withState("scrollCount", "setScrollCount", 0),
  withState("isOpenFeedBack", "setIsOpenFeedBack", false),
  connect(mapStateToProps, mapDispatchToProps),
  withHandlers({
    onHandleOpenDetailContainer: (props) => (postId) => {
      const {
        getDetailPostDispatch,
        setIsOpenDetaiContainer,
        setShowingPost,
        setIsLoadingSubPage,
        mainPosts,
        featuredPosts,
        allPost,
        isOpenDetaiContainer,
      } = props;
      let refresh = window.location.protocol + "//" + window.location.host;

      if (isOpenDetaiContainer) {
        refresh = refresh + "/home";
        setIsOpenDetaiContainer(!isOpenDetaiContainer);
        window.history.pushState({ path: refresh }, "", refresh);
      } else {
        const mergedPosts = featuredPosts.data
          .concat(allPost.data)
          .concat([mainPosts]);
        const [detailPost] = mergedPosts.filter((item) => item.Id === postId);
        const find = " ";
        const re = new RegExp(find, "g");
        const titleUrl = detailPost.Title.replace(re, "-");
        refresh = refresh + `/home/${titleUrl}`;

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
    onHandleScrollToBottom: (props) => () => {
      const {
        getAllPostDispatch,
        saveAllPostDispatch,
        setCurrentPageIndex,
        setIsShowPaging,
        setIsStopCallApiGetAllPost,
        allPost,
        currentPageIndex,
        isStopCallApiGetAllPost,
      } = props;

      if (isStopCallApiGetAllPost || !allPost.data.length) return;

      setIsShowPaging(false);
      getAllPostDispatch({
        paging: { pageIndex: currentPageIndex + 1, pageSize: 3 },
        orderList: { orderBy: "SubmitDate", orderType: "DESC" },
      })
        .then((response) => {
          setTimeout(() => setIsShowPaging(true), 4000);

          if (!response.data.length) {
            setIsStopCallApiGetAllPost(true);
            return;
          }
          setCurrentPageIndex(currentPageIndex + 1);

          saveAllPostDispatch({
            ...allPost,
            data: [...allPost.data.concat(response.data)],
            totalRecord: allPost.totalRecord,
          });
        })
        .catch(() => {
          setIsShowPaging(true);
        });
    },
    onGetFeaturedTopic: (props) => (selectedTopics, name) => {
      const { getFeaturedPostsDispatch, setUserName } = props;
      setUserName(name);
      getFeaturedPostsDispatch({
        featuredLabels: [...selectedTopics],
      })
        .then(() => {
          const savedData = { topic: [...selectedTopics], name: name };
          localStorage.setItem("userData", JSON.stringify(savedData));
        })
        .catch(() => {});
    },
    onSubmitFeedBack: (props) => (feedback) => {
      const {
        userName,
        suggestSubscribeNotifiByBotDispatch,
        setIsOpenFeedBack,
        setScrollCount,
      } = props;
      setIsOpenFeedBack(false);

      if (feedback) {
        suggestSubscribeNotifiByBotDispatch({
          id_msg_user: "",
          message: `${userName}: ${feedback}`,
        })
          .then(({ message }) => {})
          .catch(() => {});
      } else {
        setScrollCount(0);
      }
    },
  }),
  withHandlers({
    onScroll: (props) => () => {
      // Tính năng tạm thời
      const { scrollCount, setScrollCount, setIsOpenFeedBack } = props;
      const count = scrollCount + 1;
      const { onHandleScrollToBottom } = props;
      // Khoảng cách từ đỉnh scroll bar đến đỉnh của browser
      const scrollTop = document.documentElement.scrollTop;
      // Toàn bộ height của 1 element(đó là toàn bộ quảng đường scroll)
      const realHeight = document.documentElement.offsetHeight;
      // Height khi scroll (scrollTop thay đổi liên tục)
      const heightOnSroll = scrollTop + window.innerHeight;

      if (count === 200) {
        setIsOpenFeedBack(true);
      }
      setScrollCount(count);
      if (heightOnSroll >= realHeight - 100 && scrollTop) {
        onHandleScrollToBottom();
      }
    },
  }),
  lifecycle({
    componentDidMount() {
      window.addEventListener("scroll", this.props.onScroll);
      const {
        currentPageIndex,
        getMainPostsDispatch,
        getFeaturedPostsDispatch,
        getAllPostDispatch,
        getGetAllTopicDispatch,
        setIsLoadingPage,
        setIsOpenChoseTopic,
        saveAllPostDispatch,
        setUserName,
      } = this.props;
      const userData = JSON.parse(localStorage.getItem("userData"));

      setIsLoadingPage(true);
      getMainPostsDispatch();
      if (userData) {
        const { topic, name } = userData;
        setUserName(name);
        setIsOpenChoseTopic(false);
        getFeaturedPostsDispatch({
          featuredLabels: [...topic],
        });
      } else {
        getFeaturedPostsDispatch({
          featuredLabels: [...DEFAULT_TOPIC],
        })
          .then(() => {
            getGetAllTopicDispatch();
          })
          .catch(() => {});
      }

      getAllPostDispatch({
        paging: { pageIndex: currentPageIndex, pageSize: 3 },
        orderList: { orderBy: "SubmitDate", orderType: "DESC" },
      })
        .then((response) => {
          saveAllPostDispatch(response);
          setIsLoadingPage(false);
        })
        .catch(() => {
          setIsLoadingPage(false);
        });
    },
    componentWillUnmount() {
      window.removeEventListener("scroll", this.props.onScroll);
    },
  })
);
