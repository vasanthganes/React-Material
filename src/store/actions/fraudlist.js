//Action
export const FETCH_FRAUDS_BEGIN = "FETCH_FRAUDS_BEGIN";
export const FETCH_FRAUDS_SUCCESS = "FETCH_FRAUDS_SUCCESS";
export const FETCH_FRAUDS_FAILURE = "FETCH_FRAUDS_FAILURE";

export const fetchFraudsBegin = () => ({
  type: FETCH_FRAUDS_BEGIN
});

export const fetchFraudsSuccess = frauds => ({
  type: FETCH_FRAUDS_SUCCESS,
  payload: { frauds }
});

export const fetchFraudsError = error => ({
  type: FETCH_FRAUDS_FAILURE,
  payload: { error }
});

export function fetchFrauds() {
  return dispatch => {
    dispatch(fetchFraudsBegin());
    return fetch("https://api.myjson.com/bins/71fmw")
      .then(handleErrors)
      .then(res => res.json())
      .then(json => {
        dispatch(fetchFraudsSuccess(json));
        return json;
      })
      .catch(error => dispatch(fetchFraudsError(error)));
  };
}

function handleErrors(response) {
  if (!response.ok) {
    throw Error(response.statusText);
  }
  return response;
}
