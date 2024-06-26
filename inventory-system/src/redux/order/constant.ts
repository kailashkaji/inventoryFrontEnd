// Action types for orders
export const actionOrder = {
  CREATE_ORDER: "CREATE_ORDER" as const,
  CREATE_ORDER_SUCCESS: "CREATE_ORDER_SUCCESS" as const,
  CREATE_ORDER_ERROR: "CREATE_ORDER_ERROR" as const,
  UPDATE_ORDER: "UPDATE_ORDER" as const,
  UPDATE_ORDER_SUCCESS: "UPDATE_ORDER_SUCCESS" as const,
  UPDATE_ORDER_ERROR: "UPDATE_ORDER_ERROR" as const,
  GET_ORDER_BY_ID: "GET_ORDER_BY_ID" as const,
  GET_ORDER_BY_ID_SUCCESS: "GET_ORDER_BY_ID_SUCCESS" as const,
  GET_ORDER_BY_ID_ERROR: "GET_ORDER_BY_ID_ERROR" as const,
  LOAD_ALL_ORDER: "LOAD_ALL_ORDER" as const,
  LOAD_ALL_ORDER_SUCCESS: "LOAD_ALL_ORDER_SUCCESS" as const,
  LOAD_ALL_ORDER_ERROR: "LOAD_ALL_ORDER_ERROR" as const,
  LOAD_ALL_ORDER_BY_STATUS: "LOAD_ALL_ORDER_BY_STATUS" as const,
  LOAD_ALL_ORDER_BY_STATUS_SUCCESS: "LOAD_ALL_ORDER_BY_STATUS_SUCCESS" as const,
  LOAD_ALL_ORDER_BY_STATUS_ERROR: "LOAD_ALL_ORDER_BY_STATUS_ERROR" as const,
};

type ActionOrder = (typeof actionOrder)[keyof typeof actionOrder];

// Order interface
interface Order {
  id?: number;
  userId?: number;
  type?: number;
  status?: number;
  subTotal?: number;
  itemDiscount?: number;
  tax?: number;
  shipping?: number;
  total?: number;
  promo?: string;
  discount?: number;
  grandTotal?: number;
  createdAt?: Date;
  updatedAt?: Date;
  content?: string;
  createdBy?: string;
  updatedBy?: string;
  orderItem?: OrderItem[];
}

interface OrderItem {
  key?: number;
  itemId?: number;
  itemName?: string;
  sku?: string;
  price?: number;
  discount?: number;
  orderedQuantity?: number;
  arrivedQuantity?: number;
  createdAt?: Date;
  updatedAt?: Date;
  content?: string;
  createdBy?: string;
  updatedBy?: string;
  amount?: number;
}

interface ResponseOrder {
  type: string;
  payload?: Order;
  error?: string;
  result: Order[];
}

export type { ActionOrder, ResponseOrder, Order, OrderItem };
