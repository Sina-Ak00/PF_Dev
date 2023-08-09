import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const api = createApi({
  baseQuery: fetchBaseQuery({ baseUrl: process.env.REACT_APP_BASE_URL }),
  reducerPath: "adminApi",
  tagTypes: ["Foods"],
  endpoints: (build) => ({
    // getFoods: build.query({
    //   query: () => "food/allfoods",
    //   providesTags: ["Foods"],
    // }),
    getFoods: build.query({
      query: () => "/foods",
      providesTags: ["Foods"],
    }),
    createFood: build.mutation({
      query: (newFood) => ({
        url: "/foods",
        method: "POST",
        body: newFood,
      }),
    }),
    updateFood: build.mutation({
      query: ({ id, updatedFood }) => ({
        url: `/foods/${id}`,
        method: "PUT",
        body: updatedFood,
      }),
    }),
    deleteFood: build.mutation({
      query: (id) => ({
        url: `/foods/${id}`,
        method: "DELETE",
      }),
    }),
  }),
});

export const {
  useGetFoodsQuery,
  useCreateFoodMutation,
  useUpdateFoodMutation,
  useDeleteFoodMutation,
} = api;
