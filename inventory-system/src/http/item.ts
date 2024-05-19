import axios, { AxiosRequestConfig } from "axios";
import { bgapiUrl } from "./_config";
export const createItem = (
  data: string,
  headers: AxiosRequestConfig["headers"]
) => axios.post(bgapiUrl + "/api/item", data, { headers });

export const getAllItem = (headers: AxiosRequestConfig["headers"]) =>
  axios.get(bgapiUrl + "/api/item", { headers });

export const getAllActiveItem = (headers: AxiosRequestConfig["headers"]) =>
  axios.get(bgapiUrl + "/api/item/allActiveItems", { headers });

export const getItemById = (
  id: number,
  headers: AxiosRequestConfig["headers"]
) =>
  axios.get(bgapiUrl + `/api/item/${id}`, {
    headers,
  });

export const editItem = (
  id: number,
  data: string,
  headers: AxiosRequestConfig["headers"]
) => axios.put(bgapiUrl + `/api/item/${id}`, data, { headers });
