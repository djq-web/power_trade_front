// @ts-ignore
import Cookies from 'js-cookie';

const TokenKey = 'User-Token';

const UNIT_INFO = 'Unit-Info';

export function getToken() {
  return Cookies.get(TokenKey);
}

export function setToken(token: string) {
  return Cookies.set(TokenKey, token);
}

export function removeToken() {
  return Cookies.remove(TokenKey);
}

interface UnitInfo {
  unitId: string;
  unitName: string;
}

// 设置单位信息
export function setUnitInfo(data: UnitInfo) {
  return Cookies.set(UNIT_INFO, JSON.stringify(data));
}

// 获取单位信息
export function getUnitInfo() {
  const r = Cookies.get(UNIT_INFO);
  return r ? JSON.parse(r) : {};
}

// 删除单位信息
export function removeUnitInfo() {
  return Cookies.remove(UNIT_INFO);
}
