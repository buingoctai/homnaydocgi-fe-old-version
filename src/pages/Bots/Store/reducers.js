import { SAVE_ALL_POST, SAVE_MP3 } from "./constants";
import initialState from "./state";

const reducers = (state = initialState, action) => {
  console.log("action=", action);
  switch (action.type) {
    case SAVE_ALL_POST:
      return { ...state, allPost: action.payload };
    case SAVE_MP3:
      return { ...state, mp3: action.payload };
    default:
      return state;
  }
};

export default reducers;
