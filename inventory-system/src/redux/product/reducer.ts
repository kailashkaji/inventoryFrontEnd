import { ResponseProduct, ProductData, actionProduct } from "./constant";

interface ProductState {
  loading: boolean;
  error?: string | null;
  isSuccess: boolean;
  isError: boolean;
  products: ProductData[];
}

const initialState: ProductState = {
  products: [],
  loading: false,
  error: null,
  isSuccess: false,
  isError: false,
};

const productReducer = (
  state = initialState,
  action: ResponseProduct
): ProductState => {
  const updateState = Object.assign({}, state);
  switch (action.type) {
    case actionProduct.ADD_PRODUCT:
      return {
        ...state,
        loading: true,
        error: null,
      };
    case actionProduct.ADD_PRODUCT_SUCCESS: {
      console.warn("add product success");
      const product: ProductData[] = Object.assign(
        state.products,
        action.result
      );
      console.warn("add product ==>", product);

      return {
        ...state,
        products: product,
        loading: false,
        error: null,
        isSuccess: true,
        isError: false,
      };
    }
    case actionProduct.ADD_PRODUCT_ERROR:
      return {
        ...state,
        loading: false,
        error: action.error,
        isSuccess: false,
        isError: true,
        products: Object.assign({}, state.products, action.result),
      };
    case actionProduct.UPDATE_PRODUCT:
      return {
        ...state,
        loading: true,
        error: null,
      };
    case actionProduct.UPDATE_PRODUCT_SUCCESS: {
      console.warn("add product success");
      const product: ProductData[] = Object.assign(
        {},
        state.products,
        action.result
      );
      console.warn("add product ==>", product);

      return {
        ...state,
        products: product,
        loading: false,
        error: null,
        isSuccess: true,
        isError: false,
      };
    }
    case actionProduct.UPDATE_PRODUCT_ERROR:
      return {
        ...state,
        loading: false,
        error: action.error,
        isSuccess: false,
        isError: true,
        products: Object.assign({}, state.products, action.result),
      };
    case actionProduct.LOAD_ALL_PRODUCT:
      return {
        ...state,
        loading: true,
        error: null,
      };
    case actionProduct.LOAD_ALL_PRODUCT_SUCCESS: {
      console.warn("get all product ==>", action);

      return {
        ...state,
        products: action.result,
        loading: false,
        error: null,
        isSuccess: true,
        isError: false,
      };
    }
    case actionProduct.LOAD_ALL_PRODUCT_ERROR:
      return {
        ...state,
        loading: false,
        error: action.error,
        isSuccess: false,
        isError: true,
        products: Object.assign({}, state.products, action.result),
      };
    case actionProduct.LOAD_PRODUCT_REQUEST:
      return {
        ...state,
        loading: true,
        error: null,
      };
    case actionProduct.LOAD_PRODUCT_SUCCESS: {
      console.warn("add product success");
      const product: ProductData[] = Object.assign(
        {},
        state.products,
        action.result
      );
      console.warn("add product ==>", product);

      return {
        ...state,
        products: product,
        loading: false,
        error: null,
        isSuccess: true,
        isError: false,
      };
    }
    case actionProduct.LOAD_PRODUCT_ERROR:
      return {
        ...state,
        loading: false,
        error: action.error,
        isSuccess: false,
        isError: true,
        products: Object.assign({}, state.products, action.result),
      };
    default:
      return updateState;
  }
};
export default productReducer;
