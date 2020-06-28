import axios from 'axios';

const axiosInstance = axios.create({
  baseURL: 'https://api.vk.com/method/',
});

const API_VERSION = '5.110';

export const requestVkApi = {
  get: ({ methodName, params }) => axiosInstance
    .get(methodName, {
      params: {
        ...params,
        access_token: process.env.ACCESS_TOKEN,
        v: API_VERSION,
      },
    }),
};
