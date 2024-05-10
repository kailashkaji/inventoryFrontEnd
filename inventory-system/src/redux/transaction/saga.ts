import { call, put, takeLatest } from "redux-saga/effects";
import { ActionTransaction, Transaction, actionTransaction } from "./constant";
import {
  createTransaction,
  getAllTransactions,
  getTransactionById,
  updateTransaction,
} from "../../http/transaction.ts";
import { AxiosResponse } from "axios";

function* addTransaction(action: {
  type: ActionTransaction;
  payload: Transaction;
}): Generator<unknown, void, AxiosResponse> {
  try {
    const headerParms = {
      "Content-Type": "application/json",
    };
    console.warn("transaction created ===>", action.payload);
    const response = yield call(
      createTransaction,
      JSON.stringify(action.payload),
      headerParms
    );
    const result = response.data;
    console.warn("transaction created ===>", response);
    yield put({ type: actionTransaction.ADD_TRANSACTION_SUCCESS, result });
  } catch (error) {
    yield put({
      type: actionTransaction.ADD_TRANSACTION_ERROR,
      error: JSON.stringify(error),
    });
  }
}

function* updateTransactionSaga(action: {
  type: ActionTransaction;
  payload: Transaction;
}): Generator<unknown, void, AxiosResponse> {
  try {
    const headerParms = {
      "Content-Type": "application/json",
    };
    const { payload } = action;
    if (payload.id !== undefined) { 
      const response = yield call(
        updateTransaction,
        payload.id,
        JSON.stringify(payload),
        headerParms
      );
      console.warn("transaction updated ===>", response);
      const result = response.data;
      yield put({ type: actionTransaction.UPDATE_TRANSACTION_SUCCESS, result });
    } else {
      // Handle the case where id is undefined
      throw new Error("Transaction ID is undefined");
    }
  } catch (error) {
    yield put({
      type: actionTransaction.UPDATE_TRANSACTION_ERROR,
      error: JSON.stringify(error),
    });
  }
}

function* fetchAllTransactions(): Generator<unknown, void, AxiosResponse> {
  try {
    const headerParms = {
      "Content-Type": "application/json",
    };
    const response = yield call(getAllTransactions, headerParms);
    const result = response.data;
    console.warn("transactions fetched ===>", response.data);
    yield put({ type: actionTransaction.LOAD_ALL_TRANSACTION_SUCCESS, result });
  } catch (error) {
    console.warn("get all transactions error", error);
    yield put({
      type: actionTransaction.LOAD_ALL_TRANSACTION_ERROR,
      error: JSON.stringify(error),
    });
  }
}

function* fetchTransactionById(action: {
  type: ActionTransaction;
  payload: Transaction;
}): Generator<unknown, void, AxiosResponse> {
  try {
    const headerParms = {
      "Content-Type": "application/json",
    };
    const { payload } = action;
    if (payload.id !== undefined) { 
      const response = yield call({
        fn: getTransactionById,
        context: null,
      }, payload.id, headerParms);
      console.warn("transaction get by id ===>", response);
      const result = response.data;
      yield put({ type: actionTransaction.LOAD_TRANSACTION_SUCCESS, result });
    } else {
      throw new Error("Transaction ID is undefined");
    }
  } catch (error) {
    yield put({
      type: actionTransaction.LOAD_TRANSACTION_ERROR,
      error: JSON.stringify(error),
    });
  }
}

function* transactionSaga() {
  yield takeLatest(actionTransaction.ADD_TRANSACTION, addTransaction);
  yield takeLatest(actionTransaction.UPDATE_TRANSACTION, updateTransactionSaga);
  yield takeLatest(actionTransaction.LOAD_ALL_TRANSACTION, fetchAllTransactions);
  yield takeLatest(actionTransaction.LOAD_TRANSACTION_REQUEST, fetchTransactionById);
}

export default transactionSaga;
