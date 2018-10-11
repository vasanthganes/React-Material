//Action
export const FETCH_RECENT_ITEMS_BEGIN = "FETCH_RECENT_ITEMS_BEGIN";
export const FETCH_RECENT_ITEMS_SUCCESS = "FETCH_RECENT_ITEMS_SUCCESS";
export const FETCH_RECENT_ITEMS_FAILURE = "FETCH_RECENT_ITEMS_FAILURE";

export const fetchRecentItemsBegin = () => ({
  type: FETCH_RECENT_ITEMS_BEGIN
});

export const fetchRecentItemsSuccess = recentitems => ({
  type: FETCH_RECENT_ITEMS_SUCCESS,
  payload: { recentitems }
});

export const fetchRecentItemsError = error => ({
  type: FETCH_RECENT_ITEMS_FAILURE,
  payload: { error }
});

export function fetchRecentItems() {
  return dispatch => {
    dispatch(fetchRecentItemsBegin());
    return fetch("https://api.myjson.com/bins/x6d3c")
      .then(handleErrors)
      .then(res => res.json())
      .then(json => {
        dispatch(fetchRecentItemsSuccess(json));
        return json;
      })
      .catch(error => dispatch(fetchRecentItemsError(error)));
  };
}

function handleErrors(response) {
  if (!response.ok) {
    throw Error(response.statusText);
  }
  return response;
}
