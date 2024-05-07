import { actionTypesLogin } from "./constant";

export const UserLogin = (data: Record<string, string | null>) => {
  console.warn("User Login Action", data);
  return {
    type: actionTypesLogin.USER_LOGIN,
    data: data,
  };
};

export const UserClear = () => {
  return {
    type: actionTypesLogin.USER_CLEAR,
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
