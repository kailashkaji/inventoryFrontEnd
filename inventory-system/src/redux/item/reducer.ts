import { ResponseItem, ItemData, actionItem } from "./constant";

interface ItemState {
  loading: boolean;
  error?: string | null;
  isSuccess: boolean;
  isError: boolean;
  items: ItemData[];
}

const initialState: ItemState = {
  items: [],
  loading: false,
  error: null,
  isSuccess: false,
  isError: false,
};

const itemReducer = (state = initialState, action: ResponseItem): ItemState => {
  const updateState = Object.assign({}, state);
  switch (action.type) {
    case actionItem.ADD_ITEM:
      return {
        ...state,
        loading: true,
        error: null,
      };
    case actionItem.ADD_ITEM_SUCCESS: {
      console.warn("add item success");
      const item: ItemData[] = Object.assign(state.items, action.result);
      console.warn("add item ==>", item);

      return {
        ...state,
        items: item,
        loading: false,
        error: null,
        isSuccess: true,
        isError: false,
      };
    }
    case actionItem.ADD_ITEM_ERROR:
      return {
        ...state,
        loading: false,
        error: action.error,
        isSuccess: false,
        isError: true,
        items: Object.assign({}, state.items, action.result),
      };
    case actionItem.UPDATE_ITEM:
      return {
        ...state,
        loading: true,
        error: null,
      };
    case actionItem.UPDATE_ITEM_SUCCESS: {
      console.warn("add item success");
      const item: ItemData[] = Object.assign({}, state.items, action.result);
      console.warn("add item ==>", item);

      return {
        ...state,
        items: item,
        loading: false,
        error: null,
        isSuccess: true,
        isError: false,
      };
    }
    case actionItem.UPDATE_ITEM_ERROR:
      return {
        ...state,
        loading: false,
        error: action.error,
        isSuccess: false,
        isError: true,
        items: Object.assign({}, state.items, action.result),
      };
    case actionItem.LOAD_ALL_ITEM:
      return {
        ...state,
        loading: true,
        error: null,
      };
    case actionItem.LOAD_ALL_ITEM_SUCCESS: {
      console.warn("get all item ==>", action);

      return {
        ...state,
        items: action.result,
        loading: false,
        error: null,
        isSuccess: true,
        isError: false,
      };
    }
    case actionItem.LOAD_ALL_ITEM_ERROR:
      return {
        ...state,
        loading: false,
        error: action.error,
        isSuccess: false,
        isError: true,
        items: Object.assign({}, state.items, action.result),
      };
    case actionItem.LOAD_ITEM_REQUEST:
      return {
        ...state,
        loading: true,
        error: null,
      };
    case actionItem.LOAD_ITEM_SUCCESS: {
      console.warn("add item success");
      const item: ItemData[] = Object.assign({}, state.items, action.result);
      console.warn("add item ==>", item);

      return {
        ...state,
        items: item,
        loading: false,
        error: null,
        isSuccess: true,
        isError: false,
      };
    }
    case actionItem.LOAD_ITEM_ERROR:
      return {
        ...state,
        loading: false,
        error: action.error,
        isSuccess: false,
        isError: true,
        items: Object.assign({}, state.items, action.result),
      };
    default:
      return updateState;
  }
};
export default itemReducer;
