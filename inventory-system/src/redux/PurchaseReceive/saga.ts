import { call, put, takeLatest } from "redux-saga/effects";

import { AxiosResponse } from "axios";
import { ActionReceiveOrder, actionReceiveOrder } from "./constant";
import { Order } from "../order/constant";
import { getOrderBySupplierId } from "../../http/order";

function* getOrderBySupplier(action: {
  type: ActionReceiveOrder;
  payload: Order;
}): Generator<unknown, void, AxiosResponse> {
  try {
    const headerParms = {
      "Content-Type": "application/json",
    };
    console.warn("product created ===>", action.payload);
    const response = yield call(
      getOrderBySupplierId,
      {
        userId: action.payload.userId,
        type: action.payload.type,
        status: action.payload.status,
      },
      headerParms
    );
    const result = response.data;
    console.warn("product created ===>", response);
    yield put({
      type: actionReceiveOrder.LOAD_ALL_ORDER_SUPPLIER_SUCCESS,
      result,
    });
  } catch (error) {
    yield put({
      type: actionReceiveOrder.LOAD_ALL_ORDER_SUPPLIER_ERROR,
      error: JSON.stringify(error),
    });
  }
}

function* orderReceiveSaga() {
  yield takeLatest(
    actionReceiveOrder.LOAD_ALL_ORDER_SUPPLIER,
    getOrderBySupplier
  );
}

export default orderReceiveSaga;
