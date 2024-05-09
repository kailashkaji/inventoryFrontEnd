import axios, { AxiosRequestConfig } from "axios";
import { bgapiUrl } from "./_config";

export const createTransaction = (
  data: string,
  headers: AxiosRequestConfig["headers"]
) => axios.post(bgapiUrl + "/api/transaction", data, { headers });

export const getAllTransactions = (
  headers: AxiosRequestConfig["headers"]
) => axios.get(bgapiUrl + "/api/transaction", { headers });

export const getTransactionById = (
  id: number,
  headers: AxiosRequestConfig["headers"]
) => axios.get(bgapiUrl + `/api/transaction/${id}`, { headers });

export const updateTransaction = (
  id: number,
  data: string,
  headers: AxiosRequestConfig["headers"]
) => axios.put(bgapiUrl + `/api/transaction/${id}`, data, { headers });
