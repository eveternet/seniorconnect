// api.jsx (or wherever you define your API_BASE_URL constant)

// Make sure your .env file has:
// VITE_API_BASE_URL=https://seniorconnect-python.vercel.app/api

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

// Then export it
export default API_BASE_URL;

// Or if you prefer named exports:
// export const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;
