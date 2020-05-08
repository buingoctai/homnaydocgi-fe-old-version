import ReactGA from "react-ga";
import { connect } from "react-redux";
import { compose, withHandlers, withState, lifecycle } from "recompose";
import { getCookie } from "../../utils/utils";
import { COOKIE_NAMES, DEFAULT_TOPIC } from "../../utils/constants";

import { asyncAuthencation, asyncGetProfile } from "../../store/actions";

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
  const { reducers, blogReducers } = state;
  return {
    currentUser: reducers.currentUser,
    mainPosts: blogReducers.mainPosts,
    featuredPosts: blogReducers.featuredPosts,
    allPost: blogReducers.allPost,
    detailPost: blogReducers.detailPost,
    allTopic: blogReducers.allTopic,
  };
};
const mapDispatchToProps = (dispatch) => {
  return {
    authencationDispatch: (payload) => asyncAuthencation(payload),
    getProfileDispatch: (payload) => asyncGetProfile(payload),
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
  connect(mapStateToProps, mapDispatchToProps),
  withHandlers({
    onHandleSubscribeNotifiByBot: (props) => {
      const { suggestSubscribeNotifiByBotDispatch, setDialogContent } = props;
      setDialogContent({ visible: true, content: "MSG3" });
      suggestSubscribeNotifiByBotDispatch({
        id_msg_user: "",
        message: "BẠN ĐÃ ĐĂNG KÝ THÀNH CÔNG GỬI THÔNG BÁO QUA MESSENGER FB",
      })
        .then(({ message }) => {
          alert(message);
        })
        .catch(() => { });
    },
    onHandleSuggestSendArticle: (props) => {
      const { setDialogContent } = props;
      setDialogContent({ visible: true, content: "MSG4" });
    },
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
        .catch(() => { });
    },
  }),
  lifecycle({
    componentDidMount() {
      ReactGA.initialize("UA-165562758-1");
      ReactGA.set({
        page:
          "https://homnaydocgi.herokuapp.com/home/T%C3%8DNH-S%C3%93NG-H%E1%BA%A0T-TRONG-PH%E1%BA%A6N-M%E1%BB%80M",
      });
      ReactGA.pageview(
        "https://homnaydocgi.herokuapp.com/home/T%C3%8DNH-S%C3%93NG-H%E1%BA%A0T-TRONG-PH%E1%BA%A6N-M%E1%BB%80M"
      );
      ReactGA.event({
        category: "Link",
        action: "Click",
      });
      ReactGA.send({
        hitType: "event",
        eventCategory: "category",
        eventAction: "action",
        eventLabel: "label",
      });
      const {
        allTopic,
        currentPageIndex,
        authencationDispatch,
        getProfileDispatch,
        getMainPostsDispatch,
        getFeaturedPostsDispatch,
        getAllPostDispatch,
        getGetAllTopicDispatch,
        setDialogContent,
        setIsLoadingPage,
        setIsOpenChoseTopic,
        saveAllPostDispatch,
        onHandleScrollToBottom,
        setUserName,
      } = this.props;
      const token = getCookie(COOKIE_NAMES.ACCESS_TOKEN);

      // Phát triển trc (giả định)
      setIsLoadingPage(true);
      getMainPostsDispatch();
      const userData = JSON.parse(localStorage.getItem("userData"));
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
          .catch(() => { });
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

      window.addEventListener("scroll", async (e) => {
        // Khoảng cách từ đỉnh scroll bar đến đỉnh của browser
        const scrollTop = document.documentElement.scrollTop;
        // Toàn bộ height của 1 element(đó là toàn bộ quảng đường scroll)
        const realHeight = document.documentElement.offsetHeight;
        // Height khi scroll (scrollTop thay đổi liên tục)
        const heightOnSroll = scrollTop + window.innerHeight;

        if (heightOnSroll >= realHeight - 100 && scrollTop) {
          onHandleScrollToBottom();
        }
      });

      // Phát triển sau
      if (token) {
        // fetch user inform
        setIsLoadingPage(true);
        authencationDispatch({})
          .then((response) => {
            const { id } = response;
            if (id) {
              getProfileDispatch({ userId: id })
                .then(() => {
                  getMainPostsDispatch()
                    .then(() => {
                      setIsLoadingPage(false);
                    })
                    .catch(() => {
                      setIsLoadingPage(false);
                    });
                })
                .catch((err) => console.log(err));
            } else {
              setDialogContent({ visible: true, content: "MSG1" });
              setTimeout(
                () => setDialogContent({ visible: true, content: "MSG1" }),
                5000
              );
              setTimeout(
                () => (window.location.href = process.env.REACT_APP_URL),
                5000
              );
            }
          })
          .catch((err) => console.log(err));
      } else {
        setDialogContent(true);
        setTimeout(
          () => setDialogContent({ visible: true, content: "MSG1" }),
          1000
        );
        // setTimeout(
        //   () => (window.location.href = "https://contentcollection.azurewebsites.net//"),
        //   5000
        // );
      }
      //----------------------------------------------------
    },
    componentWillUnmount() {
      // you need to unbind the same listener that was binded.
      console.log("event unmount");
      window.removeEventListener("scroll", this.onScroll, false);
    },
  })
);
