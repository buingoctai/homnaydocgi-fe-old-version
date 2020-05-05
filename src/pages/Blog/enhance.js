import { connect } from "react-redux";
import { compose, withHandlers, withState, lifecycle } from "recompose";
import { getCookie } from "../../utils/utils";
import { COOKIE_NAMES } from "../../utils/constants";

import { asyncAuthencation, asyncGetProfile } from "../../store/actions";

import {
  asyncGetMainPosts,
  asyncGetFeaturedPosts,
  asyncGetAllPost,
  asyncSuggestSubscribeNotifiByBot,
  asyncGetDetailPost,
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
  };
};
export default compose(
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
  connect(mapStateToProps, mapDispatchToProps),
  withHandlers({
    onHandleNavigateAdminPage: (props) => {
      const { currentUser, setDialogContent } = props;
      if (!currentUser.localeCompare("tai admin")) {
        setDialogContent({ visible: true, content: "MSG2" });
      }
    },
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
        .catch(() => {});
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
      setIsLoadingSubPage(true);
      getDetailPostDispatch({ id: postId })
        .then(() => {
          setIsLoadingSubPage(false);
        })
        .catch(() => {
          setIsLoadingSubPage(false);
        });

      if (mainPosts.Id === postId) {
        setShowingPost(mainPosts);
      } else {
        const [filtedPost] = featuredPosts.data.filter(
          (item) => item.Id === postId
        );
        if (filtedPost) {
          setShowingPost(filtedPost);
        } else {
          const [filtedPost] = allPost.data.filter(
            (item) => item.Id === postId
          );
          setShowingPost(filtedPost);
        }
      }
      setIsOpenDetaiContainer(!isOpenDetaiContainer);
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
  }),
  lifecycle({
    componentDidMount() {
      const {
        currentPageIndex,
        authencationDispatch,
        getProfileDispatch,
        getMainPostsDispatch,
        getFeaturedPostsDispatch,
        getAllPostDispatch,
        setDialogContent,
        setIsLoadingPage,
        saveAllPostDispatch,
        onHandleScrollToBottom,
      } = this.props;
      const token = getCookie(COOKIE_NAMES.ACCESS_TOKEN);

      // Phát triển trc (giả định)
      setIsLoadingPage(true);
      getMainPostsDispatch()
        .then(() => {
          // setIsLoadingPage(false);
        })
        .catch(() => {
          // setIsLoadingPage(false);
        });
      getFeaturedPostsDispatch({
        featuredLabels: [
          "Back End",
          "AI/ML/DL Research",
          "Philosophy",
          "Psychology",
          "Administration",
          "Personal View",
        ],
      })
        .then(() => {
          // setIsLoadingPage(false);
        })
        .catch(() => {
          // setIsLoadingPage(false);
        });
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
      window.removeEventListener("scroll", () => {
        //
      });
    },
  })
);
