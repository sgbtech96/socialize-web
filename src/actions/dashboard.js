import { handleLoading, handleData, handleError } from "../utils/handlers";
import * as Types from "../actionTypes/dashboard";
import { get } from "../utils/request";

export const fetchMyProfile = () => async (dispatch) => {
  dispatch(handleLoading(Types.FETCH_MY_PROFILE_REQUEST));
  try {
    const res = await get(`api/v1/profile/me`);
    if (res.type === "success")
      dispatch(handleData(Types.FETCH_MY_PROFILE_SUCCESS, res.data));
    else throw new Error();
  } catch (e) {
    dispatch(handleError(Types.FETCH_MY_PROFILE_FAILED, e));
  }
};

export const setActiveFriendProfile = (data) => {
  return handleData(Types.SET_ACTIVE_FRIEND_PROFILE_SUCCESS, data);
};

export const resetActiveFriendProfile = (data) => {
  return handleData(Types.SET_ACTIVE_FRIEND_PROFILE_RESET);
};
