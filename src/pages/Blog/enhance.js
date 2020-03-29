import { compose, withHandlers, withState, lifecycle } from "recompose";

export default compose(
  withState("currentUser", "setCurrentUser", "taibn1"),
  withHandlers({}),
  lifecycle({
    componentDidMount() {}
  })
);
