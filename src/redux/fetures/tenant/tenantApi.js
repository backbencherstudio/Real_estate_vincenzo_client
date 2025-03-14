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


    // ============================================>>>>>>>>  ACH Payment for tenant ===========================
    createCustomerForACHpayment : builder.mutation({
      query: (data)=>{
        return {
          url: "/payment/createCustomerForACHpayment",
          method: "POST",
          body : data
        }
      },
    }),

    createBankTokenForACHpayment : builder.mutation({
      query: (data)=>{
        return {
          url: "/payment/createBankTokenForACHpayment",
          method: "POST",
          body : data
        }
      },
    }),

    attachACHbankAccount : builder.mutation({
      query: (data)=>{
        return {
          url: "/payment/attachACHbankAccount",
          method: "POST",
          body : data
        }
      },
    }),

    verifyBankAccountApi : builder.mutation({
      query: (data)=>{
        return {
          url: "/payment/verifyBankAccount",
          method: "POST",
          body : data
        }
      },
    }),

    payRentUserACHcontroller : builder.mutation({
      query: (data)=>{
        return {
          url: "/payment/payRentUserACHcontroller",
          method: "POST",
          body : data
        }
      },
    }),

    


  }),
});

export default tenantApi;
