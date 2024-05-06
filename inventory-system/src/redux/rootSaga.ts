import { all } from "redux-saga/effects";
import mySaga from "./generic/saga";
import loginSaga from "./login/saga";
import signupSaga from "./signup/saga";
import supplierSaga from "./supplier/saga";
import brandSaga from "./brand/saga";

export default function* rootSaga() {
  yield all([mySaga(), loginSaga(), signupSaga(), supplierSaga(), brandSaga()]);
}
