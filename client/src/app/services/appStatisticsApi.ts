import { api } from "./api";

interface AppStatistics {
  wineCount: number;
  userCount: number;
}

export const appStatisticsApi = api.injectEndpoints({
  endpoints: (builder) => ({
    getAppStatistics: builder.query<AppStatistics, void>({
      query: () => ({
        url: "appStatistics",
      }),
      keepUnusedDataFor: 30,
    }),
  }),
});

export const { useGetAppStatisticsQuery } = appStatisticsApi;
