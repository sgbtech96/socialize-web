export const handleLoading = (actionType) => ({
  type: actionType,
  payload: { loading: true },
});

export const handleData = (actionType, data) => ({
  type: actionType,
  payload: { data },
});

export const handleError = (actionType, error = "Something went wrong!") => ({
  type: actionType,
  payload: { data: error },
});
