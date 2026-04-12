// import axios from "axios";

// const api = axios.create({
//   baseURL: "http://localhost:5000",
// });

// api.interceptors.request.use((config) => {
//   const token = localStorage.getItem("token");

//   if (token) {
//     config.headers.Authorization = `Bearer ${token}`;
//   }

//   return config;
// });

// export default api;
import axios from "axios";

const api = axios.create({
  baseURL: "https://pingme-grp2-1.onrender.com",
});

// ✅ Automatically attach token from sessionStorage
api.interceptors.request.use((config) => {
  const token = sessionStorage.getItem("token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default api;