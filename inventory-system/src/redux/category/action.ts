import { CategoryData, actionCategory } from "./constant";

export const createCategory = (data: CategoryData) => {
  console.warn("category create action", data);
  return {
    type: actionCategory.ADD_CATEGORY,
    payload: data,
  };
};

export const updateCategory = (data: CategoryData) => {
  console.warn("category update action", data);
  return {
    type: actionCategory.UPDATE_CATEGORY,
    payload: data,
  };
};

export const getCategoryById = (data: CategoryData) => {
  console.warn("category get by id", data);
  return {
    type: actionCategory.LOAD_CATEGORY_REQUEST,
    payload: data,
  };
};

export const getCategorys = () => {
  console.warn("category get all");
  return {
    type: actionCategory.LOAD_ALL_CATEGORY,
  };
};
export const getCategoryTree = () => {
  console.warn("category get tree");
  return {
    type: actionCategory.LOAD_TREE_CATEGORY,
  };
};
