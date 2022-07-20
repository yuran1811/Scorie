import { axiosConfig } from '@/config';
import axios, { AxiosError, AxiosRequestConfig, AxiosResponse } from 'axios';
import { auth } from './firebase';

const onRequest = (config: AxiosRequestConfig): AxiosRequestConfig => {
  const currentUser = auth.currentUser;

  if (currentUser)
    currentUser.getIdToken().then((token) => {
      if (config?.headers && config.headers?.Authorization) {
        config.headers.Authorization = `Bearer ${token}`;
      }
    });

  return config;
};

const onRequestError = (error: AxiosError): Promise<AxiosError> => {
  console.error(`[request error] [${JSON.stringify(error)}]`);
  return Promise.reject(error);
};

const onResponse = (response: AxiosResponse): AxiosResponse => {
  if (response && response.data) return response.data;
  return response;
};

const onResponseError = (error: AxiosError): Promise<AxiosError> => {
  console.error(`[response error] [${JSON.stringify(error)}]`);
  return Promise.reject(error);
};

const axiosAPI = axios.create(axiosConfig);

axiosAPI.interceptors.request.use(onRequest, onRequestError);
axiosAPI.interceptors.response.use(onResponse, onResponseError);

export default axiosAPI;
