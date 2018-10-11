import { combineReducers } from "redux";
import { routerReducer } from "react-router-redux";

import fraudsReducer from "./fraudsreducer";
import recentItemsReducer from "./recentitemsreducer";
import userReducer from "./userreducer";


export default combineReducers({
  fraudlist: fraudsReducer,
  recentItems: recentItemsReducer,
  userData: userReducer,
  router: routerReducer
});
