import axios, { AxiosRequestConfig, AxiosResponse, AxiosError } from 'axios';
import { getToken } from './auth';
import { errorCode, ErrObjectKeys } from './errorCode';

interface ExtendHeaders {
  'access-token'?: string;
  'content-encoding'?: string;
}

interface AxiosTypes<T> {
  data: T;
  status: number;
  statusText: string;
}

interface ResponseTypes<T> {
  code: number;
  msg: string;
  result: T;
}

interface RequestParams {
  url: string;
  params?: object;
  body?: object;
  config?: AxiosRequestConfig;
}

axios.defaults.timeout = 100000;
(axios as any).defaults.headers['Content-Type'] = 'application/json;charset=utf-8';

const service = axios.create({
  // 如需要携带cookie 该值需设为true
  withCredentials: true,
});

service.interceptors.request.use(
  (config: any) => {
    // 是否需要设置 token
    if (getToken()) {
      const customHeaders: ExtendHeaders = {
        'access-token': getToken(),
        'content-encoding': 'gzip',
      };
      return {
        ...config,
        headers: {
          ...config.headers,
          ...customHeaders,
        },
      };
    }
  },
  (error) => {
    console.log(error);
    return Promise.reject(error);
  },
);

// 响应拦截器
service.interceptors.response.use(
  (res) => {
    const code: number = res.data.code || 200;
    const errorCodeObj: ErrObjectKeys = errorCode;
    const msg: string = errorCodeObj[code] || res.data.msg || errorCode.default;
    if ([100008, 100017, 200004, 100020, 300001].includes(code)) {
      const event = new CustomEvent<any>('BdhMicroMainSessionExpired', {
        detail: res,
      });
      window.dispatchEvent(event);
      return res.data;
    }
    if (code !== 200) {
      console.log(msg);
      return Promise.reject(new Error(msg));
    }
    return res.data;
  },
  (error) => {
    let { message } = error;
    if (message === 'Network Error') {
      message = '后端接口连接异常';
    } else if (message.includes('timeout')) {
      message = '系统接口请求超时';
    } else if (message.includes('Request failed with status code')) {
      message = '系统接口' + message.substr(message.length - 3) + '异常';
    }
    console.log(message);
    return Promise.reject(error);
  },
);

// 核心处理代码 将返回一个promise 调用then将可获取响应的业务数据
const requestHandler = <T,>(
  method: 'get' | 'post' | 'put' | 'delete' | 'deleteRaw',
  url: string,
  params: object = {},
  config: AxiosRequestConfig = {},
): Promise<T> => {
  let response: Promise<AxiosTypes<ResponseTypes<T>>>;
  switch (method) {
    case 'get':
      response = service.get(url, { params: { ...params }, ...config });
      break;
    case 'post':
      response = service.post(url, params, { ...config });
      break;
    case 'put':
      response = service.put(url, params, { ...config });
      break;
    case 'delete':
      response = service.delete(url, { params: { ...params }, ...config });
      break;
    default:
      response = service.get(url, { params: { ...params }, ...config });
  }

  return new Promise<T>((resolve, reject) => {
    response
      .then((res: any) => {
        resolve(res);
      })
      .catch((error: AxiosError) => {
        const e = JSON.stringify(error);
        reject(error);
      });
  });
};

const mergeParams = (url: string, params: object = {}) => {
  type ParamType = keyof typeof params;
  let resultUrl = `${url}?`;
  Object.keys(params).forEach((key) => {
    const value = params[key as ParamType];
    if (value !== null && typeof value !== 'undefined') {
      resultUrl = `${resultUrl}${encodeURIComponent(key)}=${encodeURIComponent(value)}&`;
    }
  });
  return resultUrl.slice(0, -1);
};

export const request = {
  get: <T,>({ url, params, config }: RequestParams) => requestHandler<T>('get', url, params, config),
  delete: <T,>({ url, params, config }: RequestParams) => requestHandler<T>('delete', url, params, config),
  post: <T,>({ url, params, body, config }: RequestParams) =>
    requestHandler<T>('post', mergeParams(url, params), body, config),
  put: <T,>({ url, params, body, config }: RequestParams) =>
    requestHandler<T>('put', mergeParams(url, params), body, config),
};
