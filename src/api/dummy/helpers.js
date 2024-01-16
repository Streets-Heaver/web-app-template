export const makeSimplePost = (route, responseBody) => (apiMocker) => {
  apiMocker.onPost(route).reply(200, responseBody ?? {});
};

export const makeSimpleGet = (route, responseBody) => (apiMocker) => {
  apiMocker.onGet(route).reply(200, responseBody ?? {});
};

export const makeSimplePostAndThen =
  (route, responseBody, then) => (apiMocker) => {
    apiMocker.onPost(route).reply((request) => {
      then(request);
      return [200, responseBody];
    });
  };

export const makeSimpleSearch =
  (
    route,
    data,
    isLike,
    pageSize = 10,
    defaultQuery = "",
    queryAccessor = (request) => request.params.search,
    offsetAccessor = (request) => request.params.offset,
    countAccessor = (request) => request.params.count
  ) =>
  (apiMocker) =>
    apiMocker.onGet(route).reply((request) => {
      const query = queryAccessor(request) ?? defaultQuery;
      const offset = offsetAccessor(request) ?? 0;
      const count = Math.min(countAccessor(request) ?? pageSize, pageSize);

      const results = data.filter((item) => isLike(item, query));
      const resultsPage = results.slice(offset, offset + count);

      return [
        200,
        { results: resultsPage, hasNextPage: offset + count < results.length },
      ];
    });
