import axios, { AxiosRequestConfig } from "axios";
import { bgapiUrl } from "./_config";

export const createOrder = (
  data: string,
  headers: AxiosRequestConfig["headers"]
) => axios.post(bgapiUrl + "/api/order", data, { headers });

export const getAllOrders = (headers: AxiosRequestConfig["headers"]) =>
  axios.get(bgapiUrl + "/api/order", { headers });

export const getOrderById = (
  id: number,
  headers: AxiosRequestConfig["headers"]
) =>
  axios.get(bgapiUrl + `/api/orer/${id}`, {
    headers,
  });
export const getOrderBySupplierId = (
  data: unknown,
  headers: AxiosRequestConfig["headers"]
) =>
  axios.get(bgapiUrl + "/api/order/getBySupplier", {
    params: data, // Use params to send query parameters
    headers: headers,
  });

export const getAllOrdersByStatus = (
  data: unknown,
  headers: AxiosRequestConfig["headers"]
) =>
  axios.get(bgapiUrl + "/api/order/getAllByStatus", {
    params: data, // Use params to send query parameters
    headers: headers,
  });
export const editOrder = (
  id: number,
  data: string,
  headers: AxiosRequestConfig["headers"]
) => axios.put(bgapiUrl + `/api/order/${id}`, data, { headers });
