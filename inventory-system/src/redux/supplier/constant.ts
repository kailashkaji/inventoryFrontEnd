export const actionSupplier = {
  ADD_SUPPLIER: "ADD_SUPPLIER" as const,
  ADD_SUPPLIER_SUCCESS: "ADD_SUPPLIER_SUCCESS" as const,
  ADD_SUPPLIER_ERROR: "ADD_SUPPLIER_ERROR" as const,
  LOAD_SUPPLIER_REQUEST: "LOAD_SUPPLIER_REQUEST" as const,
  LOAD_SUPPLIER_SUCCESS: "LOAD_SUPPLIER_SUCCESS" as const,
  LOAD_SUPPLIER_ERROR: "LOAD_SUPPLIER_ERROR" as const,
  UPDATE_SUPPLIER: "UPDATE_SUPPLIER" as const,
  UPDATE_SUPPLIER_SUCCESS: "UPDATE_SUPPLIER_SUCCESS" as const,
  UPDATE_SUPPLIER_ERROR: "UPDATE_SUPPLIER_ERROR" as const,
  LOAD_ALL_SUPPLIER: "LOAD_ALL_SUPPLIER" as const,
  LOAD_ALL_SUPPLIER_SUCCESS: "LOAD_ALL_SUPPLIER_SUCCESS" as const,
  LOAD_ALL_SUPPLIER_ERROR: "LOAD_ALL_SUPPLIER_ERROR" as const,
};

type ActionSupplier = (typeof actionSupplier)[keyof typeof actionSupplier];

// interface SupplierData {
//   id?: number;
//   name?: string;
//   description?: string;
//   logo?: string;
//   website?: string;
//   address?: string;
//   email?: string;
//   phoneNumber?: string;
//   activeStatus?: number;
// }

interface BankDetails {
  id?: number;
  beneficiaryName?: string;
  bankName?: string | null;
  accountNumber?: string;
  bsbNumber?: string;
}

interface SupplierData {
  id: number;
  companyName?: string;
  primaryContact?: string;
  email?: string;
  mobileNumber?: string;
  address?: string;
  bankDetails?: BankDetails;
}

// // Example usage:
// const company: Company = {
//   id: 1,
//   companyName: "Aus Post",
//   primaryContact: "0404004404",
//   email: "auspost@gmail.com",
//   mobileNumber: null,
//   address: null,
//   bankDetails: {
//     id: 1,
//     beneficiaryName: null,
//     bankName: null,
//     accountNumber: null,
//     bsbNumber: null,
//   },
// };
interface ResponseSupplier {
  type: string;
  payload?: SupplierData;
  result: SupplierData[];
  error?: string;
}
export type { ActionSupplier, SupplierData, ResponseSupplier };
