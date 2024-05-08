import { call, put, takeLatest } from "redux-saga/effects";
import { ActionCategory, CategoryData, actionCategory } from "./constant";
import {
  createCategory,
  getAllCategory,
  getCategoryById,
  editCategory,
  getCategoryTree,
} from "../../http/category";
import { AxiosResponse } from "axios";

function* addCategory(action: {
  type: ActionCategory;
  payload: CategoryData;
}): Generator<unknown, void, AxiosResponse> {
  try {
    const headerParms = {
      "Content-Type": "application/json",
    };
    console.warn("category created ===>", action.payload);
    yield call(createCategory, JSON.stringify(action.payload), headerParms);
    const response2 = yield call(getCategoryTree, headerParms);
    const result = response2.data;
    yield put({ type: actionCategory.ADD_CATEGORY_SUCCESS, result });
  } catch (error) {
    yield put({
      type: actionCategory.ADD_CATEGORY_ERROR,
      error: JSON.stringify(error),
    });
  }
}

function* updateCategory(action: {
  type: ActionCategory;
  payload: CategoryData;
}): Generator<unknown, void, AxiosResponse> {
  try {
    const headerParms = {
      "Content-Type": "application/json",
    };
    console.warn("category created ===>", action.payload);
    const response = yield call(
      editCategory,
      action.payload.id,
      JSON.stringify(action.payload),
      headerParms
    );
    console.warn("category updated ===>", response);
    const result = response.data;
    yield put({ type: actionCategory.UPDATE_CATEGORY_SUCCESS, result });
  } catch (error) {
    yield put({
      type: actionCategory.UPDATE_CATEGORY_ERROR,
      error: JSON.stringify(error),
    });
  }
}
function* fetchAllCategory(): Generator<unknown, void, AxiosResponse> {
  try {
    const headerParms = {
      "Content-Type": "application/json",
    };
    const response = yield call(getAllCategory, headerParms);
    const result = response.data;
    console.warn("category updated ===>", response.data);
    yield put({ type: actionCategory.LOAD_ALL_CATEGORY_SUCCESS, result });
  } catch (error) {
    console.warn("get all category error", error);
    yield put({
      type: actionCategory.LOAD_ALL_CATEGORY_ERROR,
      error: JSON.stringify(error),
    });
  }
}
function* fetchCategoryById(action: {
  type: ActionCategory;
  payload: CategoryData;
}): Generator<unknown, void, AxiosResponse> {
  try {
    const headerParms = {
      "Content-Type": "application/json",
    };
    const response = yield call(
      getCategoryById,
      action.payload.id,
      headerParms
    );
    console.warn("category get by id ===>", response);
    const result = response.data;
    yield put({ type: actionCategory.LOAD_CATEGORY_SUCCESS, result });
  } catch (error) {
    yield put({
      type: actionCategory.LOAD_CATEGORY_ERROR,
      error: JSON.stringify(error),
    });
  }
}
function* fetchCategoryTree(): Generator<unknown, void, AxiosResponse> {
  try {
    const headerParms = {
      "Content-Type": "application/json",
    };
    const response = yield call(getCategoryTree, headerParms);
    console.warn("category get tree ===>", response);
    const result = response.data;
    yield put({ type: actionCategory.LOAD_TREE_CATEGORY_SUCCESS, result });
  } catch (error) {
    yield put({
      type: actionCategory.LOAD_TREE_CATEGORY_ERROR,
      error: JSON.stringify(error),
    });
  }
}
function* categorySaga() {
  yield takeLatest(actionCategory.ADD_CATEGORY, addCategory);
  yield takeLatest(actionCategory.UPDATE_CATEGORY, updateCategory);
  yield takeLatest(actionCategory.LOAD_ALL_CATEGORY, fetchAllCategory);
  yield takeLatest(actionCategory.LOAD_CATEGORY_REQUEST, fetchCategoryById);
  yield takeLatest(actionCategory.LOAD_TREE_CATEGORY, fetchCategoryTree);
}

export default categorySaga;
