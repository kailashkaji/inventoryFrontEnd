import { ItemData, actionItem } from "./constant";

export const createItem = (data: ItemData) => {
  console.warn("item create action", data);
  return {
    type: actionItem.ADD_ITEM,
    payload: data,
  };
};

export const updateItem = (data: ItemData) => {
  console.warn("item update action", data);
  return {
    type: actionItem.UPDATE_ITEM,
    payload: data,
  };
};

export const getItemById = (data: ItemData) => {
  console.warn("item get by id", data);
  return {
    type: actionItem.LOAD_ITEM_REQUEST,
    payload: data,
  };
};

export const getItems = () => {
  console.warn("item get all");
  return {
    type: actionItem.LOAD_ALL_ITEM,
  };
};
