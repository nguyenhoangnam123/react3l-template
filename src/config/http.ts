import { AxiosError, AxiosRequestConfig, AxiosResponse } from "axios";
import { BASE_API_URL } from "config/consts";
import { Repository } from "@react3l/react3l/core";
import { serialize } from "@react3l/react3l/helpers";
import authenticationService from "services/authentication-service";
import appMessageService from "services/app-message-service";
import { FORBIDENT_ROUTE } from "config/route-consts";
export const httpConfig: AxiosRequestConfig = {
  withCredentials: false,
  baseURL: BASE_API_URL,
  headers: {
    "Content-Type": "application/json",
  },
};

Repository.requestInterceptor = function(
  config: AxiosRequestConfig,
): AxiosRequestConfig {
  if (typeof config.params === "object" && config.params !== null) {
    config.params = serialize(config.params);
  }

  if (config.data instanceof FormData) {
    config.headers["Content-Type"] = "multipart/form-data";
    return config;
  }

  if (typeof config.data === "object" && config.data !== null) {
    config.data = serialize(config.data);
  }

  return config;
};

Repository.responseInterceptor = function(
  response: AxiosResponse,
): AxiosResponse {
  if (typeof response.data === "object" && response.data !== null) {
    if (response.headers["content-type"]?.startsWith("application/json")) {
      response.data = serialize(response.data);
    } // serialize data just apply with json
  }
  return response;
};

Repository.errorInterceptor = function(error: AxiosError): AxiosError {
  const {
    notifyUnAuthorize,
    notifyBadRequest,
    notifyServerError,
    notifyBEError,
    notifyIdleError,
  } = appMessageService.useCRUDMessage();
  // log error if dev environment
  if (error?.response?.status) {
    switch (error.response.status) {
      case 400:
        notifyBadRequest();
        break;
      case 401:
        notifyUnAuthorize(error.response.statusText);
        authenticationService.logout();
        break;
      case 403:
        window.location.href = FORBIDENT_ROUTE;
        break;
      case 420:
        notifyBEError(error.response.statusText);
        break;
      case 500:
        notifyServerError(error.response.statusText);
        break;
      case 502:
        notifyServerError(error.response.statusText);
        break;
      case 504:
        notifyIdleError(error.response.statusText);
        break;
      default:
        break;
    }
  }
  throw error;
};
