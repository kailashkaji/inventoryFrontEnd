import { ResponseBrand, BrandData, actionBrand } from "./constant";

interface BrandState {
  loading: boolean;
  error?: string | null;
  isSuccess: boolean;
  isError: boolean;
  brands: BrandData[];
}

const initialState: BrandState = {
  brands: [],
  loading: false,
  error: null,
  isSuccess: false,
  isError: false,
};

const brandReducer = (
  state = initialState,
  action: ResponseBrand
): BrandState => {
  const updateState = Object.assign({}, state);
  switch (action.type) {
    case actionBrand.ADD_BRAND:
      return {
        ...state,
        loading: true,
        error: null,
      };
    case actionBrand.ADD_BRAND_SUCCESS: {
      console.warn("add brand success");
      const brand: BrandData[] = Object.assign(state.brands, action.result);
      console.warn("add brand ==>", brand);

      return {
        ...state,
        brands: brand,
        loading: false,
        error: null,
        isSuccess: true,
        isError: false,
      };
    }
    case actionBrand.ADD_BRAND_ERROR:
      return {
        ...state,
        loading: false,
        error: action.error,
        isSuccess: false,
        isError: true,
        brands: Object.assign({}, state.brands, action.result),
      };
    case actionBrand.UPDATE_BRAND:
      return {
        ...state,
        loading: true,
        error: null,
      };
    case actionBrand.UPDATE_BRAND_SUCCESS: {
      console.warn("add brand success");
      const brand: BrandData[] = Object.assign({}, state.brands, action.result);
      console.warn("add brand ==>", brand);

      return {
        ...state,
        brands: brand,
        loading: false,
        error: null,
        isSuccess: true,
        isError: false,
      };
    }
    case actionBrand.UPDATE_BRAND_ERROR:
      return {
        ...state,
        loading: false,
        error: action.error,
        isSuccess: false,
        isError: true,
        brands: Object.assign({}, state.brands, action.result),
      };
    case actionBrand.LOAD_ALL_BRAND:
      return {
        ...state,
        loading: true,
        error: null,
      };
    case actionBrand.LOAD_ALL_BRAND_SUCCESS: {
      console.warn("get all brand ==>", action);

      return {
        ...state,
        brands: action.result,
        loading: false,
        error: null,
        isSuccess: true,
        isError: false,
      };
    }
    case actionBrand.LOAD_ALL_BRAND_ERROR:
      return {
        ...state,
        loading: false,
        error: action.error,
        isSuccess: false,
        isError: true,
        brands: Object.assign({}, state.brands, action.result),
      };
    case actionBrand.LOAD_BRAND_REQUEST:
      return {
        ...state,
        loading: true,
        error: null,
      };
    case actionBrand.LOAD_BRAND_SUCCESS: {
      console.warn("add brand success");
      const brand: BrandData[] = Object.assign({}, state.brands, action.result);
      console.warn("add brand ==>", brand);

      return {
        ...state,
        brands: brand,
        loading: false,
        error: null,
        isSuccess: true,
        isError: false,
      };
    }
    case actionBrand.LOAD_BRAND_ERROR:
      return {
        ...state,
        loading: false,
        error: action.error,
        isSuccess: false,
        isError: true,
        brands: Object.assign({}, state.brands, action.result),
      };
    default:
      return updateState;
  }
};
export default brandReducer;
