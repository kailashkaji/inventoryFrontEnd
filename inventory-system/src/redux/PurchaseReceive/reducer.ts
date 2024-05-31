import { Order, ResponseOrder } from "../order/constant";
import { ActionReceiveOrder, actionReceiveOrder } from "./constant";

interface OrderState {
  loading: boolean;
  error?: string | null;
  isSuccess: boolean;
  isError: boolean;
  orders: Order[];
}

const initialState: OrderState = {
  orders: [],
  loading: false,
  error: null,
  isSuccess: false,
  isError: false,
};

const orderReceiveReducer = (
  state = initialState,
  action: ResponseOrder
): OrderState => {
  switch (action.type as ActionReceiveOrder) {
    case actionReceiveOrder.LOAD_ALL_ORDER_SUPPLIER: {
      console.warn("this is called");
      return {
        ...state,
        orders: [],
        loading: true,
        isSuccess: false,
        error: null,
      };
    }

    case actionReceiveOrder.LOAD_ALL_ORDER_SUPPLIER_SUCCESS: {
      console.warn("get all order result by supplierId==>", action);

      return {
        ...state,
        orders: action.result,
        loading: false,
        error: null,
        isSuccess: true,
        isError: false,
      };
    }
    case actionReceiveOrder.LOAD_ALL_ORDER_SUPPLIER_ERROR:
      return {
        ...state,
        loading: false,
        error: action.error,
        isSuccess: false,
        isError: true,
        orders: [],
      };
    default:
      return state;
  }
};

export default orderReceiveReducer;
