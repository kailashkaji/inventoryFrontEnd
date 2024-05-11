export const actionProduct = {
  ADD_PRODUCT: "ADD_PRODUCT" as const,
  ADD_PRODUCT_SUCCESS: "ADD_PRODUCT_SUCCESS" as const,
  ADD_PRODUCT_ERROR: "ADD_PRODUCT_ERROR" as const,
  LOAD_PRODUCT_REQUEST: "LOAD_PRODUCT_REQUEST" as const,
  LOAD_PRODUCT_SUCCESS: "LOAD_PRODUCT_SUCCESS" as const,
  LOAD_PRODUCT_ERROR: "LOAD_PRODUCT_ERROR" as const,
  UPDATE_PRODUCT: "UPDATE_PRODUCT" as const,
  UPDATE_PRODUCT_SUCCESS: "UPDATE_PRODUCT_SUCCESS" as const,
  UPDATE_PRODUCT_ERROR: "UPDATE_PRODUCT_ERROR" as const,
  LOAD_ALL_PRODUCT: "LOAD_ALL_PRODUCT" as const,
  LOAD_ALL_PRODUCT_SUCCESS: "LOAD_ALL_PRODUCT_SUCCESS" as const,
  LOAD_ALL_PRODUCT_ERROR: "LOAD_ALL_PRODUCT_ERROR" as const,
};

type ActionProduct = (typeof actionProduct)[keyof typeof actionProduct];
interface ProductCategoryLink {
  id?: number;
  productId?: number;
  categoryId?: number;
}
interface ProductData {
  id: number;
  title?: string;
  summary?: string;
  type?: string;
  content?: string;
  productCategoryLink?: ProductCategoryLink[];
}

interface ResponseProduct {
  type: string;
  payload?: ProductData;
  result: ProductData[];
  error?: string;
}
export type {
  ActionProduct,
  ProductData,
  ResponseProduct,
  ProductCategoryLink,
};
