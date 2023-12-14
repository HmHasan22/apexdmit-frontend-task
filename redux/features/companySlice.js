import { apiSlice } from "./apiSlice";
const companySlice = apiSlice.injectEndpoints({
  endpoints: (build) => ({
    getCompany: build.query({
      query: (params) => ({
        url: "/get-all-companys",
        method: "GET",
        params,
      }),
    }),
  }),
});

export const { useGetCompanyQuery } = companySlice;
