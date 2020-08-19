import { connect } from "react-redux";
import { compose, withHandlers, withState, lifecycle } from "recompose";
import { DEFAULT_TOPIC } from "../../utils/constants";
import { userDataCRUD } from "../../utils/utils";
import OpenDetaiPostHandler from "../../components/HOC/OpenDetaiPostHandler";
import UserDataHandler from "../../components/HOC/UserDataHandler";
import * as serviceWorker from "../../serviceWorker";
import {
  asyncGetMainPosts,
  asyncGetFeaturedPosts,
  asyncGetAllPost,
  asyncSuggestSubscribeNotifiByBot,
  asyncGetAllTopic,
  asyncSubscribePage,
  asyncUnSubscribePage,
  saveAllPost,
} from "./Store/actions";

const mapStateToProps = (state) => {
  const { blogReducers } = state;

  return {
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
    getGetAllTopicDispatch: (payload) => asyncGetAllTopic(payload),
    subscribePageDispatch: (payload) => asyncSubscribePage(payload),
    unSubscribePageDispatch: (payload) => asyncUnSubscribePage(payload),
  };
};
export default compose(
  UserDataHandler,
  OpenDetaiPostHandler,
  withState("isLoadingPage", "setIsLoadingPage", false),
  withState("dialogContent", "setDialogContent", {
    visible: false,
    content: "",
  }),
  withState("currentPageIndex", "setCurrentPageIndex", 1),
  withState("isShowPaging", "setIsShowPaging", true),
  withState("isStopCallApiGetAllPost", "setIsStopCallApiGetAllPost", false),
  withState("isOpenChoseTopic", "setIsOpenChoseTopic", false),
  withState("scrollCount", "setScrollCount", 0),
  withState("isOpenFeedBack", "setIsOpenFeedBack", false),
  withState("isOpenNotification", "setIsOpenNotification", false),
  connect(mapStateToProps, mapDispatchToProps),
  withHandlers({
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
        paging: { pageIndex: currentPageIndex + 1, pageSize: 6 },
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
      const { getFeaturedPostsDispatch, setUserName, setPostList } = props;

      setUserName(name);
      getFeaturedPostsDispatch({
        featuredLabels: [...selectedTopics],
      })
        .then(() => {
          const savedData = { topic: [...selectedTopics], name: name };
          setPostList([...selectedTopics]);
          userDataCRUD({ action: "EDIT", data: savedData });
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
    onSubscribePage: (props) => () => {
      const { subscribePageDispatch, unSubscribePageDispatch } = props;
      const { subscriptionId } = userDataCRUD({
        action: "GET",
      });

      if (Notification.permission === "granted" && subscriptionId) {
        unSubscribePageDispatch({ subscriptionId })
          .then(() => {
            userDataCRUD({ action: "EDIT", data: { subscriptionId: "" } });
          })
          .catch(() => console.log("err"));
        return;
      }
      serviceWorker.askUserPermission().then((consent) => {
        if (consent != "granted") return;
        serviceWorker
          .createNotificationSubscription()
          .then((subscrition) => {
            console.log("subscrition", subscrition);
            subscribePageDispatch(subscrition)
              .then((res) => {
                userDataCRUD({ action: "EDIT", data: { ...res } });
              })
              .catch();
          })
          .catch((err) =>
            console.log("error: %s, code: %s", err.message, err.code)
          );
      });
    },
  }),
  lifecycle({
    componentDidMount() {
      const {
        currentPageIndex,
        getMainPostsDispatch,
        getFeaturedPostsDispatch,
        getAllPostDispatch,
        getGetAllTopicDispatch,
        setIsLoadingPage,
        setIsOpenNotification,
        saveAllPostDispatch,
        setUserName,
        setTopic,
        setPostList,
      } = this.props;
      window.addEventListener("scroll", this.props.onScroll);
      window.addEventListener("click", function (e) {
        if (
          document.getElementById("notiDivider") &&
          !document.getElementById("notiDivider").contains(e.target) &&
          !document.getElementById("notiDividerBtn").contains(e.target)
        ) {
          setIsOpenNotification(false);
        }
      });

      userDataCRUD({ action: "EDIT", data: {} });
      const { name = "", topic = [], postList = [] } = userDataCRUD({
        action: "GET",
      });
      setUserName(name);
      setTopic(topic);
      setPostList(postList);
      setIsLoadingPage(true);
      getMainPostsDispatch();

      if (topic.length === 0) {
        getFeaturedPostsDispatch({
          featuredLabels: [...DEFAULT_TOPIC],
        })
          .then(() => {
            getGetAllTopicDispatch();
          })
          .catch(() => {});
      } else {
        setTopic([...topic]);

        getFeaturedPostsDispatch({
          featuredLabels: [...topic],
        });
      }

      getAllPostDispatch({
        paging: { pageIndex: currentPageIndex, pageSize: 6 },
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
      window.removeEventListener("click", this.props.onScroll);
    },
  })
);
