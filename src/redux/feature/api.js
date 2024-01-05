import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

// const api = createApi({
//     reducerPath: 'api',
//     baseQuery: fetchBaseQuery({
//         baseUrl: 'http://localhost:4444/',
//     }),

//     endpoints: (build) => ({
//         getProducts: build.query({
//             query: () => '/products',
//         }),
//         getProduct: build.query({
//             query: (id) => `/products/${id}`,
//         }),
//         getOrders: build.query({
//             query: () => '/orders',
//         }),
//         getOrder: build.query({
//             query: (id) => `/orders/${id}`,
//         }),
//         getUsers: build.query({
//             query: () => '/users',
//         }),
//         getUser: build.query({
//             query: (id) => `/users/${id}`,
//         }),
//         getComments: build.query({
//             query: () => '/comments',
//         }),
//         getComment: build.query({
//             query: (id) => `/comments/${id}`,
//         }),
//     }),
// })

// export default api

// const baseQuery = fetchBaseQuery({
//     baseUrl: 'http://localhost:4444/'
// })

// export const api = createApi({
//     baseQuery: baseQuery,
//     endpoints: builder => ({})
// })