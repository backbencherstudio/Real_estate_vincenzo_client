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
      providesTags:["payment"]
    }),

    


  }),
});

export default tenantApi;
