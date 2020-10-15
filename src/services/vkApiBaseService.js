import jsonp from 'jsonp';
import qs from 'qs';
import { VK_API_VERSION } from './constants';
import { getAccessToken } from '@/modules/auth';

const getApiUrl = (path, params) => `https://api.vk.com/method/${path}?${qs.stringify(params, { encodeValuesOnly: true })}`;

const requestJsonp = (methodName, params) => {
  const url = getApiUrl(methodName, {
    ...params,
    access_token: getAccessToken(),
    v: VK_API_VERSION,
  });
  const promise = new Promise((res, rej) => {
    jsonp(url, { param: 'callback' }, (err, data) => {
      if (err) rej(err);
      else res(data);
    });
  });

  return promise;
};

export const requestVkApi = {
  get: ({ methodName, params }) => requestJsonp(methodName, params),
};
