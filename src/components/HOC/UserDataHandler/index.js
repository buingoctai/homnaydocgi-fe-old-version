import { compose, withState } from "recompose";

export default compose(
  withState("userName", "setUserName", ""),
  withState("topic", "setTopic", []),
  withState("postList", "setPostList", []),
  withState("isSavedPostsStatus", "setIsSavedPostsStatus", false)
);
