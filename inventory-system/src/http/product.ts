import axios, { AxiosRequestConfig } from "axios";
import { bgapiUrl } from "./_config";
export const createProduct = (
  data: string,
  headers: AxiosRequestConfig["headers"]
) => axios.post(bgapiUrl + "/api/product", data, { headers });

export const getAllProduct = (headers: AxiosRequestConfig["headers"]) =>
  axios.get(bgapiUrl + "/api/product", { headers });

export const getProductById = (
  id: number,
  headers: AxiosRequestConfig["headers"]
) =>
  axios.get(bgapiUrl + `/api/product/${id}`, {
    headers,
  });

export const editProduct = (
  id: number,
  data: string,
  headers: AxiosRequestConfig["headers"]
) => axios.put(bgapiUrl + `/api/product/${id}`, data, { headers });
