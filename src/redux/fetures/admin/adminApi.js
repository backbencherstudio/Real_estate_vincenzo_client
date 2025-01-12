import { baseApi } from "../../api/baseApi";

const adminApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    

    getALlUser: builder.query({
      query: (role) => {
        return {
            url: `/auth/allUsers?role=${role}`,
            method: "GET",
        };
    },
    providesTags: ["user"],
    }),



  }),
});

export default adminApi;
