import { WineFilters } from "./wine";

export interface WineParams extends WineFilters {
  orderBy: OrderBy;
  searchTerm: string;
  pageNumber: number;
  priceFrom: number | null;
  priceTo: number | null;
}

export type OrderBy =
  | "name"
  | "price"
  | "priceDesc"
  | "country"
  | "countryDesc"
  | "type"
  | "typeDesc"
  | "score"
  | "scoreDesc"
  | "purchaseDate"
  | "purchaseDateDesc"
  | "createdAt"
  | "createdAtDesc"
  | "updateAt"
  | "updateAtDesc";
