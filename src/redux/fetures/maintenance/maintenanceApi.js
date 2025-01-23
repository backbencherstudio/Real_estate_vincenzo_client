import { baseApi } from "../../api/baseApi";

const maintenanceApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({

        getSingleUserMaintenanceData: builder.query({
            query: (id) => {
                return {
                    url: `/maintenance/${id}`,
                    method: "GET",
                };
            },
            providesTags: ["maintenance"],
        }),

        createMaintenance: builder.mutation({
            query: (data) => {
                return {
                    url: "/maintenance",
                    method: "POST",
                    body: data
                };
            },
            invalidatesTags: ["maintenance"],
        }),



    }),
});

export default maintenanceApi;