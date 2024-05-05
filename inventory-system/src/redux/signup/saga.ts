import { call, put, takeLatest } from "redux-saga/effects";
import { SIGNUP_REQUEST } from "./constant";
import { signupSuccess, signupFailure, Role } from "./action";
import { httpLogout, httpRegister } from "../../http/login";

interface SignupPayload {
  username: string;
  password: string;
  roles: Role[];
}

function* signup(action: {
  type: string;
  payload: SignupPayload;
}): Generator<unknown, void, Response> {
  console.log("Sign up action", action);
  try {
    const headerParms = {
      "Content-Type": "application/json",
    };
    const response = yield call(
      httpRegister,
      JSON.stringify(action.payload),
      headerParms
    );
    console.warn("register api success ===>", response);
    if (response.status === 200) {
      const headerParms = {
        "Content-Type": "application/json",
      };
      yield call(httpLogout, headerParms);
    }
    yield put(signupSuccess());
  } catch (error) {
    yield put(
      signupFailure(error instanceof Error ? error.message : "Unknown error")
    );
  }
}

function* signupSaga() {
  yield takeLatest(SIGNUP_REQUEST, signup);
}

export default signupSaga;
