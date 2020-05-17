import { connect } from "react-redux";
import { compose, withHandlers, withState, lifecycle } from "recompose";
import { asyncGetAllPost, asyncGetMp3 } from "../../pages/Bots/Store/actions";

const mapStateToProps = (state) => {
  const { readNewReducers } = state;
  return {
    allPost: readNewReducers.allPost,
    mp3: readNewReducers.mp3,
  };
};
const mapDispatchToProps = (dispatch) => {
  return {
    getAllPostDispatch: (payload) => asyncGetAllPost(payload),
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
        .getAllPostDispatch({
          paging: { pageIndex: 1, pageSize: 10 },
          orderList: { orderType: "DESC", orderBy: "title" },
        })
        // .then(() => {
        //   this.props.getMp3Dispatch({ text: this.props.lastedPost.content });
        // })
        .catch(() => {});
    },
  })
);
