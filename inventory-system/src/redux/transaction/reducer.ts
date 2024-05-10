import { Transaction, ResponseTransaction, actionTransaction } from "./constant";

interface TransactionState {
  loading: boolean;
  error?: string | null;
  isSuccess: boolean;
  isError: boolean;
  transactions: Transaction[];
}

const initialState: TransactionState = {
  transactions: [],
  loading: false,
  error: null,
  isSuccess: false,
  isError: false,
};

const transactionReducer = (
  state = initialState,
  action: ResponseTransaction
): TransactionState => {
  const updateState = { ...state };
  switch (action.type) {
    case actionTransaction.ADD_TRANSACTION:
    case actionTransaction.UPDATE_TRANSACTION:
    case actionTransaction.DELETE_TRANSACTION:
    case actionTransaction.LOAD_TRANSACTION_REQUEST:
      return {
        ...state,
        loading: true,
        error: null,
      };
    case actionTransaction.ADD_TRANSACTION_SUCCESS:
    case actionTransaction.UPDATE_TRANSACTION_SUCCESS:
        // const updatedIndex = state.transactions.findIndex(transaction => transaction.id === action.payload?.id);
        // let updatedTransactions: Transaction[];
        // if (updatedIndex !== -1) {
        //     updatedTransactions = [...state.transactions];
        //     updatedTransactions[updatedIndex] = action.payload;
        // } else {
        //     updatedTransactions = [...state.transactions, action.payload];
        // }
        // return {
        //     ...state,
        //     transactions: updatedTransactions,
        //     loading: false,
        //     error: null,
        //     isSuccess: true,
        //     isError: false,
        // };
    case actionTransaction.LOAD_TRANSACTION_SUCCESS:
    case actionTransaction.LOAD_ALL_TRANSACTION_SUCCESS:
      return {
        ...state,
        transactions: action.result,
        loading: false,
        error: null,
        isSuccess: true,
        isError: false,
      };
    case actionTransaction.ADD_TRANSACTION_ERROR:
    case actionTransaction.UPDATE_TRANSACTION_ERROR:
    case actionTransaction.DELETE_TRANSACTION_ERROR:
    case actionTransaction.LOAD_TRANSACTION_ERROR:
    case actionTransaction.LOAD_ALL_TRANSACTION_ERROR:
      return {
        ...state,
        loading: false,
        error: action.error,
        isSuccess: false,
        isError: true,
      };
    default:
      return updateState;
  }
};

export default transactionReducer;
