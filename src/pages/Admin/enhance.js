import { connect } from "react-redux";
import { compose, withHandlers, withState, lifecycle } from "recompose";
import axios from "axios";

import { asyncSubmitPost } from "./Store/actions";

const mapDispatchToProps = (dispatch) => {
  return {
    submitPostDispatch: (payload) => asyncSubmitPost(payload),
  };
};
export default compose(
  withState("isShowAddingForm", "setIsShowAddingForm", true),
  withState("isLoadingTable", "setIsLoadingTable", false),
  withState("articleData", "setArticleData", {
    author: "",
    title: "",
    content: "",
    topic: "",
    submitDate: "",
    imageUrl: "",
  }),
  connect(null, mapDispatchToProps),
  withHandlers({
    onNavigateListArticle: async (props) => {
      const { setIsShowAddingForm, setIsLoadingTable } = props;
      await setIsLoadingTable(true);
      setTimeout(() => setIsLoadingTable(false), 3000);
      setTimeout(() => setIsShowAddingForm(false), 4000);
    },
    onHandleSubmitArticle: (props) => {
      const { setArticleData, submitPostDispatch, articleData } = props;
      submitPostDispatch({
        ...articleData,
      })
        .then((response) => {
          console.log(response);
          setArticleData({
            author: "",
            title: "",
            content: "",
            topic: "",
            submitDate: "",
            imageUrl: "",
          });
        })
        .catch((err) => {
          console.log(err);
        });
    },
  }),
  lifecycle({
    componentDidMount() {},
  })
);
