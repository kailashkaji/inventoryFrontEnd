export const actionTypesLogin = {
  ASSIGN_LOGIN_CREDENTIAL: "ASSIGN_LOGIN_CREDENTIAL" as const,
  USER_LOGIN: "USER_LOGIN" as const,
  USER_LOGIN_SUCCESS: "USER_LOGIN_SUCCESS" as const,
  USER_LOGIN_ERROR: "USER_LOGIN_ERROR" as const,
  VALIDATE_AUTH: "VALIDATE_AUTH" as const,
  VALIDATE_AUTH_SUCCESS: "VALIDATE_AUTH_SUCCESS" as const,
  VALIDATE_AUTH_ERROR: "VALIDATE_AUTH_ERROR" as const,
  USER_LOGOUT: "USER_LOGOUT" as const,
  USER_LOGOUT_SUCCESS: "USER_LOGIN_SUCCESS" as const,
  USER_LOGOUT_ERROR: "USER_LOGIN_ERROR" as const,
};

type ActionTypesLogin =
  (typeof actionTypesLogin)[keyof typeof actionTypesLogin];

export type { ActionTypesLogin };

export interface ActionPayload {
  field: string;
  value: string | undefined;
}

interface LoginSuccessPayload {
  accessToken: string;
  expires_in: number;
  token: string;
  token_type: string;
}

export interface ActionLogin {
  type: string;
  data?: ActionPayload;
  result?: LoginSuccessPayload;
  error?: string;
}

// export interface AuthState {
//   isAuthenticated: boolean;
//   authenticate: (cb: () => void) => void;
//   signout: (cb: () => void) => void;
// }

// export const isAuth: AuthState = {
//   isAuthenticated: false,
//   authenticate(cb) {
//     this.isAuthenticated = true;
//     setTimeout(cb, 10);
//   },
//   signout(cb) {
//     this.isAuthenticated = false;
//     setTimeout(cb, 100);
//   },
// };
