import { ActionOrder, actionOrder, Order, ResponseOrder } from "./constant";

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

const orderReducer = (
  state = initialState,
  action: ResponseOrder
): OrderState => {
  switch (action.type as ActionOrder) {
    case actionOrder.CREATE_ORDER:
    case actionOrder.GET_ORDER_BY_ID:
      return {
        ...state,
        loading: true,
        error: null,
      };
    case actionOrder.CREATE_ORDER_SUCCESS:
      return {
        ...state,
        orders: [...state.orders, action.payload!],
        loading: false,
        error: null,
        isSuccess: true,
        isError: false,
      };
    case actionOrder.CREATE_ORDER_ERROR:
    case actionOrder.GET_ORDER_BY_ID_ERROR:
      return {
        ...state,
        loading: false,
        error: action.error,
        isSuccess: false,
        isError: true,
      };
    case actionOrder.GET_ORDER_BY_ID_SUCCESS:
      return {
        ...state,
        orders: [...state.orders, action.payload!],
        loading: false,
        error: null,
        isSuccess: true,
        isError: false,
      };
      case actionOrder.LOAD_ALL_ORDER:
      return {
        ...state,
        loading: true,
        error: null,
      };
    case actionOrder.LOAD_ALL_ORDER_SUCCESS: {
      console.warn("get all supplier ==>", action);

      return {
        ...state,
        orders: [...state.orders, action.payload!],
        loading: false,
        error: null,
        isSuccess: true,
        isError: false,
      };
    }
    case actionOrder.LOAD_ALL_ORDER_ERROR:
      return {
        ...state,
        loading: false,
        error: action.error,
        isSuccess: false,
        isError: true,
        orders: Object.assign({}, state.orders, [...state.orders, action.payload!]),
      };
    default:
      return state;
  }
};

export default orderReducer;
