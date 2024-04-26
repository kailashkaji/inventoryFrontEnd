import { all } from "redux-saga/effects";
import mySaga from "./generic/saga";

export default function* rootSaga() {
  yield all([mySaga()]);
}
