export interface WineParams {
  orderBy: string;
  searchTerm: string | null;
  types: string[];
  countries: string[];
  pageNumber: number;
}

export const getAxiosParams = (wineParams: WineParams) => {
  console.log(wineParams);
  const params = new URLSearchParams();
  params.append("pageNumber", wineParams.pageNumber.toString());
  params.append("orderBy", wineParams.orderBy);

  if (wineParams.searchTerm) params.append("searchTerm", wineParams.searchTerm);

  if (wineParams.countries.length > 0)
    params.append("countries", wineParams.countries.toString());

  if (wineParams.types.length > 0)
    params.append("types", wineParams.types.toString());

  return params;
};
