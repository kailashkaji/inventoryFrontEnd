import axios, { AxiosRequestConfig } from "axios";
import { bgapiUrl } from "./_config";
export const createCategory = (
  data: string,
  headers: AxiosRequestConfig["headers"]
) => axios.post(bgapiUrl + "/api/category", data, { headers });

export const getAllCategory = (headers: AxiosRequestConfig["headers"]) =>
  axios.get(bgapiUrl + "/api/category", { headers });
export const getCategoryTree = (headers: AxiosRequestConfig["headers"]) =>
  axios.get(bgapiUrl + "/api/category/tree", { headers });

export const getCategoryById = (
  id: number,
  headers: AxiosRequestConfig["headers"]
) =>
  axios.get(bgapiUrl + `/api/category/${id}`, {
    headers,
  });

export const editCategory = (
  id: number,
  data: string,
  headers: AxiosRequestConfig["headers"]
) => axios.put(bgapiUrl + `/api/category/${id}`, data, { headers });
