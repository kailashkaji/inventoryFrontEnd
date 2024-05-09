import { ResponseCategory, CategoryData, actionCategory } from "./constant";

export interface CategoryState {
  loading: boolean;
  error?: string | null;
  isSuccess: boolean;
  isError: boolean;
  categorys: CategoryData[];
}

const initialState: CategoryState = {
  categorys: [],
  loading: false,
  error: null,
  isSuccess: false,
  isError: false,
};

const categoryReducer = (
  state = initialState,
  action: ResponseCategory
): CategoryState => {
  const updateState = Object.assign({}, state);
  switch (action.type) {
    case actionCategory.ADD_CATEGORY:
      return {
        ...state,
        loading: true,
        error: null,
      };
    case actionCategory.ADD_CATEGORY_SUCCESS: {
      // const category: CategoryData[] = Object.assign(
      //   state.categorys,
      //   action.result
      // );
      // console.warn("add category reducer ==>", category);

      return {
        ...state,
        categorys: action.result,
        loading: false,
        error: null,
        isSuccess: true,
        isError: false,
      };
    }
    case actionCategory.ADD_CATEGORY_ERROR:
      return {
        ...state,
        loading: false,
        error: action.error,
        isSuccess: false,
        isError: true,
        categorys: Object.assign({}, state.categorys, action.result),
      };
    case actionCategory.UPDATE_CATEGORY:
      return {
        ...state,
        loading: true,
        error: null,
      };
    case actionCategory.UPDATE_CATEGORY_SUCCESS: {
      console.warn("add category success");
      const category: CategoryData[] = Object.assign(
        {},
        state.categorys,
        action.result
      );
      console.warn("add category ==>", category);

      return {
        ...state,
        categorys: category,
        loading: false,
        error: null,
        isSuccess: true,
        isError: false,
      };
    }
    case actionCategory.UPDATE_CATEGORY_ERROR:
      return {
        ...state,
        loading: false,
        error: action.error,
        isSuccess: false,
        isError: true,
        categorys: Object.assign({}, state.categorys, action.result),
      };
    case actionCategory.LOAD_ALL_CATEGORY:
      return {
        ...state,
        loading: true,
        error: null,
      };
    case actionCategory.LOAD_ALL_CATEGORY_SUCCESS: {
      console.warn("get all category ==>", action);

      return {
        ...state,
        categorys: action.result,
        loading: false,
        error: null,
        isSuccess: true,
        isError: false,
      };
    }
    case actionCategory.LOAD_ALL_CATEGORY_ERROR:
      return {
        ...state,
        loading: false,
        error: action.error,
        isSuccess: false,
        isError: true,
        categorys: Object.assign({}, state.categorys, action.result),
      };
    case actionCategory.LOAD_TREE_CATEGORY:
      return {
        ...state,
        loading: true,
        error: null,
      };
    case actionCategory.LOAD_TREE_CATEGORY_SUCCESS: {
      return {
        ...state,
        categorys: action.result,
        loading: false,
        error: null,
        isSuccess: true,
        isError: false,
      };
    }
    case actionCategory.LOAD_TREE_CATEGORY_ERROR:
      return {
        ...state,
        loading: false,
        error: action.error,
        isSuccess: false,
        isError: true,
        categorys: Object.assign({}, state.categorys, action.result),
      };
    case actionCategory.LOAD_CATEGORY_REQUEST:
      return {
        ...state,
        loading: true,
        error: null,
      };
    case actionCategory.LOAD_CATEGORY_SUCCESS: {
      console.warn("add category success");
      const category: CategoryData[] = Object.assign(
        {},
        state.categorys,
        action.result
      );
      console.warn("add category ==>", category);

      return {
        ...state,
        categorys: category,
        loading: false,
        error: null,
        isSuccess: true,
        isError: false,
      };
    }
    case actionCategory.LOAD_CATEGORY_ERROR:
      return {
        ...state,
        loading: false,
        error: action.error,
        isSuccess: false,
        isError: true,
        categorys: Object.assign({}, state.categorys, action.result),
      };
    default:
      return updateState;
  }
};
export default categoryReducer;
