import { Transaction, actionTransaction } from "./constant";

export const createTransaction = (data: Transaction) => {
  console.warn("transaction create action", data);
  return {
    type: actionTransaction.ADD_TRANSACTION,
    payload: data,
  };
};

export const updateTransaction = (data: Transaction) => {
  console.warn("transaction update action", data);
  return {
    type: actionTransaction.UPDATE_TRANSACTION,
    payload: data,
  };
};

export const getTransactionById = (data: Transaction) => {
  console.warn("transaction get by id", data);
  return {
    type: actionTransaction.LOAD_TRANSACTION_REQUEST,
    payload: data,
  };
};

export const getTransactions = () => {
  console.warn("transaction get all");
  return {
    type: actionTransaction.LOAD_ALL_TRANSACTION,
  };
};
