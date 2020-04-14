import { SAVE_MAIN_POSTS, SAVE_FEATURED_POSTS, SAVE_POSTS } from "./constants";
import initialState from "./state";

const reducers = (state = initialState, action) => {
  switch (action.type) {
    case SAVE_MAIN_POSTS:
      return { ...state, mainPosts: action.payload };
    case SAVE_FEATURED_POSTS:
      return { ...state, featuredPosts: action.payload };
    default:
      return state;
  }
};

export default reducers;
