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

    getSingleOwnerAllTenants: builder.query({
      query: (id) => {
        return {
          url: `/owner/unit/${id}`,
          method: "GET"
        }
      },
      providesTags: ["tenants"]
    }),

    createProperty: builder.mutation({
      query: (propertyData) => {
        return {
          url: "/owner/create-properties",
          method: "POST",
          body: propertyData
        };
      },
      invalidatesTags: ["properties", "user", "overview"],
    }),

    updateProperty: builder.mutation({
      query: (propertyData) => {
        console.log(propertyData);        
        return {
          url: `/owner/update-properties`,
          method: "PATCH",
          body: propertyData
        };
      },
      invalidatesTags: ["properties", "user", "overview"],
    }),
    
    deleteProperties: builder.mutation({
      query: (propertyId) => {
        return {
          url: `/owner/deleteProperties/${propertyId}`,
          method: "DELETE",
        };
      },
      invalidatesTags: ["properties", "user", "overview"],
    }),

    createUnit: builder.mutation({
      query: (unitData) => {
        return {
          url: "/owner/create-unit",
          method: "POST",
          body: unitData
        };
      },
      invalidatesTags: ["properties", "user", "overview"],
    }),

    updateUnit: builder.mutation({
      query: (unitData) => {        
        return {
          url: `/owner/update-unit/${unitData?.unitId}`,
          method: "PATCH",
          body: unitData
        };
      },
      invalidatesTags: ["properties", "user", "overview"],
    }),

    deleteUnit: builder.mutation({
      query: (unitId) => {
        return {
          url: `/owner/delete-unit/${unitId}`,
          method: "DELETE",
        };
      },
      invalidatesTags: ["properties", "user", "overview", "units"],
    }),

    createTenant: builder.mutation({
      query: (tenantData) => {
        return {
          url: "/owner/create-tenant",
          method: "POST",
          body: tenantData
        };
      },
      invalidatesTags: ["properties", "user", "overview"],
    }),

    deleteTenant: builder.mutation({
      query: (tenantId) => {
        return {
          url: `/owner/delete-tenant/${tenantId}`,
          method: "DELETE",
        };
      },
      invalidatesTags: ["properties", "user", "overview", "tenants"],
    }),

    // =======================================================>>>>> Maintatenance API

    getMaintenanceData: builder.query({
      query: (ownerId) => {
        return {
          url: `/owner/maintenanceData/${ownerId}`,
          method: "GET",
        };
      },
      providesTags: ["maintenance"]
    }),

    getSingleMaintenanceData: builder.query({
      query: (maintenanceId) => {
        return {
          url: `/owner/singleMaintenanceData/${maintenanceId}`,
          method: "GET",
        };
      },
      providesTags: ["maintenance"]
    }),

    statusChangeInMaintenanceData: builder.mutation({
      query: (statusData) => {
        return {
          url: `/owner/singleMaintenanceData/${statusData?.maintenanceId}`,
          method: "PATCH",
          body: statusData
        };
      },
      invalidatesTags: ["maintenance"],
    }),

    // =======================================================>>>>> Document API
    getSingleOwnerAllTenantsDocuments: builder.query({
      query: (ownerId) => {
        return {
          url: `/document/${ownerId}`,
          method: "GET",
        };
      },
      providesTags: ["document"]
    }),


    // =======================================================>>>>> overview  API
    getAllDataOverviewByOwner: builder.query({
      query: (ownerId) => {
        return {
          url: `/owner/getAllDataOverviewByOwner/${ownerId}`,
          method: "GET",
        };
      },
      providesTags: ["overview"]
    }),

    // =======================================================>>>>> resent payment API
    getResentPaymentDataByOwner: builder.query({
      query: ({ ownerId, status }) => {
        return {
          url: `/owner/getResentPaymentDataByOwner/${ownerId}?status=${status}`,
          method: "GET",
        };
      },
      providesTags: ["paymentOverview"]
    }),

    // =======================================================>>>>> overview payment API ( monthly )
    getPaymentDataOverviewByOwner: builder.query({
      query: ({ ownerId, selectedDate }) => {
        return {
          url: `/owner/getPaymentDataOverviewByOwner/${ownerId}?selectedDate=${selectedDate}`,
          method: "GET"
        };
      },
    }),

    // =======================================================>>>>> get Single Tenant All Payment Data 
    getSingleTenantAllPaymentDataByOwner: builder.query({
      query: (userId) => {
        return {
          url: `/owner/getSingleTenantAllPaymentDataByOwner/${userId}`,
          method: "GET"
        };
      },
    }),


    // =======================================================>>>>> get get All Tenants For Message Data 
    getAllTenantsForMessage: builder.query({
      query: (userId) => {
        return {
          url: `/owner/getAllTenantsForMessage/${userId}`,
          method: "GET"
        };
      },
    }),

    // =======================================================>>>>> Withdrow placed API
    getPayoutDataBySingleOwner: builder.query({
      query: (ownerId) => {
        return {
          url: `/payment/getPayoutDataBySingleOwner/${ownerId}`,
          method: "GET",
        };
      },
      providesTags: ['payout']
    }),

    payout: builder.mutation({
      query: (data) => {
        return {
          url: `/payment/placedPayoutData`,
          method: "POST",
          body: data
        };
      },
      invalidatesTags: ['payout', 'user']
    }),

    
    sendPayoutRequestByOwner: builder.mutation({
      query: (data) => {
        return {
          url: `/payment/sendPayoutRequestByOwnerToStripe`,
          method: "POST",
          body : data
        };
      },
      invalidatesTags: ["payout"], 
    }),
    
    // ================================================ owner active or not
    isOwnerActive: builder.query({
      query: (email) => {        
        return {
          url: `/owner/isOwnerActive?email=${email}`,
          method: "GET",
        };
      },
    }),
    
    // ================================================ send review from owner  
    createReviewFromOwner: builder.mutation({
      query: (data) => {
        return {
          url: `/owner/createReviewFromOwner`,
          method: "POST",
          body : data
        };
      },
      invalidatesTags: ["review"], 
    }),

    // ================================================ sigle owner all payment history  
    getSingleOwnerPaymentHistory: builder.query({
      query: (email) => {
        return {
          url: `/owner/getSingleOwnerPaymentHistory?email=${email}`,
          method: "GET",
        };
      },
      invalidatesTags: ["payment-history"]
    }),
    
    





  }),
});

export default ownerApi;