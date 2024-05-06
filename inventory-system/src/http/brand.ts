import axios, { AxiosRequestConfig } from "axios";
import { bgapiUrl } from "./_config";
export const createBrand = (
  data: string,
  headers: AxiosRequestConfig["headers"]
) => axios.post(bgapiUrl + "/api/brand", data, { headers });

export const getAllBrand = (headers: AxiosRequestConfig["headers"]) =>
  axios.get(bgapiUrl + "/api/brand", { headers });

export const getBrandById = (
  id: number,
  headers: AxiosRequestConfig["headers"]
) =>
  axios.get(bgapiUrl + `/api/brand/${id}`, {
    headers,
  });

export const editBrand = (
  id: number,
  data: string,
  headers: AxiosRequestConfig["headers"]
) => axios.put(bgapiUrl + `/api/brand/${id}`, data, { headers });
