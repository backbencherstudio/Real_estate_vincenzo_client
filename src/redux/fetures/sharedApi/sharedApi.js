import { baseApi } from "../../api/baseApi";

const sharedApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({    

    getPropertieUnits: builder.query({
      query: (id) => {
        return {
            url: `/admin/propertie-units/${id}`,
            method: "GET",
        };
    },
    providesTags: ["properties"],
    }),



  }),
});

export default sharedApi;
