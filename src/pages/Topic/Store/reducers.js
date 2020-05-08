import {
  SAVE_ALL_POST,
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
