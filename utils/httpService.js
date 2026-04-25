import axios from 'axios';
import Cookies from 'js-cookie';

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL;
const BASE_URL2 = process.env.NEXT_PUBLIC_BASE_URL2;
const BASE_URL3 = process.env.NEXT_PUBLIC_BASE_URLGC;


// API INSTANCE FOR V2
const API = axios.create({
  baseURL: `${BASE_URL}`,
  timeout: 60000
});

API.interceptors.request.use(
  (config) => {
    try {
      const token = Cookies.get('Authorization');
      const lang = Cookies.get('lang');
      if (token) {
        config.headers['Authorization'] = token;
      }
      // config.headers['locale'] = 1;
    } catch (error) {
      console.error('Error setting headers:', error);
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

API.interceptors.response.use(
  (response) => {
    return response.data;
  },
  async (error) => {
    const { response } = error;

    if (error?.response?.status === 403 || error?.response?.status === 401) {
      const Authorization = Cookies.get('Authorization');
      // toast.error('Login expired, redirecting...');
      if (Authorization) {
        Cookies.remove('Authorization');
        Cookies.remove('Authorization', { domain: '.merisehat.pk' });
      }
      setTimeout(() => {
        // window.location.href = "/";
      }, 5000);
    }

    if (response?.message === 'Network Error') {
      // toast.error(response?.data?.message);
    }

    const apiResponse = response ? response.data : Promise.reject(error);

    return apiResponse;
  }
);
// API INSTANCE FOR V3
const APIV3 = axios.create({
  baseURL: `${BASE_URL2}`,
  timeout: 60000
});

APIV3.interceptors.request.use(
  (config) => {
    try {
      const token = Cookies.get('Authorization');
      const lang = Cookies.get('lang');
      if (token) {
        config.headers['Authorization'] = token;
      }
      config.headers['platform'] = 'web';

      // config.headers['locale'] = 1;
    } catch (error) {
      console.error('Error setting headers:', error);
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

APIV3.interceptors.response.use(
  (response) => {
    return response;
  },
  async (error) => {
    const { response } = error;

    if (error?.response?.status === 403 || error?.response?.status === 401) {
      const Authorization = Cookies.get('Authorization');
      // toast.error('Login expired, redirecting...');
      if (Authorization) {
        Cookies.remove('Authorization');
        Cookies.remove('Authorization', { domain: '.merisehat.pk' });
      }
      setTimeout(() => {
        // window.location.href = "/";
      }, 5000);
    }

    if (response?.message === 'Network Error') {
      // toast.error(response?.data?.message);
    }

    const apiResponse = response ? response : Promise.reject(error);

    return apiResponse;
  }
);


// API INSTANCE FOR V3
const GREENCLINICAPI = axios.create({
  baseURL: `${BASE_URL3}`,
  timeout: 60000
});

GREENCLINICAPI.interceptors.request.use(
  (config) => {
    try {
      const token = Cookies.get('Authorization');
      const lang = Cookies.get('lang');
      if (token) {
        config.headers['Authorization'] = token;
      }
      config.headers['platform'] = 'web';

      // config.headers['locale'] = 1;
    } catch (error) {
      console.error('Error setting headers:', error);
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

GREENCLINICAPI.interceptors.response.use(
  (response) => {
    return response;
  },
  async (error) => {
    const { response } = error;

    if (error?.response?.status === 403 || error?.response?.status === 401) {
      const Authorization = Cookies.get('Authorization');
      // toast.error('Login expired, redirecting...');
      // if (Authorization) {
      //   Cookies.remove('Authorization');
      //   Cookies.remove('Authorization', { domain: '.merisehat.pk' });
      // }
      setTimeout(() => {
        // window.location.href = "/";
      }, 5000);
    }

    if (response?.message === 'Network Error') {
      // toast.error(response?.data?.message);
    }

    const apiResponse = response ? response : Promise.reject(error);

    return apiResponse;
  }
);

export default API;
export { APIV3, GREENCLINICAPI };
// Export the functions
