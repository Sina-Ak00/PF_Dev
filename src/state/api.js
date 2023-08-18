import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const api = createApi({
  baseQuery: fetchBaseQuery({ baseUrl: process.env.REACT_APP_BASE_URL }),
  reducerPath: "adminApi",
  tagTypes: ["Foods", "Totals", "Category","Inventory","Upload"],
  endpoints: (build) => ({
    // getFoods: build.query({
    //   query: () => "food/allfoods",
    //   providesTags: ["Foods"],
    // }),
    createUpload: build.mutation({
      query: (newUpload) => ({
        url: "/upload",
        method: "POST",
        body: newUpload,
      }),
      invalidatesTags: ['Upload'],
    }),
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
      invalidatesTags: ['Foods'],
    }),
    updateFood: build.mutation({
      query: ({ id, updatedFood }) => ({
        url: `/foods/${id}`,
        method: "PUT",
        body: updatedFood,
      }),
      invalidatesTags: ['Foods'],
    }),
    deleteFood: build.mutation({
      query: (id) => ({
        url: `/foods/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ['Foods'],
    }),
    getTotals: build.query({
      query: () => "/totals",
      providesTags: ["Totals"],
      
    }),
    createTotal: build.mutation({
      query: (newTotal) => ({
        url: "/totals",
        method: "POST",
        body: newTotal,
      }),
      invalidatesTags: ['Totals'],
    }),
    deleteTotal: build.mutation({
      query: (id) => ({
        url: `/totals/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ['Totals'],
    }),
    getCategorys: build.query({
      query: () => "/categorys",
      providesTags: ["Categorys"],
    }),
    createCategory: build.mutation({
      query: (newCategory) => ({
        url: "/categorys",
        method: "POST",
        body: newCategory,
      }),
      invalidatesTags: ['Categorys'],
    }),
    updateCategory: build.mutation({
      query: ({ id, updatedCategory }) => ({
        url: `/categorys/${id}`,
        method: "PUT",
        body: updatedCategory,
      }),
      invalidatesTags: ['Categorys'],
    }),
    deleteCategory: build.mutation({
      query: (id) => ({
        url: `/categorys/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ['Categorys'],
    }),

    getInventorys: build.query({
      query: () => "/inventorys",
      providesTags: ["Inventorys"],
    }),
    createInventory: build.mutation({
      query: (newInventory) => ({
        url: "/inventorys",
        method: "POST",
        body: newInventory,
      }),
      invalidatesTags: ['Inventorys'],
    }),
    updateInventory: build.mutation({
      query: ({ id, updatedInventory }) => ({
        url: `/inventorys/${id}`,
        method: "PUT",
        body: updatedInventory,
      }),
      invalidatesTags: ['Inventorys'],
    }),
    deleteInventory: build.mutation({
      query: (id) => ({
        url: `/inventorys/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ['Inventorys'],
    }),
  }),
});

export const {
  useGetFoodsQuery,
  useCreateFoodMutation,
  useUpdateFoodMutation,
  useDeleteFoodMutation,
  useGetTotalsQuery,
  useCreateTotalMutation,
  useDeleteTotalMutation,
  useGetCategorysQuery,
  useCreateCategoryMutation,
  useUpdateCategoryMutation,
  useDeleteCategoryMutation,
  useGetInventorysQuery,
  useCreateInventoryMutation,
  useUpdateInventoryMutation,
  useDeleteInventoryMutation,
  useCreateUploadMutation,
} = api;
