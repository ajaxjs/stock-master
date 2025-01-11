import { Alova, AlovaBasic } from '@/utils/http/alova/index';
//import type { Token } from '@/types/global';
import type { Token } from '@/store/modules/user';

export function getTokenApi() {
  return AlovaBasic.Get<Token>('user/auth/token');
}

/**
 * @description: 获取用户信息
 */
export function getUserInfo() {
  return Alova.Get<InResult>('/user/info/profile', {
    meta: {
      isReturnNativeResponse: true,
    },
  });
}

/**
 * @description: 用户登录
 */
export function login(params) {
  return Alova.Post<InResult>('/user/auth/login', params, {
    meta: {
      isReturnNativeResponse: true,
    },
  });
}

/**
 * @description: 用户修改密码
 */
export function changePassword(params, uid) {
  return Alova.Post(`/user/u${uid}/changepw`, params);
}

/**
 * @description: 用户登出
 */
export function logout(params) {
  return Alova.Post('/login/logout', params);
}

/**
 * @description: 获取图形验证码
 */
export function getVerifyCode() {
  return Alova.Post('/user/captcha/img');
}
