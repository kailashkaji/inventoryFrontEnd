import { Order, actionOrder } from "./constant";

export const createOrder = (data: Order) => {
  console.warn("order create action", data);
  return {
    type: actionOrder.CREATE_ORDER,
    payload: data,
  };
};

export const getOrderById = (id: number) => {
  console.warn("order get by id", id);
  return {
    type: actionOrder.GET_ORDER_BY_ID,
    payload: id,
  };
};

export const getAllOrders = () => {
  console.warn("get all orders");
  return {
    type: actionOrder.LOAD_ALL_ORDER,
  };
};