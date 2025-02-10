import { baseApi } from "../../api/baseApi";

const adminApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({

    getALlUser: builder.query({
      query: (query) => {      
        const queryString = new URLSearchParams(query).toString();  
        return {
          url: `/auth/allUsers?${queryString}`,
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

    // =================================================>>>>  Create Plan
    getPlan: builder.query({
      query: () => {
        return {
          url: `/admin/getPlan`,
          method: "GET",
        };
      },
      providesTags: ["plan"],
    }),

    createPlan: builder.mutation({
      query: (planData) => {
        return {
          url: `/admin/createPlan`,
          method: "POST",
          body : planData
        };
      },
      invalidatesTags: ["plan"],
    }),





  }),
});

export default adminApi;
