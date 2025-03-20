/**
 * http 请求返回值通用接口
 */
export interface ResponseData<Data> {
  code: number;
  msg: string;
  success: boolean;
  data: Data;
}

/**
 * 适配 react-query 配置的自定义接口
 */
export interface ReactQueryOptions<TData> {
  enabled?: boolean;
  onSuccess?: (data: ResponseData<TData>) => void;
}

/**
 * 适配 react-query Mutation 配置的自定义接口
 */
export interface ReactMutationOptions {}
