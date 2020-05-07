import {
  SAVE_MAIN_POSTS,
  SAVE_FEATURED_POSTS,
  SAVE_ALL_POST,
  SAVE_DETAIL_POST,
  SAVE_ALL_TOPIC,
} from "./constants";
import initialState from "./state";

const reducers = (state = initialState, action) => {
  switch (action.type) {
    case SAVE_ALL_POST:
      return { ...state, allPost: action.payload };

    default:
      return state;
  }
};

export default reducers;
