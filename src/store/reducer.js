// Actions
const SAVE_TOKEN = "SAVE_TOKEN";
const GET_TOKEN = "GET_TOKEN";

// InitialState
const initialState = {
  id_token: ""
};
// Reducer
const reducer = (state = initialState, action) => {
  switch (action.type) {
    case SAVE_TOKEN:
      return { ...state, id_token: action.payload };
    default:
      return state;
  }
};

export default reducer;
