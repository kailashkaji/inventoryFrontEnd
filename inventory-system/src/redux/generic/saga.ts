import { put, takeLatest } from "redux-saga/effects";
import { actionTypes } from "./constant";

function* helloWorld() {
  try {
    yield put({
      type: actionTypes.RECEIVE_HELLO_WORLD,
      text: "sasdasdasdasdasd",
    });
  } catch (error) {
    yield put({ type: actionTypes.RECEIVE_HELLO_WORLD, error });
  }
}

function* mySaga() {
  yield takeLatest(actionTypes.REQUEST_HELLO_WORLD, helloWorld);
}

export default mySaga;
