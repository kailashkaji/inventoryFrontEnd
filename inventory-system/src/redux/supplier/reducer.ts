import { ResponseSupplier, SupplierData, actionSupplier } from "./constant";

interface SupplierState {
  loading: boolean;
  error?: string | null;
  isSuccess: boolean;
  isError: boolean;
  suppliers: SupplierData[];
}

const initialState: SupplierState = {
  suppliers: [],
  loading: false,
  error: null,
  isSuccess: false,
  isError: false,
};

const supplierReducer = (
  state = initialState,
  action: ResponseSupplier
): SupplierState => {
  const updateState = Object.assign({}, state);
  switch (action.type) {
    case actionSupplier.ADD_SUPPLIER:
      return {
        ...state,
        loading: true,
        error: null,
      };
    case actionSupplier.ADD_SUPPLIER_SUCCESS: {
      const supplier: SupplierData[] = Object.assign(
        state.suppliers,
        action.result
      );
      console.warn("add supplier reducer ==>", supplier);

      return {
        ...state,
        suppliers: supplier,
        loading: false,
        error: null,
        isSuccess: true,
        isError: false,
      };
    }
    case actionSupplier.ADD_SUPPLIER_ERROR:
      return {
        ...state,
        loading: false,
        error: action.error,
        isSuccess: false,
        isError: true,
        suppliers: Object.assign({}, state.suppliers, action.result),
      };
    case actionSupplier.UPDATE_SUPPLIER:
      return {
        ...state,
        loading: true,
        error: null,
      };
    case actionSupplier.UPDATE_SUPPLIER_SUCCESS: {
      console.warn("add supplier success");
      const supplier: SupplierData[] = Object.assign(
        {},
        state.suppliers,
        action.result
      );
      console.warn("add supplier ==>", supplier);

      return {
        ...state,
        suppliers: supplier,
        loading: false,
        error: null,
        isSuccess: true,
        isError: false,
      };
    }
    case actionSupplier.UPDATE_SUPPLIER_ERROR:
      return {
        ...state,
        loading: false,
        error: action.error,
        isSuccess: false,
        isError: true,
        suppliers: Object.assign({}, state.suppliers, action.result),
      };
    case actionSupplier.LOAD_ALL_SUPPLIER:
      return {
        ...state,
        loading: true,
        error: null,
      };
    case actionSupplier.LOAD_ALL_SUPPLIER_SUCCESS: {
      console.warn("get all supplier ==>", action);

      return {
        ...state,
        suppliers: action.result,
        loading: false,
        error: null,
        isSuccess: true,
        isError: false,
      };
    }
    case actionSupplier.LOAD_ALL_SUPPLIER_ERROR:
      return {
        ...state,
        loading: false,
        error: action.error,
        isSuccess: false,
        isError: true,
        suppliers: Object.assign({}, state.suppliers, action.result),
      };
    case actionSupplier.LOAD_SUPPLIER_REQUEST:
      return {
        ...state,
        loading: true,
        error: null,
      };
    case actionSupplier.LOAD_SUPPLIER_SUCCESS: {
      console.warn("add supplier success");
      const supplier: SupplierData[] = Object.assign(
        {},
        state.suppliers,
        action.result
      );
      console.warn("add supplier ==>", supplier);

      return {
        ...state,
        suppliers: supplier,
        loading: false,
        error: null,
        isSuccess: true,
        isError: false,
      };
    }
    case actionSupplier.LOAD_SUPPLIER_ERROR:
      return {
        ...state,
        loading: false,
        error: action.error,
        isSuccess: false,
        isError: true,
        suppliers: Object.assign({}, state.suppliers, action.result),
      };
    default:
      return updateState;
  }
};
export default supplierReducer;
