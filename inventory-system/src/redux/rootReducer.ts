import { combineReducers } from "redux";
import helloworld from "./generic/reducer";
import loginReducer from "./login/reducer";
import signupReducer from "./signup/reducer";

export default combineReducers({
  helloworld: helloworld,
  loginReducer: loginReducer,
  signupReducer: signupReducer,
});
