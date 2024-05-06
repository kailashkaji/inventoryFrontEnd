import axios, { AxiosRequestConfig } from "axios";
import { bgapiUrl } from "./_config";
export const createSupplier = (
  data: string,
  headers: AxiosRequestConfig["headers"]
) => axios.post(bgapiUrl + "/api/supplier", data, { headers });

export const getAllSupplier = (headers: AxiosRequestConfig["headers"]) =>
  axios.get(bgapiUrl + "/api/supplier", { headers });

export const getSupplierById = (
  id: number,
  headers: AxiosRequestConfig["headers"]
) =>
  axios.get(bgapiUrl + `/api/supplier/${id}`, {
    headers,
  });

export const editSupplier = (
  id: number,
  data: string,
  headers: AxiosRequestConfig["headers"]
) => axios.put(bgapiUrl + `/api/supplier/${id}`, data, { headers });
