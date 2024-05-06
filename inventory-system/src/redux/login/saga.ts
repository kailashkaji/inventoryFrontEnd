import { put, takeEvery, call } from "redux-saga/effects";
import { ActionLogin, actionTypesLogin } from "./constant";
import { httpLogin } from "../../http/login";

function* userLogin(
  action: ActionLogin
): Generator<unknown, void, ActionLogin> {
  try {
    const headerParms = {
      "Content-Type": "application/json",
    };
    const response = yield call(
      httpLogin,
      JSON.stringify(action.data),
      headerParms
    );
    const result = response.data;
    console.warn("action.data===>", response);
    // dispatch a success action to the store with the new dog
    yield put({ type: actionTypesLogin.USER_LOGIN_SUCCESS, result });
  } catch (error) {
    // dispatch a failure action to the store with the error
    yield put({
      type: actionTypesLogin.USER_LOGIN_ERROR,
      error: JSON.stringify(error),
    });
  }
}

function* validateAuth(): Generator<unknown, void, ActionLogin> {
  try {
    // const headerParms = {
    //   "Access-Control-Allow-Origin": "*",
    //   Authorization: `${localStorage.token_type} ${localStorage.access_token}`,
    // };
    // const response = yield call(ValidateAuth, headerParms);
    // console.log(response);
    // const result = response.data;
    // console.log(result);
    // dispatch a success action to the store with the new dog
    yield put({ type: actionTypesLogin.VALIDATE_AUTH_SUCCESS });
  } catch (error) {
    // dispatch a failure action to the store with the error
    yield put({ type: actionTypesLogin.VALIDATE_AUTH_ERROR, error });
  }
}

function* loginSaga() {
  yield takeEvery(actionTypesLogin.USER_LOGIN, userLogin);
  yield takeEvery(actionTypesLogin.VALIDATE_AUTH, validateAuth);
}

export default loginSaga;
