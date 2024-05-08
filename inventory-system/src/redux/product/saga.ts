import { call, put, takeLatest } from "redux-saga/effects";
import { ActionProduct, ProductData, actionProduct } from "./constant";
import {
  createProduct,
  getAllProduct,
  getProductById,
  editProduct,
} from "../../http/product";
import { AxiosResponse } from "axios";

function* addProduct(action: {
  type: ActionProduct;
  payload: ProductData;
}): Generator<unknown, void, AxiosResponse> {
  try {
    const headerParms = {
      "Content-Type": "application/json",
    };
    console.warn("product created ===>", action.payload);
    const response = yield call(
      createProduct,
      JSON.stringify(action.payload),
      headerParms
    );
    const result = response.data;
    console.warn("product created ===>", response);
    yield put({ type: actionProduct.ADD_PRODUCT_SUCCESS, result });
  } catch (error) {
    yield put({
      type: actionProduct.ADD_PRODUCT_ERROR,
      error: JSON.stringify(error),
    });
  }
}

function* updateProduct(action: {
  type: ActionProduct;
  payload: ProductData;
}): Generator<unknown, void, AxiosResponse> {
  try {
    const headerParms = {
      "Content-Type": "application/json",
    };
    console.warn("product created ===>", action.payload);
    const response = yield call(
      editProduct,
      action.payload.id,
      JSON.stringify(action.payload),
      headerParms
    );
    console.warn("product updated ===>", response);
    const result = response.data;
    yield put({ type: actionProduct.UPDATE_PRODUCT_SUCCESS, result });
  } catch (error) {
    yield put({
      type: actionProduct.UPDATE_PRODUCT_ERROR,
      error: JSON.stringify(error),
    });
  }
}
function* fetchAllProduct(): Generator<unknown, void, AxiosResponse> {
  try {
    const headerParms = {
      "Content-Type": "application/json",
    };
    const response = yield call(getAllProduct, headerParms);
    const result = response.data;
    console.warn("product updated ===>", response.data);
    yield put({ type: actionProduct.LOAD_ALL_PRODUCT_SUCCESS, result });
  } catch (error) {
    console.warn("get all product error", error);
    yield put({
      type: actionProduct.LOAD_ALL_PRODUCT_ERROR,
      error: JSON.stringify(error),
    });
  }
}
function* fetchProductById(action: {
  type: ActionProduct;
  payload: ProductData;
}): Generator<unknown, void, AxiosResponse> {
  try {
    const headerParms = {
      "Content-Type": "application/json",
    };
    const response = yield call(getProductById, action.payload.id, headerParms);
    console.warn("product get by id ===>", response);
    const result = response.data;
    yield put({ type: actionProduct.LOAD_PRODUCT_SUCCESS, result });
  } catch (error) {
    yield put({
      type: actionProduct.LOAD_PRODUCT_ERROR,
      error: JSON.stringify(error),
    });
  }
}
function* productSaga() {
  yield takeLatest(actionProduct.ADD_PRODUCT, addProduct);
  yield takeLatest(actionProduct.UPDATE_PRODUCT, updateProduct);
  yield takeLatest(actionProduct.LOAD_ALL_PRODUCT, fetchAllProduct);
  yield takeLatest(actionProduct.LOAD_PRODUCT_REQUEST, fetchProductById);
}

export default productSaga;
