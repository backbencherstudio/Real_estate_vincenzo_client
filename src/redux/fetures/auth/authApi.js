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
 

    
  }),
});

export default authApi;
