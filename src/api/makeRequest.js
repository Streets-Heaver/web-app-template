import axios from "axios";
import MockAdapter from "axios-mock-adapter";
import { injectDummyEndpoints } from "./dummy";

const apiInstance = axios.create();

const apiMocker = new MockAdapter(apiInstance, {
  onNoMatch: "passthrough",
  delayResponse: 1500,
});

injectDummyEndpoints(apiMocker);

/**
 * @typedef {{
 *    method?: "get" | "post" | "put" | "delete" | "search",
 *    params?: any,
 *    headers?: any,
 *    body?: any,
 *    axiosInstance?: typeof apiInstance
 * }} RequestOptions
 *
 * @param {string} url
 * @param {RequestOptions} options
 * @returns {Promise<any>}
 */
export const makeRequest = (url, options = {}) => {
  options.method = options.method ?? "get";
  options.params = options.params ?? {};
  options.headers = options.headers ?? {};
  options.body = options.body ?? {};
  options.axiosInstance = options.axiosInstance ?? apiInstance;

  return makeAxiosRequest(url, options).then((response) => response.data);
};

const makeAxiosRequest = (
  url,
  { method, params, headers, body, axiosInstance }
) => {
  const config = {
    params,
    headers: {
      "Content-Type": "application/json",
      ...headers,
    },
  };

  switch (method) {
    case "get":
      return axiosInstance.get(url, config);
    case "post":
      return axiosInstance.post(url, body, config);
    case "put":
      return axiosInstance.put(url, body, config);
    case "delete":
      return axiosInstance.delete(url, { ...config, data: body });
    case "search":
      return axiosInstance.request({
        ...config,
        url,
        method: "SEARCH",
        data: body,
      });
    default:
      break;
  }

  throw new Error(`Unrecognized http method ${method}`);
};
