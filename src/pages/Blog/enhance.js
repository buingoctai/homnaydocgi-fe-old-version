import { connect } from "react-redux";
import { compose, withHandlers, withState, lifecycle } from "recompose";
import { getCookie } from "../../utils/utils";
import { COOKIE_NAMES } from "../../utils/constants";

import { asyncAuthencation, asyncGetProfile } from "../../Store/actions";

import { asyncGetMainPosts, asyncGetFeaturedPosts } from "./Store/actions";

const mapStateToProps = (state) => {
  const { reducers, blogReducers } = state;
  return {
    currentUser: reducers.currentUser,
    mainPosts: blogReducers.mainPosts,
    featuredPosts: blogReducers.featuredPosts,
  };
};
const mapDispatchToProps = (dispatch) => {
  return {
    authencationDispatch: (payload) => asyncAuthencation(payload),
    getProfileDispatch: (payload) => asyncGetProfile(payload),
    getMainPostsDispatch: (payload) => asyncGetMainPosts(payload),
    getFeaturedPostsDispatch: (payload) => asyncGetFeaturedPosts(payload),
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
        isOpenDetaiContainer,
      } = props;

      if (mainPosts.Id === postId) {
        setShowingPost(mainPosts);
      } else {
        const [filtedPost] = featuredPosts.data.filter(
          (item) => item.Id === postId
        );
        console.log("filtedPost=", filtedPost);
        setShowingPost(filtedPost);
      }
      setIsOpenDetaiContainer(!isOpenDetaiContainer);
    },
  }),
  lifecycle({
    componentDidMount() {
      console.log("document=", document.getElementById("detailContainer"));
      const {
        authencationDispatch,
        getProfileDispatch,
        getMainPostsDispatch,
        getFeaturedPostsDispatch,
        setIsNavigateSubmitPageNotifi,
        setIsLoadingPage,
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
          setIsLoadingPage(false);
        })
        .catch(() => {
          setIsLoadingPage(false);
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
                () => (window.location.href = "http://localhost:3000/"),
                5000
              );
            }
          })
          .catch((err) => console.log(err));
      } else {
        setIsNavigateSubmitPageNotifi(true);
        setTimeout(() => setIsNavigateSubmitPageNotifi(false), 5000);
        // setTimeout(
        //   () => (window.location.href = "http://localhost:3000/"),
        //   5000
        // );
      }
      //----------------------------------------------------
    },
  })
);
