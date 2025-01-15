import { baseApi } from "../../api/baseApi";

const ownerApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({

      
    createProperty: builder.mutation({
      query: (propertyData) => {
        return {
            url: "/owner/create-properties",
            method: "GET",
            body : propertyData
        };
    },
    providesTags: ["properties"],
    }),

    getSingleOwnerAllProperties: builder.query({
      query: (id) => {
        return {
            url: `/owner/${id}`,
            method: "GET",
        };
    },
    providesTags: ["owner"],
    }),

    getSingleOwnerAllTenants : builder.query({
      query : (id)=>{
        return {
          url : `/owner/unit/${id}`,
          method :"GET"
        }
      },
      providesTags : ["tenants"]
    })



    
  }),
});

export default ownerApi;