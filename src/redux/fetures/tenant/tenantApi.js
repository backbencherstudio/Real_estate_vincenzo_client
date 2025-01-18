import { baseApi } from "../../api/baseApi";

const tenantApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({    

    
    getTenantDetailse : builder.query({
      query: (id)=>{
        return {
          url: `/tenant/${id}`,
          method: "GET",
        }
      },
    }),


  }),
});

export default tenantApi;
