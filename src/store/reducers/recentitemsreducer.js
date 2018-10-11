import {
  FETCH_RECENT_ITEMS_BEGIN,
  FETCH_RECENT_ITEMS_SUCCESS,
  FETCH_RECENT_ITEMS_FAILURE
} from "../actions/recentitems";

const initialState = {
  recentitems: [],
  loading: false,
  error: null
};

export default function recentItemsReducer(state = initialState, action) {
  
  switch (action.type) {
    case FETCH_RECENT_ITEMS_BEGIN:
      return {
        ...state,
        loading: true,
        error: null
      };

    case FETCH_RECENT_ITEMS_SUCCESS:
      return {
        ...state,
        loading: false,
        recentitems: action.payload.recentitems
      };

    case FETCH_RECENT_ITEMS_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload.error,
        recentitems: []
      };

    default:
      return state;
  }
}
