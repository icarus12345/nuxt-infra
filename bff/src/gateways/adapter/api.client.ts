// import axios, { CreateAxiosDefaults } from 'axios';
// import { getSession } from "next-auth/react";

// export async function ApiClient(endpoint, options = {}) {
//   const session = await getSession();
//   const headers = {
//     "Content-Type": "application/json",
//     ...(session ? { Authorization: `Bearer ${session.accessToken}` } : {}),
//     ...options.headers,
//   };

//   const res = await fetch(`${process.env.LARAVEL_API_URL}${endpoint}`, {
//     ...options,
//     headers,
//   });

//   if (!res.ok) {
//     throw new Error(`Error: ${res.status}`);
//   }
//   return res.json();
// }