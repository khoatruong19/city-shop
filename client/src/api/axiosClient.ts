import axios from 'axios';
import queryString from 'query-string';

const baseUrl = 'http://localhost:4000/api/';

const axiosClient = axios.create({
  baseURL: baseUrl,
  paramsSerializer: (params) => queryString.stringify({ params }),
});

axiosClient.defaults.withCredentials = true;

axiosClient.interceptors.response.use(
  (response) => {
    if (response && response.data) return response;
    return response;
  },
  (err) => {
    if (!err.response) {
      return alert(err);
    }
    throw err.response;
  }
);

export default axiosClient;
