import axios from 'axios';
import {HOST_API_KEY} from '@env';
// config

// ----------------------------------------------------------------------

// const axiosInstance = axios.create({baseURL: HOST_API_KEY});

// axiosInstance.interceptors.response.use(
//   response => response,
//   error =>
//     Promise.reject(
//       (error.response && error.response.data) || 'Something went wrong',
//     ),
// );

const axiosInstance = axios.create({
  baseURL: HOST_API_KEY,
  headers: {
    'Content-Type': 'application/json',
  },
});

export default axiosInstance;
