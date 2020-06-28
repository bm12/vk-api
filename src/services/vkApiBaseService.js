import axios from 'axios';

const instance = axios.create({
  baseURL: 'https://api.vk.com/method/',
});

const API_VERSION = '5.110';

export const requestVkApi = {
  get: ({ methodName, params }) => {
    instance.get(methodName, {
      params: {
        ...params,
        access_token: '',
        v: API_VERSION,
      },
    });
  },
};
