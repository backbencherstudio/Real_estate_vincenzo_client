import { baseApi } from "../../api/baseApi";

const sharedApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({    

    getPropertieUnits: builder.query({
      query: (id) => {
        return {
            url: `/admin/propertie-units/${id}`,
            method: "GET",
        };
    },
    providesTags: ["properties", "units"],
    }),
    
    getSingleTenantDetailse : builder.query({
      query: (id)=>{
        return {
          url: `/admin/getSingleTenantDetailse/${id}`,
          method: "GET",
        }
      },
    }),

    updateProfile : builder.mutation({
      query: (profileData)=>{
        return {
          url: "/auth",
          method: "PATCH",
          body:profileData
        }
      },
      invalidatesTags:["user"]
    })

    

  }),
});

export default sharedApi;
