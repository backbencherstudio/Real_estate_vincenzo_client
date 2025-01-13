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

    getAllProperties : builder.query({
      query: ()=>{
        return {
          url: `/admin/getAllProterties`,
          method: "GET",
        }
      },
      providesTags: ["properties"],
    }),
    
    getAllTenants : builder.query({
      query: ()=>{
        return {
          url: `/admin/getALlTenants`,
          method: "GET",
        }
      },
      providesTags: ["tenants"],
    }),

    
  }),
});

export default adminApi;
