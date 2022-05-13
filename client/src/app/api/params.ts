export interface WineParams {
  orderBy: string;
  searchTerm?: string;
  types: string[];
  countries: string[];

  pageNumber: number;
}

export const getAxiosParams = (wineParams: WineParams) => {
  const params = new URLSearchParams();
  params.append("pageNumber", wineParams.pageNumber.toString());
  params.append("orderBy", wineParams.orderBy);

  if (wineParams.searchTerm) params.append("searchTerm", wineParams.searchTerm);

  if (wineParams.countries.length > 0)
    params.append("brands", wineParams.countries.toString());

  if (wineParams.types.length > 0)
    params.append("types", wineParams.types.toString());

  return params;
};
