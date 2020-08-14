import { SAVE_TOKEN, SAVE_CURRENT_USER, SAVE_CURRENT_SUBCRIPTION, GET_ALL_SUBCRIPTIONS } from "./constants";
import initialState from "./state";
// Reducer
const reducers = (state = initialState, action) => {
  switch (action.type) {
    case SAVE_TOKEN:
      return { ...state, id_token: action.payload };
    case SAVE_CURRENT_USER:
      return { ...state, currentUser: action.payload };
    case SAVE_CURRENT_SUBCRIPTION:
      return { ...state, subcription: action.payload };
    case GET_ALL_SUBCRIPTIONS:
      return { ...state, subcriptions: action.payload };
    default:
      return state;
  }
};

export default reducers;
