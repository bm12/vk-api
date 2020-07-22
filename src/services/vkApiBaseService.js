import axios from 'axios';
import { VK_API_VERSION } from './constants';
import { getAccessToken } from '@/modules/auth';

const axiosInstance = axios.create({
  baseURL: 'https://api.vk.com/method/',
});

export const requestVkApi = {
  get: ({ methodName, params }) => axiosInstance
    .get(methodName, {
      params: {
        ...params,
        access_token: getAccessToken(),
        v: VK_API_VERSION,
      },
    }),
};
