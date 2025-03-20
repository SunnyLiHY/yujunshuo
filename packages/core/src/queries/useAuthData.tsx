import { useQuery } from '@tanstack/react-query';
import { request } from '@micro-react/utils';
import { produce } from 'immer';
import { rsBaseAPI } from '../constant';
import { ReactQueryOptions, ResponseData } from '../interfaces';
import { Result, Spin } from 'antd';

interface AuthDataInner {
  ampCode: string[];
  loginName: string;
  staffId: string;
  staffName: string;
}

export interface AuthData extends AuthDataInner {
  ampCodeMap: Record<string, boolean>;
}

const url = `${rsBaseAPI}/client/getAmpMenu`;

const fetchAuthData = () =>
  request.post<ResponseData<AuthData>>({ url, body: {} }).then((res) =>
    produce(res, (draft) => {
      const ampCodeMap: Record<string, boolean> = {};
      res.data.ampCode.forEach((code) => {
        ampCodeMap[code] = true;
      });

      draft.data.ampCodeMap = ampCodeMap;
    }),
  );

/**
 * 权限信息
 * @returns
 */
export const useAuthData = () =>
  useQuery<ResponseData<AuthData>>([url], () => fetchAuthData(), {
    /**
     * 设定 5s 的新鲜时间，权限请求在路由和组件内均会获取，可避免重复发请求
     */
    staleTime: 5000,
  });

/**
 * 如果类型为数组，则数组的元素应为权限点，权限点之间为“且”关系；
 *
 * 如果类型为函数，则应返回 boolean 类型。
 */
export type Judge = string[] | ((ampCodeMap: AuthData['ampCodeMap']) => boolean);

const InjectAuthority = ({ children, judge }: { children: React.ReactNode; judge: Judge }) => {
  const { data: authData, isLoading } = useAuthData();

  if (isLoading) {
    return (
      <div>
        <Spin />
      </div>
    );
  }

  const ampCodeMap = authData?.data.ampCodeMap;

  const noPermission = (
    <Result
      icon={<img src="/oss-static-api/micro/main/no-permission.png" />}
      title="暂无权限"
      subTitle="抱歉, 您尚未被授权使用此模块。"
      // extra={<Button type="primary">返回</Button>}
    />
  );

  if (ampCodeMap) {
    if (Array.isArray(judge)) {
      if (judge.find((item) => !ampCodeMap[item])) {
        return noPermission;
      }
    } else if (typeof judge === 'function') {
      if (!judge(ampCodeMap)) {
        return noPermission;
      }
    }
  }

  return <>{children}</>;
};

/**
 * 高阶组件，为组件增加权限校验
 *
 * @example
 * ```ts
 * const DemoComposed = withAuth(['comm:room:getByPage'])(DemoComponent);
 * ```
 *
 * @example
 * ```ts
 * const DemoComposed = withAuth((ampCodeMap) => ampCodeMap['comm:room:getByPage'])(DemoComponent);
 * ```
 *
 * @param judge 判断条件，可为数组或者函数
 * @returns 含权限判断的组件
 */
export const withAuth =
  (judge: Judge) =>
  <Props extends Record<string, never>>(WrappedComponent: React.ComponentType<Props>) => {
    // 为 React Dev Tools 生成一个 displayName .
    const displayName = WrappedComponent.displayName || WrappedComponent.name || 'Component';

    const ComponentWithAuth = (props: Props) => (
      <InjectAuthority judge={judge}>
        <WrappedComponent {...props} />
      </InjectAuthority>
    );

    ComponentWithAuth.displayName = `withAuth(${displayName})`;
    return ComponentWithAuth;
  };

/**
 * 用户单位信息
 */
export const useMainConfig = () => {
  const url = `/oss-static-api/micro/main/config.json`;
  return useQuery<{
    aliasName: string;
  }>(
    [url],
    () =>
      request.get({ url }) as unknown as Promise<{
        aliasName: string;
      }>,
  );
};

type UserInfo = {
  ampCode: string[];
  ampAuth: unknown[];
  loginName: string;
  staffId: string;
  staffName: string;
};
/**
 * 登陆用户信息
 */
export const useUserInfo = (_?: Record<string, never>, options?: ReactQueryOptions<UserInfo>) => {
  const url = `/micro-api/client/getAmpMenu`;
  return useQuery<ResponseData<UserInfo>>([url], () => request.post({ url }), options);
};
