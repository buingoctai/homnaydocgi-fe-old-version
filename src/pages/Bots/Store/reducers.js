import { SAVE_ALL_ARTICLE, SAVE_MP3 } from "./constants";
import initialState from "./state";

const reducers = (state = initialState, action) => {
  switch (action.type) {
    case SAVE_ALL_ARTICLE:
      return { ...state, allArticle: action.payload };
    case SAVE_MP3:
      return { ...state, mp3: action.payload };
    default:
      return state;
  }
};

export default reducers;
