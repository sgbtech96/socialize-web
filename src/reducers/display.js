const initialState = {
  mobileWeb: false,
  activeSection: 1,
};

function deviceReducer(state = initialState, action) {
  switch (action.type) {
    case `SET_MOBILE_WEB`:
      return {
        ...state,
        mobileWeb: action.payload,
      };
    case `SET_ACTIVE_SECTION`:
      return {
        ...state,
        activeSection: action.payload,
      };
    default:
      return state;
  }
}

export default deviceReducer;
