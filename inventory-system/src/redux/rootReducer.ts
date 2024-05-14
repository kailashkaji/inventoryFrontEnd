import { combineReducers } from "redux";
import helloworld from "./generic/reducer";
import loginReducer from "./login/reducer";
import signupReducer from "./signup/reducer";
import supplierReducer from "./supplier/reducer";
import brandReducer from "./brand/reducer";
import categoryReducer from "./category/reducer";
import productReducer from "./product/reducer";
import itemReducer from "./item/reducer";
import orderReducer from "./order/reducer";

export default combineReducers({
  helloworld: helloworld,
  loginReducer: loginReducer,
  signupReducer: signupReducer,
  supplierReducer: supplierReducer,
  brandReducer: brandReducer,
  categoryReducer: categoryReducer,
  productReducer: productReducer,
  itemReducer: itemReducer,
  orderReducer: orderReducer,
});
