import { baseApi } from "../../api/baseApi";

const ownerApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({

    getSingleOwnerAllProperties: builder.query({
      query: (id) => {
        return {
            url: `/owner/${id}`,
            method: "GET",
        };
    },
    providesTags: ["properties"],
    }),

    getSingleOwnerAllTenants : builder.query({
      query : (id)=>{
        return {
          url : `/owner/unit/${id}`,
          method :"GET"
        }
      },
      providesTags : ["tenants"]
    }),

    createProperty: builder.mutation({
      query: (propertyData) => {        
        return {
            url: "/owner/create-properties",
            method: "POST",
            body : propertyData
        };
    },
    invalidatesTags: ["properties"],
    }),
    
    createUnit: builder.mutation({
      query: (unitData) => {        
        return {
            url: "/owner/create-unit",
            method: "POST",
            body : unitData
        };
    },
    invalidatesTags: ["properties"],
    }),

    createTenant: builder.mutation({
      query: (tenantData) => {        
        return {
            url: "/owner/create-tenant",
            method: "POST",
            body : tenantData
        };
    },
    invalidatesTags: ["properties"],
    }),





    
  }),
});

export default ownerApi;