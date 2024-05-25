import { actionReceiveOrder } from "./constant";
import { ItemData } from "../item/constant";
import { Order } from "../order/constant";

export const createReceiveOrder = (data: ItemData[]) => {
  console.warn("product create action", data);
  return {
    type: actionReceiveOrder.ADD_RECEIVE_ORDER,
    payload: data,
  };
};

// export const updateReceiveOrder = (data: ReceiveOrderData) => {
//   console.warn("product update action", data);
//   return {
//     type: actionReceiveOrder.UPDATE_RECEIVE_ORDER,
//     payload: data,
//   };
// };

export const getOrdersBySupplierId = (data: Order) => {
  console.warn("product get by id", data);
  return {
    type: actionReceiveOrder.LOAD_ALL_ORDER_SUPPLIER,
    payload: data,
  };
};

export const getReceiveOrdersByStatus = () => {
  console.warn("product get all");
  return {
    type: actionReceiveOrder.LOAD_ALL_RECEIVE_ORDER,
  };
};
