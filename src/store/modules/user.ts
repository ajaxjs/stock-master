import { defineStore } from 'pinia';
import { store } from '@/store';
import { ACCESS_TOKEN, CURRENT_USER, IS_SCREENLOCKED } from '@/store/mutation-types';
import { ResultEnum } from '@/enums/httpEnum';

import { getUserInfo as getUserInfoApi, login, getTokenApi } from '@/api/system/user';
import { storage } from '@/utils/Storage';

export type UserInfoType = {
  // TODO: add your own data
  avatar: string;
  nickname: string;
};

export type Token = {
  jwt: string;
  exp: number;
  iat: number;
  inf: Object;
};

export interface IUserState {
  token: Token;
  nickname: string;
  welcome: string;
  avatar: string;
  permissions: any[];
  info: UserInfoType;
}

export const useUserStore = defineStore({
  id: 'app-user',
  state: (): IUserState => ({
    token: storage.get(ACCESS_TOKEN, ''),
    nickname: '',
    welcome: '',
    avatar: '',
    permissions: [],
    info: storage.get(CURRENT_USER, {}),
  }),
  getters: {
    getAvatar(): string {
      return this.avatar;
    },
    getNickname(): string {
      return this.nickname;
    },
    getPermissions(): [any][] {
      return this.permissions;
    },
    getUserInfo(): UserInfoType {
      return this.info;
    },
  },
  actions: {
    refreshToken() {
      return getTokenApi().then((token) => {
        this.setToken(token);
        return token;
      });
    },
    // 获取token
    getToken() {
      if (this.token) {
        return Promise.resolve(this.token);
      }
      return getTokenApi().then((token) => {
        storage.set(ACCESS_TOKEN + '_temp', token);
        return token;
      });
    },
    setToken(token: Token) {
      this.token = token;
    },
    setAvatar(avatar: string) {
      this.avatar = avatar;
    },
    setPermissions(permissions) {
      this.permissions = permissions;
    },
    setUserInfo(info: UserInfoType) {
      this.info = info;
    },
    // 登录
    async login(params: any) {
      const response = await login(params);
      console.log('login response', response);

      const { data, code } = response;
      if (code === ResultEnum.SUCCESS) {
        const ex = 7 * 24 * 60 * 60;
        storage.set(ACCESS_TOKEN, data, ex);
        storage.set(CURRENT_USER, data.inf, ex);
        storage.set(IS_SCREENLOCKED, false);
        this.setToken(data);
        this.setUserInfo(data);
      }
      return response;
    },

    // 获取用户信息
    async getInfo() {
      const res = await getUserInfoApi();
      const { data } = res;
      /*if (data.permissions && data.permissions.length) {
        const permissionsList = data.permissions;
        this.setPermissions(permissionsList);
        this.setUserInfo(data);
      } else {
        throw new Error('getInfo: permissionsList must be a non-null array !');
      }*/
      this.setUserInfo(data);
      return data;
    },

    // 登出
    async logout() {
      this.setPermissions([]);
      this.setUserInfo({ nickname: '', avatar: '' });
      storage.remove(ACCESS_TOKEN);
      storage.remove(CURRENT_USER);
    },
  },
});

// Need to be used outside the setup
export function useUser() {
  return useUserStore(store);
}
