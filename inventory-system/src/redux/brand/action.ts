import { BrandData, actionBrand } from "./constant";

export const createBrand = (data: BrandData) => {
  console.warn("brand create action", data);
  return {
    type: actionBrand.ADD_BRAND,
    payload: data,
  };
};

export const updateBrand = (data: BrandData) => {
  console.warn("brand update action", data);
  return {
    type: actionBrand.UPDATE_BRAND,
    payload: data,
  };
};

export const getBrandById = (data: BrandData) => {
  console.warn("brand get by id", data);
  return {
    type: actionBrand.LOAD_BRAND_REQUEST,
    payload: data,
  };
};

export const getBrands = () => {
  console.warn("brand get all");
  return {
    type: actionBrand.LOAD_ALL_BRAND,
  };
};
