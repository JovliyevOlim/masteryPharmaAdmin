import axios, { AxiosResponse, AxiosRequestConfig } from 'axios';

export const baseUrl = 'http://192.168.1.50:8090/api';
axios.defaults.baseURL = baseUrl;

const getToken = (): string | null => {
  const authUser = localStorage.getItem('authUser');
  if (authUser) {
    try {
      const parsedAuthUser = JSON.parse(authUser);
      return parsedAuthUser?.token || null;
    } catch (error) {
      console.error('Error parsing authUser:', error);
      return null;
    }
  }
  return null;
};

const token = getToken();
if (token) {
  axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
}

// intercepting to capture errors
axios.interceptors.response.use(
  function (response) {
    return response.data ? response.data : response;
  },
  function (error) {
    // Any status codes that falls outside the range of 2xx cause this function to trigger
    let message;
    switch (error.response.status) {
      case 500:
        message = 'Internal Server Error';
        break;
      case 401:
        message = error.response.data.message;
        break;
      // case 403:
      //   window.location.href = '/signIn';
      //   message = 'Login qilish kerak';
      //   break;
      case 404:
        message = error.response.data.message;
        break;
      case 409:
        message = error.response.data.message;
        break;
      default:
        message = error.message || error;
    }
    return Promise.reject(message);
  },
);
/**
 * Sets the default authorization
 * @param {*} token
 */
const setAuthorization = (token: string) => {
  axios.defaults.headers.common['Authorization'] = 'Bearer ' + token;
};

class APIClient {
  /**
   * Fetches data from the given URL
   */
  get = (url: string, params?: any): Promise<AxiosResponse> => {
    let response: Promise<AxiosResponse>;

    let paramKeys: string[] = [];
    if (params) {
      Object.entries(params).map(([key, value]) => {
        if (value != null) {
          paramKeys.push(key + '=' + params[key]);
          return paramKeys;
        }
      });
      const queryString =
        paramKeys && paramKeys.length ? paramKeys.join('&') : '';
      response = axios.get(`${url}?${queryString}`);
    } else {
      response = axios.get(`${url}`);
    }
    return response;
  };

  /**
   * Posts the given data to the URL
   */
  create = (url: string, data: any): Promise<AxiosResponse> => {
    console.log(token);
    return axios.post(url, data);
  };

  /**
   * Updates data
   */
  update = (url: string, data: any): Promise<AxiosResponse> => {
    return axios.patch(url, data);
  };

  put = (url: string, data: any): Promise<AxiosResponse> => {
    return axios.put(url, data);
  };

  /**
   * Deletes data
   */
  delete = (
    url: string,
    config?: AxiosRequestConfig,
  ): Promise<AxiosResponse> => {
    return axios.delete(url, { ...config });
  };
}

const getLoggedinUser = () => {
  const user = localStorage.getItem('authUser');
  if (!user) {
    return null;
  } else {
    return JSON.parse(user);
  }
};

export { APIClient, setAuthorization, getLoggedinUser };
