import store from "../store/store";
import { fetchUser } from "../store/actions/user";

export function OnUserEnter() {
  store.dispatch(fetchUser());
}
