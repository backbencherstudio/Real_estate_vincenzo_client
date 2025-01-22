import { baseApi } from "../../api/baseApi";

const adminApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({

    getALlUser: builder.query({
      query: (role) => {
        return {
          url: `/auth/allUsers?role=${role}`,
          method: "GET",
        };
      },
      providesTags: ["user"],
    }),

    getAllProperties: builder.query({
      query: () => {
        return {
          url: `/admin/getAllProterties`,
          method: "GET",
        }
      },
      providesTags: ["properties"],
    }),

    getAllTenants: builder.query({
      query: () => {
        return {
          url: `/admin/getALlTenants`,
          method: "GET",
        }
      },
      providesTags: ["tenants"],
    }),

    getSingleOwnerAllPropertiesWithOwnerInfo: builder.query({
      query: (id) => {
        return {
          url: `/admin/getSingleOwnerAllPropertiesWithOwnerInfo/${id}`,
          method: "GET",
        };
      },
      providesTags: ["properties", "user"],
    }),



    // =================================================>>>>  All data overview
    getAllDataOverviewByAdmin: builder.query({
      query: () => {
        return {
          url: `/admin/getAllDataOverviewByAdmin`,
          method: "GET",
        };
      },
      providesTags: ["overview"],
    }),





  }),
});

export default adminApi;
