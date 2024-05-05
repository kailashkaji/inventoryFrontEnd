import { SIGNUP_REQUEST, SIGNUP_SUCCESS, SIGNUP_FAILURE } from "./constant";
import { SignupActionTypes } from "./action";

interface SignupState {
  loading: boolean;
  error: string | null;
}

const initialState: SignupState = {
  loading: false,
  error: null,
};

const signupReducer = (
  state = initialState,
  action: SignupActionTypes
): SignupState => {
  switch (action.type) {
    case SIGNUP_REQUEST:
      return {
        ...state,
        loading: true,
        error: null,
      };
    case SIGNUP_SUCCESS:
      return {
        ...state,
        loading: false,
      };
    case SIGNUP_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    default:
      return state;
  }
};

export default signupReducer;
