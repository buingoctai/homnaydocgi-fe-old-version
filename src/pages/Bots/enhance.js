import { connect } from "react-redux";
import { compose, withHandlers, withState, lifecycle } from "recompose";
import { asyncGetAllArticle, asyncGetMp3 } from "../../pages/Bots/Store/actions";

const mapStateToProps = (state) => {
  const { readNewReducers } = state;
  return {
    allArticle: readNewReducers.allArticle,
    mp3: readNewReducers.mp3,
  };
};
const mapDispatchToProps = (dispatch) => {
  return {
    getAllArticleDispatch: (payload) => asyncGetAllArticle(payload),
    getMp3Dispatch: (payload) => asyncGetMp3(payload),
  };
};
export default compose(
  withState("showingPost", "setShowingPost", {}),
  connect(mapStateToProps, mapDispatchToProps),
  withHandlers({}),
  lifecycle({
    componentDidMount() {
      this.props
        .getAllArticleDispatch({
          paging: { pageIndex: 1, pageSize: 10 },
          orderList: { orderType: "DESC", orderBy: "title" },
        })
        .then(() => {
          const [firstItem] = this.props.allArticle.data
          this.props.getMp3Dispatch({ text: firstItem.content });
        })
        .catch(() => { });
    },
  })
);
