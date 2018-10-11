import {
    FETCH_USER_BEGIN,
    FETCH_USER_SUCCESS,
    FETCH_USER_FAILURE
  } from "../actions/user";
  
  const initialState = {
    userObject: {},
    transactions: [],
    loading: false,
    error: null
  };
  
  export default function userReducer(state = initialState, action) {
    switch (action.type) {
      case FETCH_USER_BEGIN:
        return {
          ...state,
          loading: true,
          error: null
        };
  
      case FETCH_USER_SUCCESS:
        return {
          ...state,
          loading: false,
          userObject: action.payload.user,
          transactions: action.payload.user.transactions
        };
  
      case FETCH_USER_FAILURE:
        return {
          ...state,
          loading: false,
          error: action.payload.error,
          user: {}
        };
  
      default:
        return state;
    }
  }
  