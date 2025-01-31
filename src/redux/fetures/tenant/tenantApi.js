import { baseApi } from "../../api/baseApi";

const tenantApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    
    getTenantDetails: builder.query({
      query: (id) => ({
        url: `/tenant/${id}`,
        method: "GET",
      }),
      providesTags: ["payment"], 
    }),

    getSingleUserAllPaymentData: builder.query({
      query: (id) => ({
        url: `/payment/getSingleUserAllPaymentData/${id}`,
        method: "GET",
      }),
      providesTags: ["payment"], 
    }),

    paymentPlacedApi: builder.mutation({
      query: (data) => ({
        url: "/payment/stripeTenantPayment",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["payment"], 
    }),
  }),
});

export default tenantApi;
