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
      query: (selectedDate) => {
        return {
          url: selectedDate
            ? `/admin/getAllProterties?selectedDate=${selectedDate}`
            : `/admin/getAllProterties`,
          method: "GET",
        };
      },
      providesTags: ["properties"],
    }),
  

    // getAllProperties: builder.query({
    //   query: (selectedDate) => {
    //     return {
    //       url: `/admin/getAllProterties?selectedDate=${selectedDate}`,
    //       method: "GET",
    //     }
    //   },
    //   providesTags: ["properties"],
    // }),

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
      query: (selectedDateForFilter) => {
        return {
          url: `/admin/getAllDataOverviewByAdmin?selectedDate=${selectedDateForFilter}`,
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
          body: planData
        };
      },
      invalidatesTags: ["plan"],
    }),



    // ================================================  Payout Api
    payoutDataGetByAdmin: builder.query({
      query: () => {
        return {
          url: `/payment/payoutDataGetByAdmin`,
          method: "GET",
        };
      },
      providesTags: ["payout"],
    }),

    sendPayoutRequestByAdmin: builder.mutation({
      query: (data) => {
        return {
          url: `/payment/sendPayoutRequestByAdmin`,
          method: "POST",
          body: data
        };
      },
      invalidatesTags: ["payout", 'user'],
    }),

    // =======================================>>>>> tenant payment create by admin
    tenantPayment: builder.query({
      query: () => {
        return {
          url: `/payment/tenantPayment`,
          method: "GET",
        };
      },
      invalidatesTags: ["payment"],
    }),

    // =======================================>>>>> delete non-subscriber owner 
    deleteNoSubscriberOwner: builder.mutation({
      query: (ownerId) => {
        return {
          url: `/admin/deleteNoSubscriberOwner/${ownerId}`,
          method: "DELETE",
        };
      },
      invalidatesTags: ["user"],
    }),


    // =======================================>>>>> Review API
    getAllReview: builder.query({
      query: () => {
        return {
          url: `/admin/getAllReview`,
          method: "GET",
        };
      },
      providesTags: ["review"],
    }),

    deleteReviewByAdmin: builder.mutation({
      query: (id) => {
        return {
          url: `/admin/deleteReviewByAdmin/${id}`,
          method: "DELETE",
        };
      },
      invalidatesTags: ["review"],
    }),

    // =======================================>>>>>  advisore API
    getAdvisersData: builder.query({
      query: () => {
        return {
          url: "/auth/getAdvisersData",
          method: "GET"
        }
      }
    }),

    realEstateAdvisor: builder.mutation({
      query: (data) => {
        return {
          url: "/admin/realEstateAdvisor",
          method: "POST",
          body: data
        }
      }
    }),

    realEstateAdvisordelete: builder.mutation({
      query: (id) => {
        return {
          url: `/admin/realEstateAdvisordelete/${id}`,
          method: "DELETE",
        }
      }
    }),

    // =============================================== Email collection
    getAllEmailCollectionData: builder.query({
      query: () => {
        return {
          url: `/admin/getAllEmailCollectionData`,
          method: "GET",
        }
      },
      providesTags: ["email"]
    }),

    deleteEmailCollectionData: builder.mutation({
      query: (id) => ({
        url: `/admin/deleteEmailCollectionData/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["email"]
    }),

    // ===================================================== add transaction id after send amount to owner
    addTransactionData: builder.mutation({
      query: (data) => ({
        url: `/admin/addTransactionData`,
        method: "POST",
        body: data
      }),
      invalidatesTags: ["properties", "user"]
    }),

    getPaymentHistory: builder.query({
      query: (query) => {
        const queryString = new URLSearchParams(query).toString();
        return {
          url: `/admin/payment-history?${queryString}`,
          method: "GET",
        }
      },
      providesTags: ['payment-history']
    }),

  }),
});

export default adminApi;
