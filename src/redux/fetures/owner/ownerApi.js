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
          url: `/owner/6784e70a816561d1eea5cf95`,
          method: "GET",
        };
      },
      providesTags: ["properties"],
    }),
    getOwnerTenants: builder.query({
      query: () => {
        return {
          url: `/owner/unit/6784e70a816561d1eea5cf95`,
          method: "GET",
        };
      },
      providesTags: ["tenants"],
    }),
  }),
});

export default ownerApi;
