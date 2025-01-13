import { baseApi } from "../../api/baseApi";

const ownerApi = baseApi.injectEndpoints({
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

    getAllOwnerProperties: builder.query({
      query: () => {
        return {
          url: `/owner/677f83aac9e34dc1bd25636b`,
          method: "GET",
        };
      },
      providesTags: ["properties"],
    }),
  }),
});

export default ownerApi;
