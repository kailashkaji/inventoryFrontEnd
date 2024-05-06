export const actionBrand = {
  ADD_BRAND: "ADD_BRAND" as const,
  ADD_BRAND_SUCCESS: "ADD_BRAND_SUCCESS" as const,
  ADD_BRAND_ERROR: "ADD_BRAND_ERROR" as const,
  LOAD_BRAND_REQUEST: "LOAD_BRAND_REQUEST" as const,
  LOAD_BRAND_SUCCESS: "LOAD_BRAND_SUCCESS" as const,
  LOAD_BRAND_ERROR: "LOAD_BRAND_ERROR" as const,
  UPDATE_BRAND: "UPDATE_BRAND" as const,
  UPDATE_BRAND_SUCCESS: "UPDATE_BRAND_SUCCESS" as const,
  UPDATE_BRAND_ERROR: "UPDATE_BRAND_ERROR" as const,
  LOAD_ALL_BRAND: "LOAD_ALL_BRAND" as const,
  LOAD_ALL_BRAND_SUCCESS: "LOAD_ALL_BRAND_SUCCESS" as const,
  LOAD_ALL_BRAND_ERROR: "LOAD_ALL_BRAND_ERROR" as const,
};

type ActionBrand = (typeof actionBrand)[keyof typeof actionBrand];

interface BrandData {
  id: number;
  name?: string;
  description?: string;
  logo?: string;
  website?: string;
  address?: string;
  email?: string;
  phoneNumber?: string;
  activeStatus?: number;
}

interface ResponseBrand {
  type: string;
  payload?: BrandData;
  result: BrandData[];
  error?: string;
}
export type { ActionBrand, BrandData, ResponseBrand };
