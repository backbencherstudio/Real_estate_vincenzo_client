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
    providesTags: ["owner", "properties"],
    }),

    
  }),
});

export default ownerApi;