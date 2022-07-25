import { axiosConfig as AxiosDefaultConfig } from '@/config';
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

const getAxiosInst = (axiosConfig?: AxiosRequestConfig) => {
  const newAxios = axios.create(axiosConfig || AxiosDefaultConfig);

  newAxios.interceptors.request.use(onRequest, onRequestError);
  newAxios.interceptors.response.use(onResponse, onResponseError);

  return newAxios;
};

export default getAxiosInst;
