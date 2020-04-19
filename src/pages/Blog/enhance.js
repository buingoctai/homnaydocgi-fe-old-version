import { connect } from "react-redux";
import { compose, withHandlers, withState, lifecycle } from "recompose";
import { getCookie } from "../../utils/utils";
import { COOKIE_NAMES } from "../../utils/constants";

import { asyncAuthencation, asyncGetProfile } from "../../Store/actions";

import {
  asyncGetMainPosts,
  asyncGetFeaturedPosts,
  asyncGetAllPost,
  saveAllPost,
} from "./Store/actions";

const mapStateToProps = (state) => {
  const { reducers, blogReducers } = state;
  return {
    currentUser: reducers.currentUser,
    mainPosts: blogReducers.mainPosts,
    featuredPosts: blogReducers.featuredPosts,
    allPost: blogReducers.allPost,
  };
};
const mapDispatchToProps = (dispatch) => {
  return {
    authencationDispatch: (payload) => asyncAuthencation(payload),
    getProfileDispatch: (payload) => asyncGetProfile(payload),
    getMainPostsDispatch: (payload) => asyncGetMainPosts(payload),
    getFeaturedPostsDispatch: (payload) => asyncGetFeaturedPosts(payload),
    getAllPostDispatch: (payload) => asyncGetAllPost(payload),
    saveAllPostDispatch: (payload) => dispatch(saveAllPost(payload)),
  };
};
export default compose(
  withState("isLoadingPage", "setIsLoadingPage", false),
  withState("isOpenDetaiContainer", "setIsOpenDetaiContainer", false),
  withState(
    "isNavigateSubmitPageNotifi",
    "setIsNavigateSubmitPageNotifi",
    false
  ),
  withState("isAdmin", "SetIsAdmin", false),
  withState("isSubscribeNotifiBot", "setIsSubscribeNotifiBot", false),
  withState("isSuggestSendArticle", "setIsSuggestSendArticle", false),
  withState("showingPost", "setShowingPost", {}),
  withState("currentPageIndex", "setCurrentPageIndex", 1),
  withState("isShowPaging", "setIsShowPaging", true),
  withState("isStopCallApiGetAllPost", "setIsStopCallApiGetAllPost", false),
  connect(mapStateToProps, mapDispatchToProps),
  withHandlers({
    onHandleNavigateAdminPage: (props) => {
      const { currentUser, SetIsAdmin } = props;
      if (!currentUser.localeCompare("tai admin")) {
        SetIsAdmin(true);
      }
    },
    onHandleSubscribeNotifiByBot: (props) => {
      const { setIsSubscribeNotifiBot } = props;
      setIsSubscribeNotifiBot(true);
    },
    onHandleSuggestSendArticle: (props) => {
      const { setIsSuggestSendArticle } = props;
      setIsSuggestSendArticle(true);
    },
    onHandleOpenDetailContainer: (props) => (postId) => {
      const {
        setIsOpenDetaiContainer,
        setShowingPost,
        mainPosts,
        featuredPosts,
        allPost,
        isOpenDetaiContainer,
      } = props;

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
          console.log("checking response", response);

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
        setIsNavigateSubmitPageNotifi,
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
          "Marketing",
          "Personal View",
          "Back End",
          "Psychology",
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
              setIsNavigateSubmitPageNotifi(true);
              setTimeout(() => setIsNavigateSubmitPageNotifi(false), 5000);
              setTimeout(
                () =>
                  (window.location.href =
                    "https://contentcollection.azurewebsites.net//"),
                5000
              );
            }
          })
          .catch((err) => console.log(err));
      } else {
        setIsNavigateSubmitPageNotifi(true);
        setTimeout(() => setIsNavigateSubmitPageNotifi(false), 5000);
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
