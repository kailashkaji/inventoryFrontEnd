import { all } from "redux-saga/effects";
import mySaga from "./generic/saga";
import loginSaga from "./login/saga";
import signupSaga from "./signup/saga";
import supplierSaga from "./supplier/saga";
import brandSaga from "./brand/saga";
import categorySaga from "./category/saga";
import productSaga from "./product/saga";
import itemSaga from "./item/saga";
import orderSaga from "./order/saga";

export default function* rootSaga() {
  yield all([
    mySaga(),
    loginSaga(),
    signupSaga(),
    supplierSaga(),
    brandSaga(),
    categorySaga(),
    productSaga(),
    itemSaga(),
    orderSaga(),
  ]);
}
