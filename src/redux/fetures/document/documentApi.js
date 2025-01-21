import { baseApi } from "../../api/baseApi";


const documentApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({

        getSingleOwnerAllTenantsDocuments: builder.query({
            query: (ownerId) => {
                return {
                    url: `/document/${ownerId}`,
                    method: "GET",
                };
            },
            providesTags: ["document"]
        }),
        
        getSingleUserAllDocuments: builder.query({
            query: (userId) => {
                return {
                    url: `/document/singleUserAllDocuments/${userId}`,
                    method: "GET",
                };
            },
            providesTags: ["document"]
        }),

        createDocument: builder.mutation({
            query: (data) => {
                return {
                    url: "/document",
                    method: "POST",
                    body: data
                };
            },
            invalidatesTags: ["document"],
        }),

        getSingleDocument: builder.query({
            query: (documentId) => {
                console.log(documentId);
                
                return {
                    url: `/document/singleDocument/${documentId}`,
                    method: "GET",
                };
            },
            providesTags: ["document"],
        }),



    }),
});

export default documentApi;