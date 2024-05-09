import { ProductData, actionProduct } from "./constant";

export const createProduct = (data: ProductData) => {
  console.warn("product create action", data);
  return {
    type: actionProduct.ADD_PRODUCT,
    payload: data,
  };
};

export const updateProduct = (data: ProductData) => {
  console.warn("product update action", data);
  return {
    type: actionProduct.UPDATE_PRODUCT,
    payload: data,
  };
};

export const getProductById = (data: ProductData) => {
  console.warn("product get by id", data);
  return {
    type: actionProduct.LOAD_PRODUCT_REQUEST,
    payload: data,
  };
};

export const getProducts = () => {
  console.warn("product get all");
  return {
    type: actionProduct.LOAD_ALL_PRODUCT,
  };
};
