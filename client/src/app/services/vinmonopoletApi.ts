import { api } from "./api";
import { Country } from "../models/country";
import { VinmonopoletResponse } from "../models/wine";

export const vinmonopoletApi = api.injectEndpoints({
  endpoints: (builder) => ({
    getVinmonopoletCountries: builder.query<Country[], void>({
      query: () => "vinmonopolet/countries",
    }),
    getVinmonopoletWine: builder.query<VinmonopoletResponse, string>({
      query: (productId) => `vinmonopolet/${productId}`,
    }),
  }),
});

export const { useGetVinmonopoletCountriesQuery, useGetVinmonopoletWineQuery } =
  vinmonopoletApi;
