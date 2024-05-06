import { ActionLogin, actionTypesLogin } from "./constant";
export interface LoginState {
  fetching: boolean;
  login: {
    username: string | null;
    password: string | null;
  };
  error: string | null;
  isSuccess: boolean;
  isError: boolean;
  accessToken: string;
  refreshToken: string;
  authentication: boolean;
  messages: string;
  expires: boolean;
}
const initialState: LoginState = {
  fetching: false,
  login: {
    username: null,
    password: null,
  },
  error: null,
  isSuccess: false,
  isError: false,
  accessToken: "",
  refreshToken: "",
  authentication: false,
  messages: "",
  expires: false,
};

const loginReducer = (state = initialState, action: ActionLogin) => {
  const updateState = Object.assign({}, state);
  switch (action.type) {
    case actionTypesLogin.ASSIGN_LOGIN_CREDENTIAL: {
      const obj: { [key: string]: string | undefined } = {};
      if (action.data) {
        obj[action.data.field] = action.data.value;
      }
      const login = Object.assign({}, state.login, obj);
      //console.warn("loginReducer", login);
      return {
        ...state,
        fetching: false,
        error: null,
        login: login,
        isSuccess: false,
        isError: false,
      };
    }
    case actionTypesLogin.USER_LOGIN:
      return {
        ...state,
        fetching: true,
        error: null,
        isSuccess: false,
        isError: false,
      };

    case actionTypesLogin.USER_LOGIN_SUCCESS:
      console.warn("User Logged In Successfully");
      if (action.result) {
        localStorage.setItem("access_token", action.result.accessToken);
        //localStorage.setItem("expires_in", action.result.expires_in.toString());
        localStorage.setItem("refresh_token", action.result.token);
        //localStorage.setItem("token_type", action.result.token_type);
      }
      return {
        ...state,
        fetching: false,
        authentication: true,
        accessToken: action.result?.accessToken,
        refreshToken: action.result?.token,
        messages: "login Success!!",
        isSuccess: true,
      };

    case actionTypesLogin.USER_LOGIN_ERROR:
      console.warn("User Login Failed : ", action.error);
      return {
        ...state,
        fetching: false,
        error: action.error,
        isError: true,
        isSuccess: false,
      };

    case actionTypesLogin.VALIDATE_AUTH_SUCCESS:
      return {
        ...state,
        fetching: false,
        authentication: true,
        isSuccess: true,
      };

    case actionTypesLogin.VALIDATE_AUTH_ERROR:
      localStorage.removeItem("access_token");
      return {
        ...state,
        fetching: false,
        error: action.error,
        isError: true,
        isSuccess: false,
      };

    default:
      return updateState;
  }
};

export default loginReducer;
