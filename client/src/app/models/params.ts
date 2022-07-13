export interface WineParams {
  orderBy: OrderBy;
  searchTerm: string;
  types: string[];
  countries: string[];
  pageNumber: number;
}

export type OrderBy =
  | "name"
  | "price"
  | "priceDesc"
  | "country"
  | "countryDesc"
  | "type"
  | "typeDesc";
