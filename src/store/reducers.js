import { SAVE_TOKEN, SAVE_CURRENT_USER } from "./constants";
import initialState from "./state";
// Reducer
const reducers = (state = initialState, action) => {
  switch (action.type) {
    case SAVE_TOKEN:
      return { ...state, id_token: action.payload };
    case SAVE_CURRENT_USER:
      return { ...state, currentUser: action.payload };
    default:
      return state;
  }
};

export default reducers;
