import {
  FETCH_FRAUDS_BEGIN,
  FETCH_FRAUDS_SUCCESS,
  FETCH_FRAUDS_FAILURE
} from "../actions/fraudlist";

const initialState = {
  frauds: [],
  loading: false,
  error: null
};

export default function fraudsReducer(state = initialState, action) {
 
  switch (action.type) {
    case FETCH_FRAUDS_BEGIN:
      return {
        ...state,
        loading: true,
        error: null
      };

    case FETCH_FRAUDS_SUCCESS:
      return {
        ...state,
        loading: false,
        frauds: action.payload.frauds
      };

    case FETCH_FRAUDS_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload.error,
        frauds: []
      };

    default:
      return state;
  }
}
