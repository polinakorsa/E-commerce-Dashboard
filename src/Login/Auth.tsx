import axios from 'axios';

export const api = axios.create({
  baseURL: 'https://dummyjson.com',
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      const refreshToken = localStorage.getItem('refreshToken');

      if (!refreshToken) {
        localStorage.removeItem('token');
        localStorage.removeItem('refreshToken');
        window.location.href = '/';
        return Promise.reject(error);
      }

      try {
        const { data } = await axios.post(
          'https://dummyjson.com/auth/refresh',
          {
            refreshToken,
            expiresInMins: 30,
          }
        );

        localStorage.setItem('token', data.accessToken);
        localStorage.setItem('refreshToken', data.refreshToken);

        originalRequest.headers.Authorization = `Bearer ${data.accessToken}`;
        return api(originalRequest);
      } catch (refreshError) {
        localStorage.removeItem('token');
        localStorage.removeItem('refreshToken');
        window.location.href = '/';
        return Promise.reject(refreshError);
      }
    }

    return Promise.reject(error);
  }
);
