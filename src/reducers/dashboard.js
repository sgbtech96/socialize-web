import { combineReducers } from "redux";
import * as Types from "../actionTypes/dashboard";

function makeRequestReducer(actionType, defaultData = [], state = {}) {
  const initialState = {
    data: defaultData,
    error: false,
    loading: false,
    ...state,
  };
  return (state = initialState, { type, payload }) => {
    switch (type) {
      case `${actionType}.request`:
        return {
          ...state,
          loading: true,
          error: false,
        };
      case `${actionType}.success`:
        return {
          ...state,
          loading: false,
          error: false,
          data: payload.data,
        };
      case `${actionType}.failed`:
        return {
          ...state,
          loading: false,
          error: true,
          data: defaultData,
        };
      case `${actionType}.reset`:
        return initialState;
      case `${actionType}.clear`:
        return initialState;
      default:
        return state;
    }
  };
}

export default combineReducers({
  myProfile: makeRequestReducer(Types.FETCH_MY_PROFILE, {}),
  activeFriendProfile: makeRequestReducer(Types.SET_ACTIVE_FRIEND_PROFILE, {}),
});
