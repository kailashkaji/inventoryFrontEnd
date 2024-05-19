import { call, put, takeLatest } from "redux-saga/effects";
import { ActionItem, ItemData, actionItem } from "./constant";
import {
  createItem,
  getAllItem,
  getItemById,
  editItem,
  getAllActiveItem,
} from "../../http/item";
import { AxiosResponse } from "axios";

function* addItem(action: {
  type: ActionItem;
  payload: ItemData;
}): Generator<unknown, void, AxiosResponse> {
  try {
    const headerParms = {
      "Content-Type": "application/json",
    };
    console.warn("item created ===>", action.payload);
    const response = yield call(
      createItem,
      JSON.stringify(action.payload),
      headerParms
    );
    const result = response.data;
    console.warn("item created ===>", response);
    yield put({ type: actionItem.ADD_ITEM_SUCCESS, result });
  } catch (error) {
    yield put({
      type: actionItem.ADD_ITEM_ERROR,
      error: JSON.stringify(error),
    });
  }
}

function* updateItem(action: {
  type: ActionItem;
  payload: ItemData;
}): Generator<unknown, void, AxiosResponse> {
  try {
    const headerParms = {
      "Content-Type": "application/json",
    };
    console.warn("item created ===>", action.payload);
    const response = yield call(
      editItem,
      action.payload.id,
      JSON.stringify(action.payload),
      headerParms
    );
    console.warn("item updated ===>", response);
    const result = response.data;
    yield put({ type: actionItem.UPDATE_ITEM_SUCCESS, result });
  } catch (error) {
    yield put({
      type: actionItem.UPDATE_ITEM_ERROR,
      error: JSON.stringify(error),
    });
  }
}
function* fetchAllItem(): Generator<unknown, void, AxiosResponse> {
  try {
    const headerParms = {
      "Content-Type": "application/json",
    };
    const response = yield call(getAllItem, headerParms);
    const result = response.data;
    console.warn("item updated ===>", response.data);
    yield put({ type: actionItem.LOAD_ALL_ITEM_SUCCESS, result });
  } catch (error) {
    console.warn("get all item error", error);
    yield put({
      type: actionItem.LOAD_ALL_ITEM_ERROR,
      error: JSON.stringify(error),
    });
  }
}
function* fetchAllActiveItem(): Generator<unknown, void, AxiosResponse> {
  try {
    const headerParms = {
      "Content-Type": "application/json",
    };
    const response = yield call(getAllActiveItem, headerParms);
    const result = response.data;
    console.warn("item updated ===>", response.data);
    yield put({ type: actionItem.LOAD_ALL_ACTIVE_ITEM_SUCCESS, result });
  } catch (error) {
    console.warn("get all active item error", error);
    yield put({
      type: actionItem.LOAD_ALL_ACTIVE_ITEM_ERROR,
      error: JSON.stringify(error),
    });
  }
}
function* fetchItemById(action: {
  type: ActionItem;
  payload: ItemData;
}): Generator<unknown, void, AxiosResponse> {
  try {
    const headerParms = {
      "Content-Type": "application/json",
    };
    const response = yield call(getItemById, action.payload.id, headerParms);
    console.warn("item get by id ===>", response);
    const result = response.data;
    yield put({ type: actionItem.LOAD_ITEM_SUCCESS, result });
  } catch (error) {
    yield put({
      type: actionItem.LOAD_ITEM_ERROR,
      error: JSON.stringify(error),
    });
  }
}
function* itemSaga() {
  yield takeLatest(actionItem.ADD_ITEM, addItem);
  yield takeLatest(actionItem.UPDATE_ITEM, updateItem);
  yield takeLatest(actionItem.LOAD_ALL_ITEM, fetchAllItem);
  yield takeLatest(actionItem.LOAD_ITEM_REQUEST, fetchItemById);
  yield takeLatest(actionItem.LOAD_ALL_ACTIVE_ITEM, fetchAllActiveItem);
}

export default itemSaga;
