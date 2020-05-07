import { connect } from "react-redux";
import { compose, withHandlers, withState, lifecycle } from "recompose";

import { asyncGetAllPost } from "./Store/actions";

const mapStateToProps = (state) => {
  const { topicReducers } = state;
  return {
    allPost: topicReducers.allPost,
  };
};
const mapDispatchToProps = (dispatch) => {
  return {
    getAllPostDispatch: (payload) => asyncGetAllPost(payload),
  };
};
export default compose(
  withState("isShowPaging", "setIsShowPaging", true),
  connect(mapStateToProps, mapDispatchToProps),
  withHandlers({}),
  lifecycle({
    componentDidMount() {
      const topic = this.props.location.topic;
      this.props.getAllPostDispatch({ topicName: topic });
    },
  })
);
