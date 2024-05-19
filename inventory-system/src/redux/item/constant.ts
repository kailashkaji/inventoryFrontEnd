export const actionItem = {
  ADD_ITEM: "ADD_ITEM" as const,
  ADD_ITEM_SUCCESS: "ADD_ITEM_SUCCESS" as const,
  ADD_ITEM_ERROR: "ADD_ITEM_ERROR" as const,
  LOAD_ITEM_REQUEST: "LOAD_ITEM_REQUEST" as const,
  LOAD_ITEM_SUCCESS: "LOAD_ITEM_SUCCESS" as const,
  LOAD_ITEM_ERROR: "LOAD_ITEM_ERROR" as const,
  UPDATE_ITEM: "UPDATE_ITEM" as const,
  UPDATE_ITEM_SUCCESS: "UPDATE_ITEM_SUCCESS" as const,
  UPDATE_ITEM_ERROR: "UPDATE_ITEM_ERROR" as const,
  LOAD_ALL_ITEM: "LOAD_ALL_ITEM" as const,
  LOAD_ALL_ITEM_SUCCESS: "LOAD_ALL_ITEM_SUCCESS" as const,
  LOAD_ALL_ITEM_ERROR: "LOAD_ALL_ITEM_ERROR" as const,
  LOAD_ALL_ACTIVE_ITEM: "LOAD_ALL_ACTIVE_ITEM" as const,
  LOAD_ALL_ACTIVE_ITEM_SUCCESS: "LOAD_ALL_ACTIVE_ITEM_SUCCESS" as const,
  LOAD_ALL_ACTIVE_ITEM_ERROR: "LOAD_ALL_ACTIVE_ITEM_ERROR" as const,
};

type ActionItem = (typeof actionItem)[keyof typeof actionItem];

interface ItemLot {
  id: number;
  quantity: number;
  sold: number;
  returnableItem: boolean;
  available: number;
  defective: number;
  defectiveCustReturned: number;
  expireDate: number;
  item: ItemData;
}

interface ItemData {
  id: number;
  brandId: number;
  productId: number;
  itemName: string;
  sku?: string;
  mrp?: number;
  unit?: string;
  dimension?: string;
  weight?: number;
  mpn?: number;
  isbn?: number;
  upc?: number;
  ean?: number;
  isActive: boolean;
  minRecomStock: number;
  itemLots: ItemLot[];
}

interface ResponseItem {
  type: string;
  payload?: ItemData;
  result: ItemData[];
  error?: string;
}
export type { ActionItem, ItemData, ResponseItem };
