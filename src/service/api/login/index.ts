import { Request } from '../../index'
import type * as Login from './types/login'

/** 获取登录验证码 */
export function getLoginCodeApi(
  data: Login.LoginRequestData,
): Promise<Login.LoginCodeResponseData> {
  return Request({
    url: 'login/code',
    method: 'get',
    data,
  })
}

/** 登录并返回 Token */
export function loginApi(data: Login.LoginRequestData): Promise<Login.LoginResponseData> {
  return Request({
    url: 'users/login',
    method: 'post',
    data,
  })
}
