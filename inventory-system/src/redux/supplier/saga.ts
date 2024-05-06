import { call, put, takeLatest } from "redux-saga/effects";
import { ActionSupplier, SupplierData, actionSupplier } from "./constant";
import {
  createSupplier,
  getAllSupplier,
  getSupplierById,
  editSupplier,
} from "../../http/supplier";
import { AxiosResponse } from "axios";

function* addSupplier(action: {
  type: ActionSupplier;
  payload: SupplierData;
}): Generator<unknown, void, AxiosResponse> {
  try {
    const headerParms = {
      "Content-Type": "application/json",
    };
    console.warn("supplier created ===>", action.payload);
    const response = yield call(
      createSupplier,
      JSON.stringify(action.payload),
      headerParms
    );
    const result = response.data;
    console.warn("supplier created ===>", response);
    yield put({ type: actionSupplier.ADD_SUPPLIER_SUCCESS, result });
  } catch (error) {
    yield put({
      type: actionSupplier.ADD_SUPPLIER_ERROR,
      error: JSON.stringify(error),
    });
  }
}

function* updateSupplier(action: {
  type: ActionSupplier;
  payload: SupplierData;
}): Generator<unknown, void, AxiosResponse> {
  try {
    const headerParms = {
      "Content-Type": "application/json",
    };
    console.warn("supplier created ===>", action.payload);
    const response = yield call(
      editSupplier,
      action.payload.id,
      JSON.stringify(action.payload),
      headerParms
    );
    console.warn("supplier updated ===>", response);
    const result = response.data;
    yield put({ type: actionSupplier.UPDATE_SUPPLIER_SUCCESS, result });
  } catch (error) {
    yield put({
      type: actionSupplier.UPDATE_SUPPLIER_ERROR,
      error: JSON.stringify(error),
    });
  }
}
function* fetchAllSupplier(): Generator<unknown, void, AxiosResponse> {
  try {
    const headerParms = {
      "Content-Type": "application/json",
    };
    const response = yield call(getAllSupplier, headerParms);
    const result = response.data;
    console.warn("supplier updated ===>", response.data);
    yield put({ type: actionSupplier.LOAD_ALL_SUPPLIER_SUCCESS, result });
  } catch (error) {
    console.warn("get all supplier error", error);
    yield put({
      type: actionSupplier.LOAD_ALL_SUPPLIER_ERROR,
      error: JSON.stringify(error),
    });
  }
}
function* fetchSupplierById(action: {
  type: ActionSupplier;
  payload: SupplierData;
}): Generator<unknown, void, AxiosResponse> {
  try {
    const headerParms = {
      "Content-Type": "application/json",
    };
    const response = yield call(
      getSupplierById,
      action.payload.id,
      headerParms
    );
    console.warn("supplier get by id ===>", response);
    const result = response.data;
    yield put({ type: actionSupplier.LOAD_SUPPLIER_SUCCESS, result });
  } catch (error) {
    yield put({
      type: actionSupplier.LOAD_SUPPLIER_ERROR,
      error: JSON.stringify(error),
    });
  }
}
function* supplierSaga() {
  yield takeLatest(actionSupplier.ADD_SUPPLIER, addSupplier);
  yield takeLatest(actionSupplier.UPDATE_SUPPLIER, updateSupplier);
  yield takeLatest(actionSupplier.LOAD_ALL_SUPPLIER, fetchAllSupplier);
  yield takeLatest(actionSupplier.LOAD_SUPPLIER_REQUEST, fetchSupplierById);
}

export default supplierSaga;
