import axios from 'axios';
import { VK_API_VERSION } from './constants';

const axiosInstance = axios.create({
  baseURL: 'https://api.vk.com/method/',
});

export const requestVkApi = {
  get: ({ methodName, params }) => axiosInstance
    .get(methodName, {
      params: {
        ...params,
        access_token: JSON.parse(localStorage.getItem('authData')).accessToken,
        v: VK_API_VERSION,
      },
    }),
};
