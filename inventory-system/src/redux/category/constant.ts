export const actionCategory = {
  ADD_CATEGORY: "ADD_CATEGORY" as const,
  ADD_CATEGORY_SUCCESS: "ADD_CATEGORY_SUCCESS" as const,
  ADD_CATEGORY_ERROR: "ADD_CATEGORY_ERROR" as const,
  LOAD_CATEGORY_REQUEST: "LOAD_CATEGORY_REQUEST" as const,
  LOAD_CATEGORY_SUCCESS: "LOAD_CATEGORY_SUCCESS" as const,
  LOAD_CATEGORY_ERROR: "LOAD_CATEGORY_ERROR" as const,
  UPDATE_CATEGORY: "UPDATE_CATEGORY" as const,
  UPDATE_CATEGORY_SUCCESS: "UPDATE_CATEGORY_SUCCESS" as const,
  UPDATE_CATEGORY_ERROR: "UPDATE_CATEGORY_ERROR" as const,
  LOAD_ALL_CATEGORY: "LOAD_ALL_CATEGORY" as const,
  LOAD_ALL_CATEGORY_SUCCESS: "LOAD_ALL_CATEGORY_SUCCESS" as const,
  LOAD_ALL_CATEGORY_ERROR: "LOAD_ALL_CATEGORY_ERROR" as const,
  LOAD_TREE_CATEGORY: "LOAD_TREE_CATEGORY" as const,
  LOAD_TREE_CATEGORY_SUCCESS: "LOAD_TREE_CATEGORY_SUCCESS" as const,
  LOAD_TREE_CATEGORY_ERROR: "LOAD_TREE_CATEGORY_ERROR" as const,
};

type ActionCategory = (typeof actionCategory)[keyof typeof actionCategory];

interface CategoryData {
  id: number;
  title?: string;
  parentId?: number | null;
  isRootNode: boolean;
  childCategory: CategoryData[];
}

interface ResponseCategory {
  type: string;
  payload?: CategoryData;
  result: CategoryData[];
  error?: string;
}
export type { ActionCategory, CategoryData, ResponseCategory };
