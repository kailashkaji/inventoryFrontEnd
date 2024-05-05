import axios, { AxiosRequestConfig } from "axios";
import { bgapiUrl } from "./_config";

export const httpLogin = (
  data: string,
  headers: AxiosRequestConfig["headers"]
) => axios.post(bgapiUrl + "/api/auth/login", data, { headers });

export const ValidateAuth = (headers: AxiosRequestConfig["headers"]) =>
  axios.get(bgapiUrl + "/api/secret", { headers });

export const httpRegister = (
  data: string,
  headers: AxiosRequestConfig["headers"]
) => axios.post(bgapiUrl + "/api/auth/save", data, { headers });

export const httpLogout = (headers: AxiosRequestConfig["headers"]) =>
  axios.post(bgapiUrl + "/api/auth/logout", { headers });

// export const httpGetOnboarding = () =>
//     axios.get(baseUrl + '/onboarding/onboarding/GetAllOnboarding');

// export const httpGetOnboardingType = () =>
//     axios.get(baseUrl + '/onboarding/onboarding/GetOnboardingType');

// export const httpPostOnboarding = (data) =>
//     axios.post(baseUrl + '/onboarding/onboarding/PostOnboarding', data);

// export const httpPutOnboarding = (id, data) =>
//     axios.put(baseUrl + `/onboarding/onboarding/PutOnboarding/${id}`, data);

// export const httpLoadOnboarding = (id) =>
//     axios.get(baseUrl + `/onboarding/onboarding/GetOnboardingById/${id}`);
