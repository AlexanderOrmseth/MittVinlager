export interface WineParams {
  orderBy: string;
  searchTerm: string | null;
  types: string[];
  countries: string[];
  pageNumber: number;
}
