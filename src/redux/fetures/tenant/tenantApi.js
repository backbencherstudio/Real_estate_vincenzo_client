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

    getSingleUserAllPaymentData : builder.query({
      query: (id)=>{
        return {
          url: `/payment/getSingleUserAllPaymentData/${id}`,
          method: "GET",
        }
      },
      providesTags:["payment"]
    }),

    paymentPlacedApi : builder.mutation({
      query: (data)=>{
        return {
          url: "/payment/stripeTenantPayment",
          method: "POST",
          body : data
        }
      },
      // invalidatesTags:["singleUserInfo"]
      // invalidatesTags: (result, error, { email }) => [{ type: "singleUserInfo", id: email }],
    }),

    getAllTenantsForMessageForEachPropertyTenant : builder.query({
      query: (userId)=>{        
        return {
          url: `/tenant/message/${userId}`,
          method: "GET",
        }
      },
    }),

    isOwnerActiveOrNot : builder.query({
      query: (userId)=>{        
        return {
          url: `/tenant/isOwnerActiveOrNot/${userId}`,
          method: "GET",
        }
      },
    }),

    


  }),
});

export default tenantApi;
