type DynamicFunctions = {
  [key: string]: (...args: any[]) => any; // 键为字符串，值为任意函数
};

declare module 'lodash-es' {
  export function get(...args): any;
  export function merge(...args): any;
}
