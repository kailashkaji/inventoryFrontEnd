import { SIGNUP_REQUEST, SIGNUP_SUCCESS, SIGNUP_FAILURE } from "./constant";

export interface Role {
  id: number;
  name: string;
}

export interface SignupRequestAction {
  type: typeof SIGNUP_REQUEST;
  payload: {
    username: string;
    password: string;
    roles: Role[];
  };
}

export interface SignupSuccessAction {
  type: typeof SIGNUP_SUCCESS;
}

export interface SignupFailureAction {
  type: typeof SIGNUP_FAILURE;
  payload: string;
}

export type SignupActionTypes =
  | SignupRequestAction
  | SignupSuccessAction
  | SignupFailureAction;

export const signupRequest = (
  username: string,
  password: string,
  roles: Role[]
) => ({
  type: SIGNUP_REQUEST,
  payload: { username, password, roles },
});

export const signupSuccess = (): SignupSuccessAction => ({
  type: SIGNUP_SUCCESS,
});

export const signupFailure = (error: string): SignupFailureAction => ({
  type: SIGNUP_FAILURE,
  payload: error,
});
