import { requestVkApi } from './vkApiBaseService';

const methodPefix = 'docs.';

export const documnetsService = {
  search: ({
    query,
    count = 20,
    offset = 0,
    searchOwn = false,
    returnTags = false,
  }) => requestVkApi.get({
    methodName: `${methodPefix}search`,
    params: {
      q: query,
      search_own: searchOwn,
      return_tags: returnTags,

      offset,
      count,
    },
  })
    .then(({ data }) => data.response),
};
