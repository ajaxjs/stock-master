import { createAlova } from 'alova';
import { useGlobSetting } from '@/hooks/setting';
import VueHook from 'alova/vue';
import { useUser } from '@/store/modules/user';
import adapterFetch from 'alova/fetch';

const { apiUrl, urlPrefix } = useGlobSetting();
// Alova实例
export const Alova = createAlova({
  baseURL: apiUrl + urlPrefix,
  statesHook: VueHook,
  requestAdapter: adapterFetch(),
  // 在开发环境开启缓存命中日志
  cacheLogger: process.env.NODE_ENV === 'development',
  async beforeRequest(method) {
    const userStore = useUser();
    let token = userStore.token;
    if (!token) {
      token = await userStore.getToken();
    }
    method.config.headers['token'] = token.jwt;
  },
  responded: {
    onSuccess: async (response: Response) => {
      return (response.json && (await response.json())) || response.body;
    },
  },
});

export const AlovaBasic = createAlova({
  baseURL: apiUrl + urlPrefix,
  statesHook: VueHook,
  requestAdapter: adapterFetch(),
  // 在开发环境开启缓存命中日志
  cacheLogger: process.env.NODE_ENV === 'development',
  beforeRequest(method) {
    const userStore = useUser();
    const token = userStore.token;
    if (token) {
      method.config.headers['token'] = token.jwt;
    }
  },
  responded: {
    onSuccess: async (response: Response) => {
      return (response.json && (await response.json())) || response.body;
    },
  },
});
