import { requestVkApi } from './vkApiBaseService';

const methodPefix = 'docs.';

export const documnetsService = {
  search: ({ query }) => {
    return requestVkApi.get({
      methodName: `${methodPefix}search`,
      params: {
        q: query,
      },
    });
  },
};
