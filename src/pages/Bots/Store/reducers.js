import { SAVE_ALL_ARTICLE, SAVE_AUDIO_LIST } from "./constants";
import initialState from "./state";

const reducers = (state = initialState, action) => {
  switch (action.type) {
    case SAVE_ALL_ARTICLE:
      return { ...state, allArticle: action.payload };
    case SAVE_AUDIO_LIST:
      return { ...state, audioList: [...action.payload] };
    default:
      return state;
  }
};

export default reducers;
