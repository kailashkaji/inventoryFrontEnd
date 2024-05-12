import { call, put, takeLatest } from "redux-saga/effects";
import { ActionOrder, actionOrder, Order } from "./constant";
import { createOrder, getOrderById } from "../../http/order";
import { AxiosResponse } from "axios";

function* createOrderSaga(action: { type: ActionOrder; payload: Order }): Generator<unknown, void, AxiosResponse<Order>> {
  try {
    const headerParams = {
      "Content-Type": "application/json",
    };
    const response: AxiosResponse<Order> = yield call(createOrder, JSON.stringify(action.payload), headerParams);
    yield put({ type: actionOrder.CREATE_ORDER_SUCCESS, payload: response.data });
  } catch (error) {
    yield put({ type: actionOrder.CREATE_ORDER_ERROR, error: JSON.stringify(error) });
  }
}

function* fetchOrderById(action: { type: ActionOrder; payload: Order }): Generator<unknown, void, AxiosResponse<Order>> {
  try {
    const headerParams = {
      "Content-Type": "application/json",
    };
    const response: AxiosResponse<Order> = yield call(getOrderById, action.payload.id!, headerParams);
    yield put({ type: actionOrder.GET_ORDER_BY_ID_SUCCESS, payload: response.data });
  } catch (error) {
    yield put({ type: actionOrder.GET_ORDER_BY_ID_ERROR, error: JSON.stringify(error) });
  }
}

function* orderSaga() {
  yield takeLatest(actionOrder.CREATE_ORDER, createOrderSaga);
  yield takeLatest(actionOrder.GET_ORDER_BY_ID, fetchOrderById);
}

export default orderSaga;
