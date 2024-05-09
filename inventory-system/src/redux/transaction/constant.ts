
// Action types and response interfaces for transactions
export const actionTransaction = {
    ADD_TRANSACTION: "ADD_TRANSACTION" as const,
    ADD_TRANSACTION_SUCCESS: "ADD_TRANSACTION_SUCCESS" as const,
    ADD_TRANSACTION_ERROR: "ADD_TRANSACTION_ERROR" as const,
    LOAD_TRANSACTION_REQUEST: "LOAD_TRANSACTION_REQUEST" as const,
    LOAD_TRANSACTION_SUCCESS: "LOAD_TRANSACTION_SUCCESS" as const,
    LOAD_TRANSACTION_ERROR: "LOAD_TRANSACTION_ERROR" as const,
    UPDATE_TRANSACTION: "UPDATE_TRANSACTION" as const,
    UPDATE_TRANSACTION_SUCCESS: "UPDATE_TRANSACTION_SUCCESS" as const,
    UPDATE_TRANSACTION_ERROR: "UPDATE_TRANSACTION_ERROR" as const,
    DELETE_TRANSACTION: "DELETE_TRANSACTION" as const,
    DELETE_TRANSACTION_SUCCESS: "DELETE_TRANSACTION_SUCCESS" as const,
    DELETE_TRANSACTION_ERROR: "DELETE_TRANSACTION_ERROR" as const,
    LOAD_ALL_TRANSACTION: "LOAD_ALL_TRANSACTION" as const,
    LOAD_ALL_TRANSACTION_SUCCESS: "LOAD_ALL_TRANSACTION_SUCCESS" as const, // Added this line
    LOAD_ALL_TRANSACTION_ERROR: "LOAD_ALL_TRANSACTION_ERROR" as const
  };

// Transaction interface
interface Transaction {
    id?: number;
    userId?: number;
    orderId?: number;
    code?: string;
    type?: number;
    mode?: number;
    status?: number;
    createdAt?: Date;
    updatedAt?: Date;
    content?: string;
    createdBy?: string;
    updatedBy?: string;
}


type ActionTransaction = (typeof actionTransaction)[keyof typeof actionTransaction];

interface ResponseTransaction {
    type: string;
    payload?: Transaction;
    result: Transaction[];
    error?: string;
}

export type { ActionTransaction, ResponseTransaction, Transaction };
