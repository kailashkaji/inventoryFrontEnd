import { call, put, takeLatest } from "redux-saga/effects";
import { ActionOrder, actionOrder, Order } from "./constant";
import {
  createOrder,
  getOrderById,
  getAllOrders,
  editOrder,
  getAllOrdersByStatus,
} from "../../http/order";
import { AxiosResponse } from "axios";

function* createOrderSaga(action: {
  type: ActionOrder;
  payload: Order;
}): Generator<unknown, void, AxiosResponse<Order>> {
  try {
    const headerParams = {
      "Content-Type": "application/json",
    };
    const response: AxiosResponse<Order> = yield call(
      createOrder,
      JSON.stringify(action.payload),
      headerParams
    );
    console.log(response);
    const response1 = yield call(getAllOrders, headerParams);
    yield put({
      type: actionOrder.CREATE_ORDER_SUCCESS,
      result: response1.data,
    });
  } catch (error) {
    yield put({
      type: actionOrder.CREATE_ORDER_ERROR,
      error: JSON.stringify(error),
    });
  }
}

function* updateOrder(action: {
  type: ActionOrder;
  payload: Order;
}): Generator<unknown, void, AxiosResponse<Order>> {
  try {
    const headerParams = {
      "Content-Type": "application/json",
    };
    const response: AxiosResponse<Order> = yield call(
      editOrder,
      action.payload.id ?? 0,
      JSON.stringify(action.payload),
      headerParams
    );
    console.log(response);
    const response1 = yield call(getAllOrders, headerParams);
    yield put({
      type: actionOrder.UPDATE_ORDER_SUCCESS,
      result: response1.data,
    });
  } catch (error) {
    yield put({
      type: actionOrder.UPDATE_ORDER_ERROR,
      error: JSON.stringify(error),
    });
  }
}

function* fetchOrderById(action: {
  type: ActionOrder;
  payload: Order;
}): Generator<unknown, void, AxiosResponse<Order>> {
  try {
    const headerParams = {
      "Content-Type": "application/json",
    };
    const response: AxiosResponse<Order> = yield call(
      getOrderById,
      action.payload.id!,
      headerParams
    );
    yield put({
      type: actionOrder.GET_ORDER_BY_ID_SUCCESS,
      payload: response.data,
    });
  } catch (error) {
    yield put({
      type: actionOrder.GET_ORDER_BY_ID_ERROR,
      error: JSON.stringify(error),
    });
  }
}

function* fetchAllOrder(): Generator<unknown, void, AxiosResponse> {
  try {
    const headerParms = {
      "Content-Type": "application/json",
    };
    const response = yield call(getAllOrders, headerParms);
    const result = response.data;
    yield put({ type: actionOrder.LOAD_ALL_ORDER_SUCCESS, result });
  } catch (error) {
    console.warn("get all order error", error);
    yield put({
      type: actionOrder.LOAD_ALL_ORDER_ERROR,
      error: JSON.stringify(error),
    });
  }
}

function* getOrderListByStatus(action: {
  type: ActionOrder;
  payload: Order;
}): Generator<unknown, void, AxiosResponse> {
  try {
    const headerParms = {
      "Content-Type": "application/json",
    };
    const response = yield call(
      getAllOrdersByStatus,
      {
        status: action.payload.status,
      },
      headerParms
    );
    const result = response.data;
    yield put({ type: actionOrder.LOAD_ALL_ORDER_SUCCESS, result });
  } catch (error) {
    console.warn("get all order error", error);
    yield put({
      type: actionOrder.LOAD_ALL_ORDER_ERROR,
      error: JSON.stringify(error),
    });
  }
}

function* orderSaga() {
  yield takeLatest(actionOrder.CREATE_ORDER, createOrderSaga);
  yield takeLatest(actionOrder.LOAD_ALL_ORDER, fetchAllOrder);
  yield takeLatest(actionOrder.GET_ORDER_BY_ID, fetchOrderById);
  yield takeLatest(actionOrder.UPDATE_ORDER, updateOrder);
  yield takeLatest(actionOrder.LOAD_ALL_ORDER_BY_STATUS, getOrderListByStatus);
}

export default orderSaga;
