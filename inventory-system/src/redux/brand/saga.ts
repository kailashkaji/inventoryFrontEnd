import { call, put, takeLatest } from "redux-saga/effects";
import { ActionBrand, BrandData, actionBrand } from "./constant";
import {
  createBrand,
  getAllBrand,
  getBrandById,
  editBrand,
} from "../../http/brand";
import { AxiosResponse } from "axios";

function* addBrand(action: {
  type: ActionBrand;
  payload: BrandData;
}): Generator<unknown, void, AxiosResponse> {
  try {
    const headerParms = {
      "Content-Type": "application/json",
    };
    console.warn("brand created ===>", action.payload);
    const response = yield call(
      createBrand,
      JSON.stringify(action.payload),
      headerParms
    );
    const result = response.data;
    console.warn("brand created ===>", response);
    yield put({ type: actionBrand.ADD_BRAND_SUCCESS, result });
  } catch (error) {
    yield put({
      type: actionBrand.ADD_BRAND_ERROR,
      error: JSON.stringify(error),
    });
  }
}

function* updateBrand(action: {
  type: ActionBrand;
  payload: BrandData;
}): Generator<unknown, void, AxiosResponse> {
  try {
    const headerParms = {
      "Content-Type": "application/json",
    };
    console.warn("brand created ===>", action.payload);
    const response = yield call(
      editBrand,
      action.payload.id,
      JSON.stringify(action.payload),
      headerParms
    );
    console.warn("brand updated ===>", response);
    const result = response.data;
    yield put({ type: actionBrand.UPDATE_BRAND_SUCCESS, result });
  } catch (error) {
    yield put({
      type: actionBrand.UPDATE_BRAND_ERROR,
      error: JSON.stringify(error),
    });
  }
}
function* fetchAllBrand(): Generator<unknown, void, AxiosResponse> {
  try {
    const headerParms = {
      "Content-Type": "application/json",
    };
    const response = yield call(getAllBrand, headerParms);
    const result = response.data;
    console.warn("brand updated ===>", response.data);
    yield put({ type: actionBrand.LOAD_ALL_BRAND_SUCCESS, result });
  } catch (error) {
    console.warn("get all brand error", error);
    yield put({
      type: actionBrand.LOAD_ALL_BRAND_ERROR,
      error: JSON.stringify(error),
    });
  }
}
function* fetchBrandById(action: {
  type: ActionBrand;
  payload: BrandData;
}): Generator<unknown, void, AxiosResponse> {
  try {
    const headerParms = {
      "Content-Type": "application/json",
    };
    const response = yield call(getBrandById, action.payload.id, headerParms);
    console.warn("brand get by id ===>", response);
    const result = response.data;
    yield put({ type: actionBrand.LOAD_BRAND_SUCCESS, result });
  } catch (error) {
    yield put({
      type: actionBrand.LOAD_BRAND_ERROR,
      error: JSON.stringify(error),
    });
  }
}
function* brandSaga() {
  yield takeLatest(actionBrand.ADD_BRAND, addBrand);
  yield takeLatest(actionBrand.UPDATE_BRAND, updateBrand);
  yield takeLatest(actionBrand.LOAD_ALL_BRAND, fetchAllBrand);
  yield takeLatest(actionBrand.LOAD_BRAND_REQUEST, fetchBrandById);
}

export default brandSaga;
