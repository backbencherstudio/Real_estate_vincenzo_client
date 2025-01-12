import { baseApi } from "../../api/baseApi";

const authApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({

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
