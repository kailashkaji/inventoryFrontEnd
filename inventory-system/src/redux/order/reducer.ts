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
        orders: action.result,
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

    case actionOrder.LOAD_ALL_ORDER: {
      console.warn("this is called");
      return {
        ...state,
        orders: [],
        loading: true,
        isSuccess: false,
        error: null,
      };
    }

    case actionOrder.LOAD_ALL_ORDER_SUCCESS: {
      console.warn("get all order result ==>", action);

      return {
        ...state,
        orders: action.result,
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
        orders: [],
      };
    case actionOrder.LOAD_ALL_ORDER_BY_STATUS: {
      return {
        ...state,
        orders: [],
        loading: true,
        isSuccess: false,
        error: null,
      };
    }

    case actionOrder.LOAD_ALL_ORDER_BY_STATUS_SUCCESS: {
      return {
        ...state,
        orders: action.result,
        loading: false,
        error: null,
        isSuccess: true,
        isError: false,
      };
    }
    case actionOrder.LOAD_ALL_ORDER_BY_STATUS_ERROR:
      return {
        ...state,
        loading: false,
        error: action.error,
        isSuccess: false,
        isError: true,
        orders: [],
      };
    case actionOrder.UPDATE_ORDER:
      return {
        ...state,
        loading: true,
        error: null,
      };
    case actionOrder.UPDATE_ORDER_SUCCESS: {
      const item: Order[] = Object.assign({}, state.orders, action.result);
      console.warn("add item ==>", item);

      return {
        ...state,
        orders: action.result,
        loading: false,
        error: null,
        isSuccess: true,
        isError: false,
      };
    }
    case actionOrder.UPDATE_ORDER_ERROR:
      return {
        ...state,
        loading: false,
        error: action.error,
        isSuccess: false,
        isError: true,
      };
    default:
      return state;
  }
};

export default orderReducer;
