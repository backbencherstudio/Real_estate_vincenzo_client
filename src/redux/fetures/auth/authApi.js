import { baseApi } from "../../api/baseApi";

const authApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({

    createUser: builder.mutation({
      query: (userData) => {
        return {
          url: "/auth/create-user",
          method: "POST",
          body: userData,
        }
      },
    }),

    getSingleUserInfo: builder.query({
      query: (email) => {
        return {
          url: `/auth?email=${email}`,
          method: "GET",
          params: email,
        }
      },
      providesTags: ["user", "properties"]
      // providesTags: ["singleUserInfo"]
      // providesTags: (result, error, email) => [{ type: "singleUserInfo", id: email }]
    }),

    verifyOTP: builder.mutation({
      query: (otpData) => {
        return {
          url: "/auth/verifyOTP",
          method: "POST",
          body: otpData,
        }
      },
    }),

    getALlUser: builder.query({
      query: (status) => {
        return {
          url: "/auth/allUsers",
          method: "GET",
          params: { status },
        };
      },
      providesTags: ["user"],
    }),

    login: builder.mutation({
      query: (userInfo) => ({
        url: "/auth/login",
        method: "POST",
        body: userInfo,
      }),
    }),

    resetPassword: builder.mutation({
      query: (resetPasswordData) => ({
        url: "/auth/resetPassword",
        method: "POST",
        body: resetPasswordData,
      }),
    }),

    verifyOtpForResetPassword: builder.mutation({
      query: (verifyOtpResetPassword) => ({
        url: "/auth/verifyOtpForResetPassword",
        method: "PATCH",
        body: verifyOtpResetPassword,
      }),
    }),

    cancelsubscription: builder.mutation({
      query: (customerId) => ({
        url: `/payment/cancel-subscription/${customerId}`,
        method: "POST",
      }),
    }),

    //======================================================= Landing pages API call here
    contactUs: builder.mutation({
      query: (data) => ({
        url: `/auth/contactUs`,
        method: "POST",
        body: data
      }),
    }),

    getAdvisersData: builder.query({
      query: () => ({
        url: `/auth/getAdvisersData`,
        method: "GET",
      }),
    }),

    // ==================================== Email collection 
    emailCollection: builder.mutation({
      query: (data) => ({
        url: `/auth/emailCollection`,
        method: "POST",
        body: data
      }),
      invalidatesTags: ["email"]
    }),


    // ========================================= select plan
    planController: builder.mutation({
      query: (data) => ({
        url: `/payment/planController`,
        method: "POST",
        body: data
      }),
      invalidatesTags:["user", "properties"]
    }),








  }),
});

export default authApi;
