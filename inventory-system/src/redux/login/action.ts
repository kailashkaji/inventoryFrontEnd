import { actionTypesLogin } from "./constant";

export const UserLogin = (data: Record<string, string | null>) => {
  console.warn("User Login Action", data);
  return {
    type: actionTypesLogin.USER_LOGIN,
    data: data,
  };
};

export const UserLogout = () => {
  console.warn("User logout Action");
  return {
    type: actionTypesLogin.USER_LOGOUT,
  };
};

export const AssignLoginCredential = (
  data: Record<string, string | number | boolean>
) => {
  console.warn("Assign Login Credentials Action", data);
  return {
    type: actionTypesLogin.ASSIGN_LOGIN_CREDENTIAL,
    data: data,
  };
};

export const ValidateAuth = () => {
  return {
    type: actionTypesLogin.VALIDATE_AUTH,
  };
};
