import { connect } from "react-redux";
import { compose, withHandlers, withState, lifecycle } from "recompose";

import {
  asyncSubmitPost,
  asyncGetAllPost,
  asyncDeletePosts,
  asyncUpdatePosts,
  asyncGetDetailPost,
} from "./Store/actions";

// import { asyncGetDetailPost } from "../Blog/Store/actions";
import moment from "moment";

const mapStateToProps = (state) => {
  const { adminReducers } = state;
  return {
    allPost: adminReducers.allPost,
    detailPost: adminReducers.detailPost,
  };
};
const mapDispatchToProps = (dispatch) => {
  return {
    submitPostDispatch: (payload) => asyncSubmitPost(payload),
    getAllPostDispatch: (payload) => asyncGetAllPost(payload),
    deletePostsDispatch: (payload) => asyncDeletePosts(payload),
    updatePostsDispatch: (payload) => asyncUpdatePosts(payload),
    getDetailPostDispatch: (payload) => asyncGetDetailPost(payload),
  };
};
export default compose(
  withState("articleData", "setArticleData", {
    author: "",
    title: "",
    content: "",
    topic: "",
    submitDate: moment(),
    imageUrl: "",
  }),
  withState("selected", "setSelected", []),
  connect(mapStateToProps, mapDispatchToProps),
  withHandlers({
    onUpdatingContent: (props) => ({
      Author,
      Title,
      Topic,
      SubmitDate,
      ImageUrl,
    }) => {
      const { detailPost, setArticleData } = props;

      setArticleData({
        author: Author,
        title: Title,
        content: detailPost.Content,
        topic: Topic,
        submitDate: SubmitDate,
        imageUrl: ImageUrl,
      });
    },
  }),
  withHandlers({
    onNavigateListArticle: async (props) => {
      const { setIsShowAddingForm, setIsLoadingTable } = props;

      await setIsLoadingTable(true);
      setTimeout(() => setIsLoadingTable(false), 3000);
      setTimeout(() => setIsShowAddingForm(false), 4000);
    },
    onHandleSubmitArticle: (props) => {
      const {
        selected,
        articleData,
        setArticleData,
        setSelected,
        submitPostDispatch,
        updatePostsDispatch,
        getAllPostDispatch,
      } = props;

      if (selected.length === 0) {
        submitPostDispatch({
          ...articleData,
        })
          .then(({ message }) => {
            alert(message);
            setArticleData({
              author: "",
              title: "",
              content: "",
              topic: "",
              submitDate: "",
              imageUrl: "",
            });
            getAllPostDispatch({
              paging: { pageIndex: 1, pageSize: 5 },
              orderList: { orderBy: "SubmitDate", orderType: "DESC" },
            })
              .then(() => {
                // setIsLoadingPage(false);
              })
              .catch(() => {
                // setIsLoadingPage(false);
              });
          })
          .catch((err) => {
            console.log(err);
          });
      } else {
        updatePostsDispatch({ items: [...selected], data: { ...articleData } })
          .then(() => {
            console.log("update xong r");
            setSelected([]);
            setArticleData({
              author: "",
              title: "",
              content: "",
              topic: "",
              submitDate: "",
              imageUrl: "",
            });
            getAllPostDispatch({
              paging: { pageIndex: 1, pageSize: 5 },
              orderList: { orderBy: "SubmitDate", orderType: "DESC" },
            })
              .then(() => {
                // setIsLoadingPage(false);
              })
              .catch(() => {
                // setIsLoadingPage(false);
              });
          })
          .catch(() => {});
      }
    },
    onDeleteArticle: (props) => (selected) => {
      const { setSelected, deletePostsDispatch, getAllPostDispatch } = props;

      deletePostsDispatch({ items: [...selected] })
        .then(() => {
          setSelected([]);
          getAllPostDispatch({
            paging: { pageIndex: 1, pageSize: 5 },
            orderList: { orderBy: "SubmitDate", orderType: "DESC" },
          })
            .then(() => {
              // setIsLoadingPage(false);
            })
            .catch(() => {
              // setIsLoadingPage(false);
            });
        })
        .catch(() => {
          setSelected([]);
          getAllPostDispatch({
            paging: { pageIndex: 1, pageSize: 5 },
            orderList: { orderBy: "SubmitDate", orderType: "DESC" },
          })
            .then(() => {
              // setIsLoadingPage(false);
            })
            .catch(() => {
              // setIsLoadingPage(false);
            });
        });
    },
    onEditArticle: (props) => (selected) => {
      const {
        allPost,
        setArticleData,
        getDetailPostDispatch,
        onUpdatingContent,
      } = props;
      const selectedRows = allPost.data.filter((item) =>
        selected.includes(item.Id)
      );

      if (selected.length === 1) {
        const {
          Id,
          Author,
          Title,
          Brief,
          Topic,
          SubmitDate,
          ImageUrl,
        } = selectedRows[0];
        getDetailPostDispatch({ id: Id })
          .then(() => {
            onUpdatingContent({ Author, Title, Topic, SubmitDate, ImageUrl });
          })
          .catch(() => {
            setArticleData({
              author: Author,
              title: Title,
              content: Brief,
              topic: Topic,
              submitDate: SubmitDate,
              imageUrl: ImageUrl,
            });
          });
      } else {
        setArticleData({
          author: "",
          title: "",
          content: "",
          topic: "",
          submitDate: "",
          imageUrl: "",
        });
      }
    },
  }),
  lifecycle({
    componentDidMount() {
      const { getAllPostDispatch } = this.props;

      getAllPostDispatch({
        paging: { pageIndex: 1, pageSize: 5 },
        orderList: { orderBy: "SubmitDate", orderType: "DESC" },
      })
        .then(() => {
          // setIsLoadingPage(false);
        })
        .catch(() => {
          // setIsLoadingPage(false);
        });
    },
  })
);
