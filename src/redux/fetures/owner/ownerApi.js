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
      invalidatesTags: ["properties", "user"],
    }),

    createUnit: builder.mutation({
      query: (unitData) => {
        return {
          url: "/owner/create-unit",
          method: "POST",
          body: unitData
        };
      },
      invalidatesTags: ["properties", "user"],
    }),

    createTenant: builder.mutation({
      query: (tenantData) => {
        return {
          url: "/owner/create-tenant",
          method: "POST",
          body: tenantData
        };
      },
      invalidatesTags: ["properties", "user"],
    }),

    // =======================================================>>>>> Maintatenance API

    getMaintenanceData: builder.query({
      query: (ownerId) => {
        return {
          url: `/owner/maintenanceData/${ownerId}`,
          method: "GET",
        };
      },
      providesTags:["maintenance"]
    }),

    getSingleMaintenanceData: builder.query({
      query: (maintenanceId) => {
        return {
          url: `/owner/singleMaintenanceData/${maintenanceId}`,
          method: "GET",
        };
      },
      providesTags : ["maintenance"]
    }),

    statusChangeInMaintenanceData: builder.mutation({
      query: (statusData) => {        
        return {
          url: `/owner/singleMaintenanceData/${statusData?.maintenanceId}`,
          method: "PATCH",
          body : statusData
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
      providesTags : ["document"]
    }),


  }),
});

export default ownerApi;