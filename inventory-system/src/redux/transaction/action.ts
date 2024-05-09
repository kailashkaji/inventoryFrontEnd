import { SupplierData, actionSupplier } from "./constant";

export const createSupplier = (data: SupplierData) => {
  console.warn("supplier create action", data);
  return {
    type: actionSupplier.ADD_SUPPLIER,
    payload: data,
  };
};

export const updateSupplier = (data: SupplierData) => {
  console.warn("supplier update action", data);
  return {
    type: actionSupplier.UPDATE_SUPPLIER,
    payload: data,
  };
};

export const getSupplierById = (data: SupplierData) => {
  console.warn("supplier get by id", data);
  return {
    type: actionSupplier.LOAD_SUPPLIER_REQUEST,
    payload: data,
  };
};

export const getSuppliers = () => {
  console.warn("supplier get all");
  return {
    type: actionSupplier.LOAD_ALL_SUPPLIER,
  };
};
